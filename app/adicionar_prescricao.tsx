import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { router } from 'expo-router';


interface Paciente {
  id: number;
  nome: string;
  cpf: string;
}

const AdicionarPrescricaoScreen = () => {
  const navigation = useNavigation<any>();
  const { token } = useAuth();

  const [pacienteId, setPacienteId] = useState<number | null>(null);
  const [descricao, setDescricao] = useState('');
  const [exercicios, setExercicios] = useState('');
  const [buscaPaciente, setBuscaPaciente] = useState('');
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [pacientesFiltrados, setPacientesFiltrados] = useState<Paciente[]>([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await fetch('http://10.0.2.2:8080/pacientes', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setPacientes(data);
        setPacientesFiltrados(data);
      } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
      }
    };

    fetchPacientes();
  }, [token]);

  const filtrarPacientes = (texto: string) => {
    setBuscaPaciente(texto);
    const filtrados = pacientes.filter(p =>
      p.nome.toLowerCase().includes(texto.toLowerCase()) || 
      p.cpf.includes(texto)
    );
    setPacientesFiltrados(filtrados);
  };

  const salvarPrescricao = async () => {
    if (!pacienteId || !descricao || !exercicios) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    const novaPrescricao = {
      pacienteId,
      descricao,
      exercicios,
    };

    try {
      const response = await fetch('http://10.0.2.2:8080/prescricoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(novaPrescricao),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Prescrição adicionada com sucesso!');
        navigation.goBack();
      } else {
        const erro = await response.text();
        console.error('Erro:', erro);
        Alert.alert('Erro', `Erro ao salvar prescrição. ${response.status}`);
      }
    } catch (error) {
      console.error('Erro:', error);
      Alert.alert('Erro', 'Erro de conexão com o servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Adicionar Prescrição</Text>

      <TextInput
        style={styles.input}
        placeholder="Buscar Paciente por nome ou CPF"
        value={buscaPaciente}
        onChangeText={filtrarPacientes}
      />

      {pacientesFiltrados.length > 0 && (
        <FlatList
          data={pacientesFiltrados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemPaciente}
              onPress={() => {
                setPacienteId(item.id);
                setBuscaPaciente(item.nome);  
                setPacientesFiltrados([]);   
              }}
            >
              <Text>{item.nome} - CPF: {item.cpf}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {pacienteId && (
        <Text style={styles.infoSelecionado}>Paciente selecionado ID: {pacienteId}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Exercícios"
        value={exercicios}
        onChangeText={setExercicios}
        multiline
      />

      <TouchableOpacity style={styles.botaoSalvar} onPress={salvarPrescricao}>
        <Text style={styles.textoBotao}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoCancelar} onPress={() => router.push('/prescricoes')}>  
        <Text style={styles.textoBotao}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
  },
  itemPaciente: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  infoSelecionado: {
    fontSize: 14,
    marginBottom: 10,
    color: 'green',
  },
  botaoSalvar: {
    backgroundColor: '#1A335C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoCancelar: {
    backgroundColor: '#cc0000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdicionarPrescricaoScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

interface Paciente {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  idade: number;
  peso: number;
  altura: number;
  sexo: string;
  endereco: string;
  telefone: string;
  tipo: string;
}

const MeusPacientesScreen = () => {
  const navigation = useNavigation<any>();
  const { token } = useAuth();

  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await fetch('http://10.0.2.2:8080/pacientes', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const erro = await response.text();
          throw new Error(`Erro: ${response.status} - ${erro}`);
        }

        const data = await response.json();
        setPacientes(data);
      } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
        Alert.alert('Erro', 'Não foi possível carregar os pacientes.');
      } finally {
        setLoading(false);
      }
    };

    fetchPacientes();
  }, [token]);

  const pacientesFiltrados = pacientes.filter(paciente =>
    paciente.nome.toLowerCase().includes(busca.toLowerCase()) ||
    paciente.cpf.includes(busca)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meus Pacientes</Text>
      <TextInput
        style={styles.inputBusca}
        placeholder="Buscar por nome ou CPF"
        value={busca}
        onChangeText={setBusca}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#1A335C" />
      ) : (
        <FlatList
          data={pacientesFiltrados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.pacienteCard}
              onPress={() => navigation.navigate('detalhes_paciente', { paciente: item })}
            >
              <Image source={require('../assets/img/icone.png')} style={styles.avatar} />
              <View style={styles.infoContainer}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.detalhes}>CPF: {item.cpf}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity style={styles.botaoAdd} onPress={() => navigation.navigate('adicionar_paciente')}>
        <Text style={styles.textoBotaoAdd}>Adicionar Paciente</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.navigate('tela_profissional')}>
        <Text style={styles.textoBotao}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputBusca: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  pacienteCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detalhes: {
    fontSize: 14,
    color: '#555',
  },
  botaoVoltar: {
    backgroundColor: '#1A335C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoAdd: {
    backgroundColor: '#1A335C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotaoAdd: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MeusPacientesScreen;

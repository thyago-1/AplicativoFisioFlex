import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

const TelaEditarPaciente = () => {
  const params = useLocalSearchParams();

  const id = Number(params.id);
  const [nome, setNome] = useState(params.nome?.toString() || '');
  const [cpf, setCpf] = useState(params.cpf?.toString() || '');
  const [idade, setIdade] = useState(params.idade?.toString() || '');
  const [peso, setPeso] = useState(params.peso?.toString() || '');
  const [altura, setAltura] = useState(params.altura?.toString() || '');
  const [sexo, setSexo] = useState(params.sexo?.toString() || '');
  const [endereco, setEndereco] = useState(params.endereco?.toString() || '');
  const [telefone, setTelefone] = useState(params.telefone?.toString() || '');
  const [email, setEmail] = useState(params.email?.toString() || '');

  const salvarEdicao = async () => {
    const pacienteAtualizado = {
      id,
      nome,
      cpf,
      idade,
      peso,
      altura,
      sexo,
      endereco,
      telefone,
      email,
    };

    try {
      const response = await fetch(`http://10.0.2.2:8080/pacientes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pacienteAtualizado),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Paciente atualizado com sucesso!');
        router.push('/pacientes');
      } else {
        Alert.alert('Erro', 'Falha ao atualizar paciente.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro de conexão com o servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar Paciente</Text>

      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="CPF" value={cpf} onChangeText={setCpf} />
      <TextInput style={styles.input} placeholder="Idade" value={idade} onChangeText={setIdade} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Peso" value={peso} onChangeText={setPeso} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Altura" value={altura} onChangeText={setAltura} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Sexo" value={sexo} onChangeText={setSexo} />
      <TextInput style={styles.input} placeholder="Endereço" value={endereco} onChangeText={setEndereco} />
      <TextInput style={styles.input} placeholder="Telefone" value={telefone} onChangeText={setTelefone} />
      <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} />

      <TouchableOpacity style={styles.botaoSalvar} onPress={salvarEdicao}>
        <Text style={styles.textoBotao}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.push('/pacientes')}>
        <Text style={styles.textoBotao}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  botaoSalvar: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  botaoVoltar: {
    backgroundColor: '#D32F2F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TelaEditarPaciente;

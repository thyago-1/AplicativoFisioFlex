import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { router } from 'expo-router';

type RootStackParamList = {
  editar_paciente: {
    paciente: {
      nome: string;
      cpf: string;
      idade?: string;
      peso?: string;
      altura?: string;
      sexo?: string;
      endereco?: string;
      telefone?: string;
      email?: string;
    };
  };
};


const TelaEditarPaciente = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'editar_paciente'>>();

 
  const pacienteExistente = route.params?.paciente || {};


  const [nome, setNome] = useState(pacienteExistente.nome || '');
  const [cpf, setCpf] = useState(pacienteExistente.cpf || '');
  const [idade, setIdade] = useState(pacienteExistente.idade || '');
  const [peso, setPeso] = useState(pacienteExistente.peso || '');
  const [altura, setAltura] = useState(pacienteExistente.altura || '');
  const [sexo, setSexo] = useState(pacienteExistente.sexo || '');
  const [endereco, setEndereco] = useState(pacienteExistente.endereco || '');
  const [telefone, setTelefone] = useState(pacienteExistente.telefone || '');
  const [email, setEmail] = useState(pacienteExistente.email || '');

  
  const salvarEdicao = () => {
    const pacienteAtualizado = {
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

    console.log('Paciente Atualizado:', pacienteAtualizado);

    
    navigation.navigate('detalhes_paciente', { paciente: pacienteAtualizado });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar Paciente</Text>

      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="CPF" value={cpf} onChangeText={setCpf} />
      <TextInput style={styles.input} placeholder="Idade" value={idade} onChangeText={setIdade} />
      <TextInput style={styles.input} placeholder="Peso" value={peso} onChangeText={setPeso} />
      <TextInput style={styles.input} placeholder="Altura" value={altura} onChangeText={setAltura} />
      <TextInput style={styles.input} placeholder="Sexo" value={sexo} onChangeText={setSexo} />
      <TextInput style={styles.input} placeholder="Endereço" value={endereco} onChangeText={setEndereco} />
      <TextInput style={styles.input} placeholder="Telefone" value={telefone} onChangeText={setTelefone} />
      <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} />

      <TouchableOpacity style={styles.botaoSalvar} onPress={salvarEdicao}>
        <Text style={styles.textoBotao}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.push('/tela_profissonal')}>
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

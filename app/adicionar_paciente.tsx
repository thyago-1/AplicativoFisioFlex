import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../contexts/AuthContext';

const TelaAdicionarPaciente = () => {
  const navigation = useNavigation<any>();
  const { token } = useAuth();

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [sexo, setSexo] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [imagem, setImagem] = useState<string | null>(null);

  const selecionarImagem = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  const salvarPaciente = async () => {
  if (!nome || !cpf || !idade || !peso || !altura || !sexo || !endereco || !telefone || !email || !senha) {
    Alert.alert('Atenção', 'Preencha todos os campos!');
    return;
  }

  const novoPaciente = {
    nome,
    email,
    senha,
    cpf,
    idade: parseInt(idade),
    peso: parseFloat(peso),
    altura: parseFloat(altura),
    sexo,
    endereco,
    telefone,
    tipo: 'Paciente'  
  };

  try {
    const response = await fetch('http://10.0.2.2:8080/pacientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(novoPaciente)
    });

    if (response.ok) {
      Alert.alert('Sucesso', 'Paciente cadastrado!');
      navigation.navigate('pacientes');
    } else {
      const erro = await response.text();
      console.error('Erro:', erro);
      Alert.alert('Erro', `Erro ao salvar paciente. Status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    Alert.alert('Erro', 'Erro ao conectar com o servidor.');
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Adicionar Paciente</Text>

      <TouchableOpacity onPress={selecionarImagem}>
        <Image source={imagem ? { uri: imagem } : require('../assets/img/icone.png')} style={styles.avatar} />
      </TouchableOpacity>

      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="CPF" value={cpf} onChangeText={setCpf} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Idade" value={idade} onChangeText={setIdade} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Peso (kg)" value={peso} onChangeText={setPeso} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Altura (m)" value={altura} onChangeText={setAltura} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Sexo" value={sexo} onChangeText={setSexo} />
      <TextInput style={styles.input} placeholder="Endereço" value={endereco} onChangeText={setEndereco} />
      <TextInput style={styles.input} placeholder="Telefone" value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />

      <TouchableOpacity style={styles.botaoSalvar} onPress={salvarPaciente}>
        <Text style={styles.textoBotao}>Salvar</Text>
      </TouchableOpacity>

     
      <TouchableOpacity style={styles.botaoCancelar} onPress={() => navigation.navigate('pacientes')}>
        <Text style={styles.textoBotao}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TelaAdicionarPaciente;

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
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  botaoSalvar: {
    backgroundColor: '#1A335C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  botaoCancelar: {
    backgroundColor: '#ccc',
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
  },
});

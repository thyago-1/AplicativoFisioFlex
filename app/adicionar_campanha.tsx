import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AdicionarCampanha = () => {
  const navigation = useNavigation<any>();

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const API_URL = 'http://10.0.2.2:8080/campanhas'; // ajuste se necessário

  const salvarCampanha = async () => {
    if (!titulo || !descricao) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo, descricao }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Campanha adicionada com sucesso!');
        setTitulo('');
        setDescricao('');
        navigation.goBack();
      } else {
        Alert.alert('Erro', 'Erro ao salvar campanha.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao conectar com o servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Adicionar Campanha</Text>

      <TextInput
        style={styles.input}
        placeholder="Título da Campanha"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Descrição da Campanha"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <TouchableOpacity style={styles.botaoSalvar} onPress={salvarCampanha}>
        <Text style={styles.textoBotao}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.textoBotao}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdicionarCampanha;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A335C',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  botaoSalvar: {
    backgroundColor: '#1A335C',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoVoltar: {
    backgroundColor: '#888',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

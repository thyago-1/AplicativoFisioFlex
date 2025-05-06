import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AdicionarPrescricaoScreen = () => {
  const navigation = useNavigation();
  const [paciente, setPaciente] = useState('');
  const [descricao, setDescricao] = useState('');
  const [exercicios, setExercicios] = useState('');

  const salvarPrescricao = () => {
    if (!paciente || !descricao || !exercicios) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    
    Alert.alert('Sucesso', 'Prescrição adicionada com sucesso!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Adicionar Prescrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Paciente"
        value={paciente}
        onChangeText={setPaciente}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Exercicios"
        value={exercicios}
        onChangeText={setExercicios}
      />
      <TouchableOpacity style={styles.botaoSalvar} onPress={salvarPrescricao}>
        <Text style={styles.textoBotao}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botaoCancelar} onPress={() => navigation.goBack()}>
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

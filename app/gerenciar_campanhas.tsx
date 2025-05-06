import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GerenciarCampanhas = () => {

  const navigation = useNavigation();
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [campanhas, setCampanhas] = useState([
    { id: '1', titulo: 'Semana da Postura', descricao: 'Campanha para reeducação postural com descontos especiais.' },
    { id: '2', titulo: 'Saúde nas Empresas', descricao: 'Divulgação de pacotes para atendimento corporativo.' },
  ]);

  const adicionarCampanha = () => {
    if (titulo && descricao) {
      const novaCampanha = {
        id: Date.now().toString(),
        titulo,
        descricao,
      };
      setCampanhas([novaCampanha, ...campanhas]);
      setTitulo('');
      setDescricao('');
    }
  };

  const renderCampanha = ({ item }) => (
    <View style={styles.campanhaCard}>
      <Text style={styles.tituloCampanha}>{item.titulo}</Text>
      <Text style={styles.descricaoCampanha}>{item.descricao}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gerenciar Campanhas</Text>

      <TextInput
        style={styles.input}
        placeholder="Título da Campanha"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarCampanha}>
        <Text style={styles.textoBotao}>Adicionar Campanha</Text>
      </TouchableOpacity>

      <FlatList
        data={campanhas}
        keyExtractor={(item) => item.id}
        renderItem={renderCampanha}
        style={{ marginTop: 20 }}
      />

      <TouchableOpacity onPress={() => navigation.navigate('gerenciar') }
      style={styles.botaoVoltar}>
        <Text style={styles.textoBotaoVoltar}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  botaoAdicionar: {
    backgroundColor: '#1A335C',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  campanhaCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  tituloCampanha: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A335C',
    marginBottom: 5,
  },
  descricaoCampanha: {
    fontSize: 15,
    color: '#333',
  },
  botaoVoltar: {
    backgroundColor: '#1A335C',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 30,
  },
  textoBotaoVoltar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GerenciarCampanhas;

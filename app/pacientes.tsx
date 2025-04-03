import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';



const MeusPacientesScreen = () => {
  const navigation = useNavigation();
  const [pacientes, setPacientes] = useState([
    {
      id: '1',
      nome: 'João Silva',
      cpf: '123.456.789-00',
      imagem: require('./assets/img/icone.png'),
    },
    {
      id: '2',
      nome: 'Maria Souza',
      cpf: '987.654.321-00',
      imagem: require('./assets/img/icone.png'),
    },
  ]);
  
  const [busca, setBusca] = useState('');
  
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
      <FlatList
        data={pacientesFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.pacienteCard}
            onPress={() => navigation.navigate('detalhes_paciente', { paciente: item })}

          >
            <Image source={item.imagem} style={styles.avatar} />
            <View style={styles.infoContainer}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.detalhes}>CPF: {item.cpf}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
   <TouchableOpacity  style={styles.botaoAdd} onPress={() => navigation.navigate('adicionar_paciente')} >
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
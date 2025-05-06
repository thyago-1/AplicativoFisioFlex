import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TelaConsultas = () => {
  const navigation = useNavigation();
  const [consultas, setConsultas] = useState([
    { id: '1', paciente: 'Maria Souza', data: '10/04/2025', hora: '14:00' },
    { id: '2', paciente: 'Carlos Oliveira', data: '12/04/2025', hora: '16:30' },
  ]);

  const cancelarConsulta = (id) => {
    setConsultas(consultas.filter(consulta => consulta.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Consultas Agendadas</Text>
      <FlatList
        data={consultas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.consultaCard}>
            <Text style={styles.info}><Text style={styles.label}>Paciente:</Text> {item.paciente}</Text>
            <Text style={styles.info}><Text style={styles.label}>Data:</Text> {item.data}</Text>
            <Text style={styles.info}><Text style={styles.label}>Hora:</Text> {item.hora}</Text>
            <View style={styles.botoesContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('editar_consulta', { consulta: item })} 
              style={styles.botaoEditar}>
                <Text style={styles.textoBotao}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botaoCancelar} onPress={() => cancelarConsulta(item.id)}>
                <Text style={styles.textoBotao}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity onPress={() => navigation.navigate('adicionar_consulta')} 
      style={styles.botaoAdicionar}>
        <Text style={styles.textoBotao}>Adicionar Consulta</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('tela_profissional')}
      style={styles.botaoVoltar} >
        <Text style={styles.textoBotaoVoltar}>Voltar</Text>
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
  consultaCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  botaoEditar: {
    backgroundColor: '#1A335C',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginRight: 5,
  },
  botaoCancelar: {
    backgroundColor: '#cc0000',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  botaoAdicionar: {
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
  botaoVoltar: {
    backgroundColor: '#1A335C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotaoVoltar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TelaConsultas;

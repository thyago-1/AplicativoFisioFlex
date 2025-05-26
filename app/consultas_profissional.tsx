import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Consulta {
  id: number;
  paciente: string;
  data: string; // formato "YYYY-MM-DD"
  hora: string; // formato "HH:mm:ss"
}

const TelaConsultas = () => {
  const navigation = useNavigation<any>();
  const [consultas, setConsultas] = useState<Consulta[]>([]);

  useEffect(() => {
    fetch('http://10.0.2.2:8080/consultas') // altere se for IP local
      .then(response => response.json())
      .then(data => setConsultas(data))
      .catch(error => {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar as consultas.');
      });
  }, []);

  const cancelarConsulta = (id: number) => {
    Alert.alert('Confirmar', 'Deseja cancelar esta consulta?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => {
          // Aqui você pode chamar DELETE /consultas/{id} futuramente
          setConsultas(consultas.filter(consulta => consulta.id !== id));
          Alert.alert('Consulta cancelada!');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Consultas Agendadas</Text>
      <FlatList
        data={consultas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.consultaCard}>
            <Text style={styles.info}><Text style={styles.label}>Paciente:</Text> {item.paciente}</Text>
            <Text style={styles.info}><Text style={styles.label}>Data:</Text> {item.data}</Text>
            <Text style={styles.info}><Text style={styles.label}>Hora:</Text> {item.hora}</Text>
            <View style={styles.botoesContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('editar_consulta', { consulta: item })}
                style={styles.botaoEditar}
              >
                <Text style={styles.textoBotao}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botaoCancelar} onPress={() => cancelarConsulta(item.id)}>
                <Text style={styles.textoBotao}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity onPress={() => navigation.navigate('adicionar_consulta')} style={styles.botaoAdicionar}>
        <Text style={styles.textoBotao}>Adicionar Consulta</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('tela_profissional')} style={styles.botaoVoltar}>
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

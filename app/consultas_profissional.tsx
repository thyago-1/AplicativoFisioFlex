import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, SafeAreaView, RefreshControl, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useAuth } from '@/contexts/AuthContext';

interface Paciente {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  idade: number;
  peso: number;
  altura: number;
  sexo: string;
  endereco: string;
  telefone: string;
}

interface Consulta {
  id: number;
  paciente: Paciente;
  data: string;
  hora: string;
}

const TelaConsultas = () => {
  const navigation = useNavigation<any>();
  const { token } = useAuth();

  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const API_URL = 'http://10.0.2.2:8080/consultas';

  const buscarConsultas = useCallback(async () => {
    if (!token) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const data: Consulta[] = await response.json();
      setConsultas(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar as consultas.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      buscarConsultas();
    }, [buscarConsultas])
  );

  const onRefresh = () => {
    setRefreshing(true);
    buscarConsultas().then(() => setRefreshing(false));
  };

  const cancelarConsulta = (id: number) => {
    Alert.alert('Confirmar', 'Deseja cancelar esta consulta?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sim',
        onPress: async () => {
          try {
            const response = await fetch(`${API_URL}/${id}`, {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
              throw new Error('Erro ao cancelar a consulta');
            }

            setConsultas(consultas.filter(consulta => consulta.id !== id));
            Alert.alert('Consulta cancelada!');
          } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível cancelar a consulta.');
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: Consulta }) => (
    <View style={styles.consultaCard}>
      <Text style={styles.info}><Text style={styles.label}>Paciente:</Text> {item.paciente.nome}</Text>
      <Text style={styles.info}><Text style={styles.label}>Data:</Text> {item.data}</Text>
      <Text style={styles.info}><Text style={styles.label}>Hora:</Text> {item.hora}</Text>
      <View style={styles.botoesContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('editar_consulta', { consulta: item })}
          style={styles.botaoEditar}
        >
          <Text style={styles.textoBotao}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaoCancelar}
          onPress={() => cancelarConsulta(item.id)}
        >
          <Text style={styles.textoBotao}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Consultas Agendadas</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#1A335C" />
      ) : (
        <FlatList
          data={consultas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.vazio}>Nenhuma consulta agendada.</Text>}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate('adicionar_consulta')}
        style={styles.botaoAdicionar}
      >
        <Text style={styles.textoBotao}>Adicionar Consulta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('tela_profissional')}
        style={styles.botaoVoltar}
      >
        <Text style={styles.textoBotaoVoltar}>Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
  vazio: {
    textAlign: 'center',
    fontSize: 14,
    color: '#777',
    marginTop: 10,
  },
});

export default TelaConsultas;

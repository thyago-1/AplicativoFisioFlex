import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { router } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

interface Evolucao {
  data: string;
  descricao: string;
  progresso: number;
}

const TelaMinhaEvolucao: React.FC = () => {
  const [evolucoes, setEvolucoes] = useState<Evolucao[]>([]);
  const [loading, setLoading] = useState(true);
  const { paciente } = useAuth();

  useEffect(() => {
    const fetchEvolucao = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:8080/evolucao/${paciente?.id}`);
        const data = await response.json();
        setEvolucoes(data);
      } catch (error) {
        console.error('Erro ao buscar evolução:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvolucao();
  }, [paciente]);

  const progresso = evolucoes.map(e => e.progresso);
  const labels = evolucoes.map(e => new Date(e.data).toLocaleDateString('pt-BR'));

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#1A335C" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1A335C" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Minha Evolução</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitulo}>Progresso do Tratamento</Text>
        {progresso.length > 0 ? (
          <LineChart
            data={{
              labels: labels,
              datasets: [{ data: progresso }],
            }}
            width={Dimensions.get('window').width - 60}
            height={200}
            yAxisSuffix="%"
            chartConfig={{
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(26, 51, 92, ${opacity})`,
              labelColor: () => '#1A335C',
              propsForDots: {
                r: '5',
                strokeWidth: '2',
                stroke: '#1A335C',
              },
            }}
            bezier
          />
        ) : <Text>Sem dados de progresso.</Text>}
      </View>

      <ScrollView style={styles.card}>
        <Text style={styles.subtitulo}>Histórico de Sessões</Text>
        {evolucoes.map((sessao, index) => (
          <View key={index} style={styles.sessao}>
            <Text style={styles.sessaoData}>{new Date(sessao.data).toLocaleDateString('pt-BR')}</Text>
            <Text style={styles.sessaoTexto}>{sessao.descricao}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TelaMinhaEvolucao;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A9A6BA',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A335C',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A335C',
    marginBottom: 10,
    textAlign: 'center',
  },
  sessao: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    paddingVertical: 10,
  },
  sessaoData: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A335C',
  },
  sessaoTexto: {
    fontSize: 14,
    color: '#555',
  },
});

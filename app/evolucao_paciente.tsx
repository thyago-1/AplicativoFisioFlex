import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, ActivityIndicator, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';

interface Evolucao {
  data: string;
  descricao: string;
  progresso: number;
}

interface Paciente {
  id: number;
  nome: string;
}

const EvolucaoPaciente: React.FC = () => {
  const navigation = useNavigation<any>();

  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [pacienteSelecionado, setPacienteSelecionado] = useState<Paciente | null>(null);
  const [evolucoes, setEvolucoes] = useState<Evolucao[]>([]);
  const [descricao, setDescricao] = useState('');
  const [progresso, setProgresso] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('http://10.0.2.2:8080/pacientes')
      .then(res => res.json())
      .then(data => setPacientes(data))
      .catch(err => console.error('Erro ao buscar pacientes:', err));
  }, []);

  const buscarEvolucao = (pacienteId: number) => {
    setLoading(true);
    fetch(`http://10.0.2.2:8080/evolucao/${pacienteId}`)
      .then(res => res.json())
      .then(data => setEvolucoes(data))
      .catch(err => console.error('Erro ao buscar evolução:', err))
      .finally(() => setLoading(false));
  };

  const handleAdicionarEvolucao = () => {
    if (!pacienteSelecionado || !descricao || !progresso) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const novaEvolucao = {
      data: new Date().toISOString().split('T')[0],
      descricao,
      progresso: Number(progresso)
    };

    fetch(`http://10.0.2.2:8080/evolucao/${pacienteSelecionado.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaEvolucao)
    })
      .then(res => {
        if (res.ok) {
          Alert.alert('Sucesso', 'Evolução adicionada!');
          buscarEvolucao(pacienteSelecionado.id);
          setDescricao('');
          setProgresso('');
        } else {
          Alert.alert('Erro', 'Não foi possível adicionar a evolução.');
        }
      })
      .catch(err => {
        console.error('Erro ao adicionar evolução:', err);
        Alert.alert('Erro', 'Falha ao conectar com o servidor.');
      });
  };

  const progressoData = evolucoes.map(e => e.progresso);
  const labels = evolucoes.map(e => new Date(e.data).toLocaleDateString('pt-BR'));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1A335C" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Evolução do Paciente</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.card}>
        <Text style={styles.subtitulo}>Selecionar Paciente</Text>
        {pacientes.map(p => (
          <TouchableOpacity
            key={p.id}
            style={[
              styles.pacienteItem,
              pacienteSelecionado?.id === p.id && { backgroundColor: '#1A335C' }
            ]}
            onPress={() => {
              setPacienteSelecionado(p);
              buscarEvolucao(p.id);
            }}
          >
            <Text style={{ color: pacienteSelecionado?.id === p.id ? '#fff' : '#000' }}>{p.nome}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {pacienteSelecionado && (
        <>
          <View style={styles.card}>
            <Text style={styles.subtitulo}>Progresso do Tratamento</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#1A335C" />
            ) : progressoData.length > 0 ? (
              <LineChart
                data={{
                  labels: labels,
                  datasets: [{ data: progressoData }],
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
            ) : (
              <Text>Sem dados de progresso.</Text>
            )}
          </View>

          <ScrollView style={styles.card}>
            <Text style={styles.subtitulo}>Histórico de Sessões</Text>
            {evolucoes.map((e, idx) => (
              <View key={idx} style={styles.sessao}>
                <Text style={styles.sessaoData}>{new Date(e.data).toLocaleDateString('pt-BR')}</Text>
                <Text style={styles.sessaoTexto}>{e.descricao}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.card}>
            <Text style={styles.subtitulo}>Adicionar Evolução</Text>
            <TextInput
              style={styles.input}
              placeholder="Descrição"
              value={descricao}
              onChangeText={setDescricao}
            />
            <TextInput
              style={styles.input}
              placeholder="Progresso (%)"
              value={progresso}
              onChangeText={setProgresso}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.botao} onPress={handleAdicionarEvolucao}>
              <Text style={styles.textoBotao}>Salvar Evolução</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default EvolucaoPaciente;

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
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  botao: {
    backgroundColor: '#1A335C',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pacienteItem: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 8,
  },
});

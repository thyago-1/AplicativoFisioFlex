import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface ResumoFinanceiro {
  receitaMensal: number;
  despesaMensal: number;
}

interface Boleto {
  id: number;
  descricao: string;
  valor: number;
  vencimento: string;
}

const TelaFinancas = () => {
  const navigation = useNavigation<any>();
  const [resumo, setResumo] = useState<ResumoFinanceiro | null>(null);
  const [boletosReceber, setBoletosReceber] = useState<Boleto[]>([]);
  const [boletosPagar, setBoletosPagar] = useState<Boleto[]>([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = 'http://10.0.2.2:8080/financas'; // ajuste para seu IP se usar dispositivo físico

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resumoRes, receberRes, pagarRes] = await Promise.all([
          fetch(`${API_BASE}/resumo`),
          fetch(`${API_BASE}/boletos-receber`),
          fetch(`${API_BASE}/boletos-pagar`),
        ]);

        const resumoJson = await resumoRes.json();
        const receberJson = await receberRes.json();
        const pagarJson = await pagarRes.json();

        setResumo(resumoJson);
        setBoletosReceber(receberJson);
        setBoletosPagar(pagarJson);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Erro ao carregar informações financeiras');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1A335C" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Finanças</Text>

      <View style={styles.resumoContainer}>
        <View style={styles.cardReceita}>
          <Text style={styles.label}>Receita Mensal</Text>
          <Text style={styles.valor}>
            R$ {resumo?.receitaMensal.toFixed(2)}
          </Text>
        </View>
        <View style={styles.cardDespesa}>
          <Text style={styles.label}>Despesa Mensal</Text>
          <Text style={styles.valor}>
            R$ {resumo?.despesaMensal.toFixed(2)}
          </Text>
        </View>
      </View>

      <Text style={styles.subtitulo}>Boletos a Receber</Text>
      <FlatList
        data={boletosReceber}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.boletoCardReceber}>
            <Text>{item.descricao} - R$ {item.valor.toFixed(2)}</Text>
            <Text>Vencimento: {item.vencimento}</Text>
          </View>
        )}
      />

      <Text style={styles.subtitulo}>Boletos a Pagar</Text>
      <FlatList
        data={boletosPagar}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.boletoCardPagar}>
            <Text>{item.descricao} - R$ {item.valor.toFixed(2)}</Text>
            <Text>Vencimento: {item.vencimento}</Text>
          </View>
        )}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('tela_profissional')}
        style={styles.botaoVoltar}
      >
        <Text style={styles.textoBotao}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TelaFinancas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  resumoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardReceita: {
    backgroundColor: '#1A335C',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  cardDespesa: {
    backgroundColor: '#cc0000',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  valor: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  boletoCardReceber: {
    backgroundColor: '#dff0d8',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  boletoCardPagar: {
    backgroundColor: '#f2dede',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
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
});

import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TelaFinancas = () => {
  const navigation = useNavigation();

  const receitaMensal = 7500;
  const despesaMensal = 3200;

  const boletosReceber = [
    { id: '1', cliente: 'Maria Souza', valor: 200, vencimento: '10/04/2025' },
    { id: '2', cliente: 'Carlos Oliveira', valor: 350, vencimento: '15/04/2025' },
  ];

  const boletosPagar = [
    { id: '1', descricao: 'Aluguel', valor: 1500, vencimento: '05/04/2025' },
    { id: '2', descricao: 'Conta de Luz', valor: 300, vencimento: '07/04/2025' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Finanças</Text>

      <View style={styles.resumoContainer}>
        <View style={styles.cardReceita}>
          <Text style={styles.label}>Receita Mensal</Text>
          <Text style={styles.valor}>R$ {receitaMensal.toFixed(2)}</Text>
        </View>
        <View style={styles.cardDespesa}>
          <Text style={styles.label}>Despesa Mensal</Text>
          <Text style={styles.valor}>R$ {despesaMensal.toFixed(2)}</Text>
        </View>
      </View>

      <Text style={styles.subtitulo}>Boletos a Receber</Text>
      <FlatList
        data={boletosReceber}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.boletoCardReceber}>
            <Text>{item.cliente} - R$ {item.valor.toFixed(2)}</Text>
            <Text>Vencimento: {item.vencimento}</Text>
          </View>
        )}
      />

      <Text style={styles.subtitulo}>Boletos a Pagar</Text>
      <FlatList
        data={boletosPagar}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.boletoCardPagar}>
            <Text>{item.descricao} - R$ {item.valor.toFixed(2)}</Text>
            <Text>Vencimento: {item.vencimento}</Text>
          </View>
        )}
      />

      <TouchableOpacity onPress={() => navigation.navigate('tela_profissional') }
      style={styles.botaoVoltar}>
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

export default TelaFinancas;
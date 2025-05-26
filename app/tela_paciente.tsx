import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const TelaPaciente = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="#1A335C" />
        </TouchableOpacity>

        <Image source={require('../assets/img/icone.png')} style={styles.logo} />

        <TouchableOpacity onPress={() => router.push('/usuario')}>
          <Ionicons name="person" size={24} color="#1A335C" />
        </TouchableOpacity>
      </View>

      <Text style={styles.titulo}>Meu Espaço</Text>

      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>Acesso Rápido</Text>
        <View style={styles.cardContainer}>
          <TouchableOpacity onPress={() => router.push('/evolucao')} style={styles.card}>
            <Ionicons name="person-outline" size={40} color="#1A335C" />
            <Text style={styles.cardTexto}>Minha Evolução</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/atendimentos')} style={styles.card}>
            <Ionicons name="calendar-outline" size={40} color="#1A335C" />
            <Text style={styles.cardTexto}>Meus Atendimentos</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/atividades')} style={styles.card}>
            <Ionicons name="barbell-outline" size={40} color="#1A335C" />
            <Text style={styles.cardTexto}>Minhas Atividades</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>Financeiro</Text>
        <View style={styles.cardContainer}>
          <TouchableOpacity onPress={() => router.push('/pagamentos')} style={styles.card}>
            <Ionicons name="card-outline" size={40} color="#1A335C" />
            <Text style={styles.cardTexto}>Meus Pagamentos</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/consultas')} style={styles.card}>
            <Ionicons name="document-text-outline" size={40} color="#1A335C" />
            <Text style={styles.cardTexto}>Consultar Serviços</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>Campanhas</Text>
        <View style={styles.cardContainer}>
          <TouchableOpacity onPress={() => router.push('/campanhas')} style={styles.card}>
            <Ionicons name="people-outline" size={40} color="#1A335C" />
            <Text style={styles.cardTexto}>Campanhas</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/publicidade')} style={styles.card}>
            <Ionicons name="globe-outline" size={40} color="#1A335C" />
            <Text style={styles.cardTexto}>Publicidade</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
  logo: {
    width: 200,
    height: 200,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A335C',
    textAlign: 'center',
    marginBottom: 10,
  },
  secao: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  secaoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A335C',
    marginBottom: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  card: {
    alignItems: 'center',
    width: '30%',
    padding: 10,
  },
  cardTexto: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
    color: '#1A335C',
    fontWeight: 'bold',
  },
});

export default TelaPaciente;

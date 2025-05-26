import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

const TelaProfissional = () => {
  const navigation = useNavigation<any>();
  const { token, profissional } = useAuth();

  const handleNavigate = (screen: string) => {
    if (!token) {
      alert('Você precisa estar logado!');
      return;
    }
    navigation.navigate(screen, { profissional });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Área do Profissional</Text>
      <View style={styles.grid}>
        <TouchableOpacity onPress={() => handleNavigate('pacientes')} style={styles.card}>
          <FontAwesome5 name="user-md" size={30} color="#fff" />
          <Text style={styles.cardText}>Meus Pacientes</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleNavigate('consultas_profissional')} style={styles.card}>
          <MaterialIcons name="event" size={30} color="#fff" />
          <Text style={styles.cardText}>Consultas</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleNavigate('prescricoes')} style={styles.card}>
          <MaterialIcons name="assignment" size={30} color="#fff" />
          <Text style={styles.cardText}>Prescrições</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleNavigate('gerenciar')} style={styles.card}>
          <MaterialIcons name="dashboard" size={30} color="#fff" />
          <Text style={styles.cardText}>Gerenciar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleNavigate('evolucao_paciente')} style={styles.card}>
          <MaterialIcons name="show-chart" size={30} color="#fff" />
          <Text style={styles.cardText}>Evolução</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleNavigate('financas')} style={styles.card}>
          <MaterialIcons name="payments" size={30} color="#fff" />
          <Text style={styles.cardText}>Finanças</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleNavigate('minha_conta')} style={styles.card}>
          <MaterialIcons name="person" size={30} color="#fff" />
          <Text style={styles.cardText}>Minha Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleNavigate('suporte')} style={styles.card}>
          <MaterialIcons name="support-agent" size={30} color="#fff" />
          <Text style={styles.cardText}>Suporte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TelaProfissional;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A335C',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#4A90E2',
    width: 150,
    height: 150,
    margin: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

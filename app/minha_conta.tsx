import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { router } from 'expo-router';

interface Profissional {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  crp: string; 
  especialidade: string;
  telefone: string;
}

const MinhaContaScreen = () => {
  const { token, user, logout } = useAuth();

  const [profissional, setProfissional] = useState<Profissional | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfissional = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:8080/profissionais/${user?.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
          const erro = await response.text();
          throw new Error(erro);
        }

        const data = await response.json();
        setProfissional(data);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do profissional.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id && token) {
      fetchProfissional();
    }
  }, [token, user]);

  const handleLogout = () => {
  Alert.alert('Sair', 'Deseja realmente sair?', [
    { text: 'Cancelar', style: 'cancel' },
    {
      text: 'Sair',
      onPress: () => {
        logout(); // limpa o contexto
        router.replace('/'); // redireciona para a tela inicial
      }
    }
  ]);
};


  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1A335C" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minha Conta</Text>

      {profissional ? (
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nome: <Text style={styles.valor}>{profissional.nome}</Text></Text>
          <Text style={styles.label}>Email: <Text style={styles.valor}>{profissional.email}</Text></Text>
          <Text style={styles.label}>CPF: <Text style={styles.valor}>{profissional.cpf}</Text></Text>
          <Text style={styles.label}>CRP: <Text style={styles.valor}>{profissional.crp}</Text></Text>
          <Text style={styles.label}>Especialidade: <Text style={styles.valor}>{profissional.especialidade}</Text></Text>
          <Text style={styles.label}>Telefone: <Text style={styles.valor}>{profissional.telefone}</Text></Text>
        </View>
      ) : (
        <Text>Dados não encontrados.</Text>
      )}

      <TouchableOpacity style={styles.botaoSair} onPress={handleLogout}>
        <Text style={styles.textoBotao}>Sair</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.push('/tela_profissional')}>
        <Text style={styles.textoBotao}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  infoContainer: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  valor: { fontWeight: 'normal', color: '#555' },
  botaoSair: {
    backgroundColor: '#cc0000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20
  },
  botaoVoltar: {
    backgroundColor: '#1A335C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default MinhaContaScreen;

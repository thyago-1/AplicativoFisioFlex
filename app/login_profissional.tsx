import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

const TelaLoginProfissional = () => {
  const { login } = useAuth();

  const [registro, setRegistro] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!registro.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://10.0.2.2:8080/profissionais/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registro, senha }),
      });

      const responseText = await response.text();
      console.log('Status:', response.status);
      console.log('Response:', responseText);

      if (response.ok) {
        const data = JSON.parse(responseText);
        console.log('Login OK:', data);

        const token = data.token || 'mock-token';

        const user = {
          id: data.id,
          nome: data.nome,
          email: data.email,
          tipo: 'PROFISSIONAL',
        };

        const profissional = {
          id: data.id,
          nome: data.nome,
          email: data.email,
          especialidade: data.especialidade,
          registroProfissional: data.registroProfissional,
        };

        await login(token, user, undefined, profissional);

        Alert.alert('Sucesso', `Bem-vindo, ${user.nome}!`);
        router.replace('/tela_profissional'); // Substitui a tela atual
      } else {
        Alert.alert('Erro', `Status: ${response.status}\n${responseText}`);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login do Profissional</Text>

      <TextInput
        style={styles.input}
        placeholder="Registro"
        autoCapitalize="none"
        keyboardType="numeric"
        value={registro}
        onChangeText={setRegistro}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.botao} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.textoBotao}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.push('/')}>
        <Text style={styles.botaoVoltarTexto}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TelaLoginProfissional;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  botao: {
    backgroundColor: '#1A335C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoVoltar: {
    backgroundColor: '#A9A9A9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  botaoVoltarTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

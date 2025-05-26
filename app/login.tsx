import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

const TelaLogin = () => {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!cpf || !senha) {
      Alert.alert('Erro', 'Por favor, informe o CPF e a senha.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://10.0.2.2:8080/pacientes/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpf: cpf.replace(/\D/g, ''), senha }),
      });

      const responseText = await response.text();
      console.log('Status:', response.status);
      console.log('Response Raw Text:', responseText);

      if (response.ok) {
        const data = JSON.parse(responseText);
        console.log('Parsed Response:', data);

        // ✅ Verifica se data.usuario e data.paciente existem:
        if (!data.usuario || !data.paciente) {
          console.warn('⚠️ Resposta incompleta: falta usuario ou paciente');
        }

        await login(data.token, data.usuario, data.paciente);

        Alert.alert('Sucesso', `Bem-vindo, ${data.usuario?.nome || 'usuário'}!`, [
          {
            text: 'OK',
            onPress: () => {
              router.replace('/tela_paciente');
            },
          },
        ]);
      } else {
        Alert.alert('Erro', `Status: ${response.status}\n${responseText}`);
      }
    } catch (error) {
      console.error('Erro de rede:', error);
      Alert.alert('Erro', 'Erro ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/img/icone.png')} style={styles.logo} />

      <Text style={styles.instrucao}>Olá, informe seus dados:</Text>

      <TextInput
        style={styles.input}
        placeholder="CPF"
        keyboardType="numeric"
        value={cpf}
        onChangeText={setCpf}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity onPress={() => router.push('/redefinir')}>
        <Text style={styles.linkSenha}>Esqueci minha senha!</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogin} style={styles.btEntrar} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btTexto}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/')}>
        <Text style={styles.voltar}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TelaLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A9A6BA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  instrucao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A335C',
    marginBottom: 15,
  },
  input: {
    width: '90%',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    elevation: 2,
  },
  linkSenha: {
    color: '#1A335C',
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  btEntrar: {
    backgroundColor: '#1A335C',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
    elevation: 3,
  },
  btTexto: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  voltar: {
    color: '#1A335C',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

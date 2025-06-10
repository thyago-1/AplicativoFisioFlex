import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native"; 
import { router } from 'expo-router';

const TelaRedefinirSenha = ({  }) => {
  
    const [email, setEmail] = useState('');
    
    const navigation = useNavigation();
 
    const handleRecuperarSenha = () => {
    
    alert('Instruções de recuperação enviadas para ' + email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Recuperação de Senha</Text>
      <Text style={styles.texto}>Digite seu e-mail cadastrado para receber as instruções de recuperação.</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.botao} onPress={handleRecuperarSenha}>
        <Text style={styles.textoBotao}>Recuperar Senha</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.voltar}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  texto: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  botao: {
    backgroundColor: '#1A335C',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginBottom: 20,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  voltar: {
    color: '#1A335C',
    textDecorationLine: 'underline',
  },
});

export default TelaRedefinirSenha;

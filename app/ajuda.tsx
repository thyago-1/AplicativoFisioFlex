import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';

const AjudaScreen = () => {
  

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Precisa de Ajuda?</Text>
      <ScrollView style={styles.faqContainer}>
        <Text style={styles.pergunta}>1. Como faço para criar uma conta?</Text>
        <Text style={styles.resposta}>A conta será criada pelo profissional de fisioterapia. Você receberá os dados de acesso.</Text>
        
        <Text style={styles.pergunta}>2. Esqueci minha senha. O que fazer?</Text>
        <Text style={styles.resposta}>Na tela de login, haverá um local para redefinir sua senha. Informe o email cadastrado e em seguida Enviar Código.</Text>

        <Text style={styles.pergunta}>3. Como alterar minha foto de perfil?</Text>
        <Text style={styles.resposta}>Acesse a tela de Dados do Usuário e toque na imagem de perfil para alterar.</Text>
      </ScrollView>
      
      <TouchableOpacity onPress={() => router.push('/suporte') } style={styles.botaoSuporte}>
        <Text style={styles.botaoTexto}>Entrar em Contato com o Suporte</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.push('/') }  >
        <Text style={styles.botaoTexto}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  faqContainer: {
    marginBottom: 20,
  },
  pergunta: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  resposta: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  botaoSuporte: {
    backgroundColor: '#1A335C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoVoltar: {
    backgroundColor: '#A9A9A9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default AjudaScreen;

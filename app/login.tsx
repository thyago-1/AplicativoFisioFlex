import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native"; 

const TelaLogin = () => {
 const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={require('./assets/img/icone.png')} style={styles.logo} />
      
      
      <Text style={styles.instrucao}>Olá, informe seus dados:</Text>

      <TextInput style={styles.input} placeholder="CPF" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry />

      <TouchableOpacity onPress={() => navigation.navigate('redefinir') }> 
        <Text style={styles.linkSenha}>Esqueci minha senha!</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('tela_paciente') } 
      
      style={styles.btEntrar}>
        <Text style={styles.btTexto}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('inicio') }> 
        <Text style={styles.voltar}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A9A6BA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 400,
    height: 400,
    marginBottom:-90,
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

export default TelaLogin;

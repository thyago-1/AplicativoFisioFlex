import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native"; 


const TelaLoginProfissional = ({  }) => {
  
  const navigation = useNavigation();
    const [registro, setRegistro] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (registro.trim() === '' || senha.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
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
      <TouchableOpacity onPress={() => navigation.navigate('tela_profissional') }
      style={styles.botao} >
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>
 
 
 <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.navigate('inicio') }  >
             <Text style={styles.botaoVoltarTexto}>Voltar</Text>
           </TouchableOpacity>
        
    </View>


  );
};

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
  botaoVoltarTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
   botaoVoltar: {
    backgroundColor: '#A9A9A9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30
  },

});

export default TelaLoginProfissional;
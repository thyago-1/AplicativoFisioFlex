import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native"; 

const TelaSuporte = () => {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

    const navigation = useNavigation();

  const enviarMensagem = () => {
    if (email.trim() === '' || mensagem.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos antes de enviar.');
      return;
    }
    Alert.alert('Sucesso', 'Sua mensagem foi enviada para o suporte!');
    setEmail('');
    setMensagem('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Contato com o Suporte</Text>
      <Text style={styles.descricao}>
        Se estiver enfrentando problemas ou tiver dúvidas, envie-nos uma mensagem.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Seu e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Digite sua mensagem aqui..."
        multiline
        textAlignVertical="top"
        value={mensagem}
        onChangeText={setMensagem}
      />

<TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.navigate('ajuda') }  >
            <Text style={styles.botaoVoltarTexto}>Voltar</Text>
          </TouchableOpacity>
       
      <TouchableOpacity style={styles.botaoEnviar} onPress={enviarMensagem}>
        <Text style={styles.textoBotaoEnviar}>Enviar</Text>
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
    marginBottom: 10,
  },
  descricao: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
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

  botaoEnviar: {
    backgroundColor: '#1A335C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',

  },
  textoBotaoEnviar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
 
});

export default TelaSuporte;
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native"; 


const TelaUsuario = () => {
    const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);
    const navigation = useNavigation();

  const escolherImagem = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFotoPerfil(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Dados do Usuário</Text>
      <TouchableOpacity onPress={escolherImagem}>
        <Image
          source={fotoPerfil ? { uri: fotoPerfil } : require("./assets/img/icone.png")}
          style={styles.fotoPerfil}
        />
      </TouchableOpacity>
      
      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.dado}>Maria da Silva</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.dado}>mariadasilva@email.com</Text>
      <Text style={styles.label}>Telefone:</Text>
      <Text style={styles.dado}>(81) 99999-8888</Text>
    
    <TouchableOpacity       onPress={() => navigation.navigate('inicio') } 
            
            style={styles.btSair} >
              <Text style={styles.btTexto}>Sair</Text>
              </TouchableOpacity>
              
              <TouchableOpacity       onPress={() => navigation.navigate('tela_paciente') } 
            
            style={styles.btSair} >
              <Text style={styles.btTexto}>Voltar</Text>
             
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
    marginBottom: 20,
  },
  btSair: {
    backgroundColor: "#1A335C",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginVertical: 20,
  },

  btTexto: {
    color: "#FFFFFF",
    fontSize: 16,
  },

  fotoPerfil: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#1A335C',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dado: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default TelaUsuario;

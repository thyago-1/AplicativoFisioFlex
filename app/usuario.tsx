import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

const TelaUsuario = () => {
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);
  const { user, paciente, logout } = useAuth();

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

  const handleLogout = async () => {
    await logout();
    Alert.alert('Logout', 'Sessão encerrada com sucesso!', [
      { text: 'OK', onPress: () => router.replace('/') },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Dados do Usuário</Text>

      <TouchableOpacity onPress={escolherImagem}>
        <Image
          source={fotoPerfil ? { uri: fotoPerfil } : require('../assets/img/icone.png')}
          style={styles.fotoPerfil}
        />
      </TouchableOpacity>

      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.dado}>{user?.nome || 'Nome não disponível'}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.dado}>{user?.email || 'Email não disponível'}</Text>

      <Text style={styles.label}>Tipo:</Text>
      <Text style={styles.dado}>{user?.tipo || 'Tipo não disponível'}</Text>

      <Text style={styles.label}>CPF:</Text>
      <Text style={styles.dado}>{paciente?.cpf || 'CPF não disponível'}</Text>

      <Text style={styles.label}>Endereço:</Text>
      <Text style={styles.dado}>{paciente?.endereco || 'Endereço não disponível'}</Text>

      <Text style={styles.label}>Idade:</Text>
      <Text style={styles.dado}>{paciente?.idade ? paciente.idade : 'Idade não disponível'}</Text>

      <Text style={styles.label}>Peso:</Text>
      <Text style={styles.dado}>{paciente?.peso ? `${paciente.peso} kg` : 'Peso não disponível'}</Text>

      <Text style={styles.label}>Altura:</Text>
      <Text style={styles.dado}>{paciente?.altura ? `${paciente.altura} m` : 'Altura não disponível'}</Text>

      <Text style={styles.label}>Sexo:</Text>
      <Text style={styles.dado}>{paciente?.sexo || 'Sexo não disponível'}</Text>

      <Text style={styles.label}>Telefone:</Text>
      <Text style={styles.dado}>{paciente?.telefone || 'Telefone não disponível'}</Text>

      <TouchableOpacity onPress={handleLogout} style={styles.btSair}>
        <Text style={styles.btTexto}>Sair</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/tela_paciente')} style={styles.btSair}>
        <Text style={styles.btTexto}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TelaUsuario;

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
    marginVertical: 10,
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

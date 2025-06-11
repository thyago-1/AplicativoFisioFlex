import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { router } from 'expo-router';

type Paciente = {
  id: number;
  nome: string;
  cpf: string;
  idade?: string;
  peso?: string;
  altura?: string;
  sexo?: string;
  endereco?: string;
  telefone?: string;
  email?: string;
};

type RouteParams = {
  detalhes_paciente: {
    paciente: Paciente;
  };
};

const TelaDetalhesPaciente = () => {
  const route = useRoute<RouteProp<RouteParams, 'detalhes_paciente'>>();
  const { paciente } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalhes do Paciente</Text>

      {/* Imagem padrão */}
      <Image source={require('../assets/img/icone.png')} style={styles.avatar} />

      <Text style={styles.info}><Text style={styles.label}>Nome:</Text> {paciente.nome}</Text>
      <Text style={styles.info}><Text style={styles.label}>CPF:</Text> {paciente.cpf}</Text>
      <Text style={styles.info}><Text style={styles.label}>Idade:</Text> {paciente.idade || 'Não informado'}</Text>
      <Text style={styles.info}><Text style={styles.label}>Peso:</Text> {paciente.peso || 'Não informado'}</Text>
      <Text style={styles.info}><Text style={styles.label}>Altura:</Text> {paciente.altura || 'Não informado'}</Text>
      <Text style={styles.info}><Text style={styles.label}>Sexo:</Text> {paciente.sexo || 'Não informado'}</Text>
      <Text style={styles.info}><Text style={styles.label}>Endereço:</Text> {paciente.endereco || 'Não informado'}</Text>
      <Text style={styles.info}><Text style={styles.label}>Telefone:</Text> {paciente.telefone || 'Não informado'}</Text>
      <Text style={styles.info}><Text style={styles.label}>E-mail:</Text> {paciente.email || 'Não informado'}</Text>

      {/* Botão Editar */}
      <TouchableOpacity
        style={styles.botaoEditar}
        onPress={() =>
          router.push({
  pathname: '/editar_paciente',
  params: {
    id: String(paciente.id),
    nome: paciente.nome,
    cpf: paciente.cpf,
    idade: String(paciente.idade ?? ''),
    peso: String(paciente.peso ?? ''),
    altura: String(paciente.altura ?? ''),
    sexo: paciente.sexo ?? '',
    endereco: paciente.endereco ?? '',
    telefone: paciente.telefone ?? '',
    email: paciente.email ?? ''
  }
})

        }
      >
        <Text style={styles.textoBotao}>Editar</Text>
      </TouchableOpacity>

      {/* Botão Voltar */}
      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => router.push('/pacientes')}
      >
        <Text style={styles.textoBotao}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  botaoEditar: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  botaoVoltar: {
    backgroundColor: '#1A335C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TelaDetalhesPaciente;

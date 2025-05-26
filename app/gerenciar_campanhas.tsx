import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Campanha {
  id: number;
  titulo: string;
  descricao: string;
}

const GerenciarCampanhas = () => {
  const navigation = useNavigation<any>();

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [campanhas, setCampanhas] = useState<Campanha[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://10.0.2.2:8080/campanhas'; // ajuste se usar celular

  useEffect(() => {
    carregarCampanhas();
  }, []);

  const carregarCampanhas = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCampanhas(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao carregar campanhas');
    } finally {
      setLoading(false);
    }
  };

  const adicionarCampanha = async () => {
    if (!titulo || !descricao) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo, descricao }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Campanha adicionada');
        setTitulo('');
        setDescricao('');
        carregarCampanhas(); // atualiza lista
      } else {
        Alert.alert('Erro', 'Erro ao salvar campanha');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao conectar com o servidor');
    }
  };

  const renderCampanha = ({ item }: { item: Campanha }) => (
    <View style={styles.campanhaCard}>
      <Text style={styles.tituloCampanha}>{item.titulo}</Text>
      <Text style={styles.descricaoCampanha}>{item.descricao}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gerenciar Campanhas</Text>

      <TextInput
        style={styles.input}
        placeholder="Título da Campanha"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarCampanha}>
  <Text style={styles.textoBotao}>Adicionar Campanha</Text>
</TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#1A335C" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={campanhas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCampanha}
          style={{ marginTop: 20 }}
        />
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate('gerenciar')}
        style={styles.botaoVoltar}
      >
        <Text style={styles.textoBotaoVoltar}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GerenciarCampanhas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A335C',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  botaoAdicionar: {
    backgroundColor: '#1A335C',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  campanhaCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  tituloCampanha: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A335C',
    marginBottom: 5,
  },
  descricaoCampanha: {
    fontSize: 15,
    color: '#333',
  },
  botaoVoltar: {
    backgroundColor: '#1A335C',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 30,
  },
  textoBotaoVoltar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

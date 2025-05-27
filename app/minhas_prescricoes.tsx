import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

interface PacienteDTO {
  id: number;
  nome: string;
  cpf: string;
}

interface Prescricao {
  id: number;
  paciente: PacienteDTO;
  descricao: string;
  exercicios: string;
}

const MinhasPrescricoesScreen = () => {
  const navigation = useNavigation<any>();
  const { token, user } = useAuth();

  const [prescricoes, setPrescricoes] = useState<Prescricao[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [prescricaoSelecionada, setPrescricaoSelecionada] = useState<Prescricao | null>(null);

  useEffect(() => {
    const fetchPrescricoes = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:8080/prescricoes`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data: Prescricao[] = await response.json();

        
        const minhasPrescricoes = data.filter(p => p.paciente.id === user?.id);
        setPrescricoes(minhasPrescricoes);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar as prescrições.');
      } finally {
        setLoading(false);
      }
    };

    if (token && user) {
      fetchPrescricoes();
    }
  }, [token, user]);

  const abrirDetalhes = (prescricao: Prescricao) => {
    setPrescricaoSelecionada(prescricao);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setPrescricaoSelecionada(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minhas Prescrições</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#1A335C" />
      ) : (
        <FlatList
          data={prescricoes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => abrirDetalhes(item)}>
              <Text style={styles.descricao}>{item.descricao}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={styles.vazio}>Nenhuma prescrição encontrada.</Text>}
        />
      )}

      <TouchableOpacity onPress={() => navigation.navigate('tela_paciente')} style={styles.botaoVoltar}>
        <Text style={styles.textoBotaoVoltar}>Voltar</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {prescricaoSelecionada && (
              <>
                <Text style={styles.modalTitulo}>Descrição</Text>
                <Text style={styles.modalDescricao}>{prescricaoSelecionada.descricao}</Text>
                <Text style={styles.modalTitulo}>Exercícios</Text>
                <Text>{prescricaoSelecionada.exercicios}</Text>

                <TouchableOpacity style={styles.botaoFechar} onPress={fecharModal}>
                  <Text style={styles.textoBotao}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  titulo: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
  descricao: { fontSize: 16, color: '#555' },
  botaoVoltar: { backgroundColor: '#1A335C', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  textoBotaoVoltar: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '80%', backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center' },
  modalTitulo: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  modalDescricao: { fontSize: 16, marginVertical: 10 },
  botaoFechar: { marginTop: 20, backgroundColor: '#555', padding: 10, borderRadius: 5, alignItems: 'center', width: '100%' },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  vazio: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#999' },
});

export default MinhasPrescricoesScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Prescricao {
  id: number;
  paciente: string;
  descricao: string;
  exercicios: string;
}

const TelaPrescricoes = () => {
  const navigation = useNavigation<any>();
  const [prescricoes, setPrescricoes] = useState<Prescricao[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [prescricaoSelecionada, setPrescricaoSelecionada] = useState<Prescricao | null>(null);

  useEffect(() => {
    fetch('http://10.0.2.2:8080/prescricoes') // Altere se estiver usando IP local
      .then(response => response.json())
      .then(data => setPrescricoes(data))
      .catch(error => {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar as prescrições.');
      });
  }, []);

  const abrirDetalhes = (prescricao: Prescricao) => {
    setPrescricaoSelecionada(prescricao);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setPrescricaoSelecionada(null);
  };

  const removerPrescricao = (id: number) => {
    Alert.alert('Confirmar', 'Deseja remover esta prescrição?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        onPress: () => {
          // Opcional: integrar com DELETE /prescricoes/{id} depois
          setPrescricoes(prescricoes.filter(p => p.id !== id));
          fecharModal();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Prescrições</Text>
      <FlatList
        data={prescricoes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => abrirDetalhes(item)}>
            <Text style={styles.paciente}>{item.paciente}</Text>
            <Text style={styles.descricao}>{item.descricao}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity onPress={() => navigation.navigate('adicionar_prescricao')} style={styles.botaoAdicionar}>
        <Text style={styles.textoBotao}>Adicionar Prescrição</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('tela_profissional')} style={styles.botaoVoltar}>
        <Text style={styles.textoBotaoVoltar}>Voltar</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {prescricaoSelecionada && (
              <>
                <Text style={styles.modalTitulo}>{prescricaoSelecionada.paciente}</Text>
                <Text style={styles.modalDescricao}>{prescricaoSelecionada.descricao}</Text>
                <Text style={styles.modalDescricao}>Exercícios:</Text>
                <Text>{prescricaoSelecionada.exercicios}</Text>

                <View style={styles.botoesModal}>
                  <TouchableOpacity
                    style={styles.botaoEditar}
                    onPress={() => {
                      fecharModal();
                      navigation.navigate('editar_prescricao', { prescricao: prescricaoSelecionada });
                    }}
                  >
                    <Text style={styles.textoBotao}>Editar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.botaoRemover}
                    onPress={() => removerPrescricao(prescricaoSelecionada.id)}
                  >
                    <Text style={styles.textoBotao}>Remover</Text>
                  </TouchableOpacity>
                </View>

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
  paciente: { fontSize: 18, fontWeight: 'bold' },
  descricao: { fontSize: 16, color: '#555' },
  botaoAdicionar: { backgroundColor: '#1A335C', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  botaoVoltar: { backgroundColor: '#1A335C', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  textoBotaoVoltar: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '80%', backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center' },
  modalTitulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  modalDescricao: { fontSize: 16, marginBottom: 10 },
  botoesModal: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  botaoEditar: { backgroundColor: '#1A335C', padding: 10, borderRadius: 5, flex: 1, alignItems: 'center', marginRight: 5 },
  botaoRemover: { backgroundColor: '#cc0000', padding: 10, borderRadius: 5, flex: 1, alignItems: 'center' },
  botaoFechar: { marginTop: 10, backgroundColor: '#555', padding: 10, borderRadius: 5, alignItems: 'center', width: '100%' },
});

export default TelaPrescricoes;

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TelaPrescricoes = () => {
  const navigation = useNavigation();
  const [prescricoes, setPrescricoes] = useState([
    { id: '1', paciente: 'João Silva', descricao: 'Exercícios para lombar', data: '05/04/2025' },
    { id: '2', paciente: 'Ana Souza', descricao: 'Reabilitação pós-operatória', data: '07/04/2025' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [prescricaoSelecionada, setPrescricaoSelecionada] = useState(null);

  const abrirDetalhes = (prescricao) => {
    setPrescricaoSelecionada(prescricao);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setPrescricaoSelecionada(null);
  };

  const removerPrescricao = (id) => {
    setPrescricoes(prescricoes.filter(prescricao => prescricao.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Prescrições</Text>
      <FlatList
        data={prescricoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => abrirDetalhes(item)}>
            <Text style={styles.paciente}>{item.paciente}</Text>
            <Text style={styles.descricao}>{item.descricao}</Text>
            <Text style={styles.data}>{item.data}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity onPress={() => navigation.navigate('adicionar_prescricao') }
        style={styles.botaoAdicionar}
        
      >
        <Text style={styles.textoBotao}>Adicionar Prescrição</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('tela_profissional') }
        style={styles.botaoVoltar}
        
      >
        <Text style={styles.textoBotaoVoltar}>Voltar</Text>
      </TouchableOpacity>


      
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {prescricaoSelecionada && (
              <>
                <Text style={styles.modalTitulo}>{prescricaoSelecionada.paciente}</Text>
                <Text style={styles.modalDescricao}>{prescricaoSelecionada.descricao}</Text>
                <Text style={styles.modalData}>Data: {prescricaoSelecionada.data}</Text>
                <View style={styles.botoesModal}>
                  <TouchableOpacity
                    style={styles.botaoEditar}
                    onPress={() => {
                      fecharModal();
                     
                    }}
                  >
                    <Text style={styles.textoBotao}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.botaoRemover}
                    onPress={() => {
                      removerPrescricao(prescricaoSelecionada.id);
                      fecharModal();
                    }}
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
  data: { fontSize: 14, color: '#777' },
  botaoAdicionar: { backgroundColor: '#1A335C', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  botaoVoltar: { backgroundColor: '#1A335C', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  textoBotaoVoltar: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '80%', backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center' },
  modalTitulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  modalDescricao: { fontSize: 16, marginBottom: 10 },
  modalData: { fontSize: 14, color: '#777', marginBottom: 20 },
  botoesModal: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  botaoEditar: { backgroundColor: '#1A335C', padding: 10, borderRadius: 5, flex: 1, alignItems: 'center', marginRight: 5 },
  botaoRemover: { backgroundColor: '#cc0000', padding: 10, borderRadius: 5, flex: 1, alignItems: 'center' },
  botaoFechar: { marginTop: 10, backgroundColor: '#555', padding: 10, borderRadius: 5, alignItems: 'center', width: '100%' },
});

export default TelaPrescricoes;

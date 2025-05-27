import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

interface Paciente {
  id: number;
  nome: string;
}

const EvolucaoPacienteScreen = () => {
  const navigation = useNavigation<any>();

  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [pacienteId, setPacienteId] = useState<number | undefined>(undefined);
  const [data, setData] = useState('');
  const [descricao, setDescricao] = useState('');
  const [progresso, setProgresso] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Preenche data automaticamente no formato brasileiro
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    setData(`${dia}/${mes}/${ano}`);

    // Carregar pacientes
    fetch('http://10.0.2.2:8080/pacientes')
      .then(res => res.json())
      .then(data => {
        setPacientes(data);
        if (data.length > 0) setPacienteId(data[0].id);
      })
      .catch(err => {
        console.error('Erro ao buscar pacientes:', err);
        Alert.alert('Erro', 'Não foi possível carregar os pacientes.');
      });
  }, []);

  const formatarDataParaBackend = (dataBr: string) => {
    const [dia, mes, ano] = dataBr.split('/');
    return `${ano}-${mes}-${dia}`; // YYYY-MM-DD
  };

  const handleSalvar = () => {
    if (!pacienteId || !data || !descricao || !progresso) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    const dataBackend = formatarDataParaBackend(data);

    const evolucao = {
      pacienteId,
      data: dataBackend,
      descricao,
      progresso: parseFloat(progresso),
    };

    console.log('Enviando evolução:', evolucao);

    setLoading(true);

    fetch('http://10.0.2.2:8080/evolucao', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(evolucao),
    })
      .then(res => {
        if (res.ok) {
          Alert.alert('Sucesso', 'Evolução salva!');
          navigation.goBack();
        } else {
          res.text().then(text => {
            console.error('Erro no backend:', text);
            Alert.alert('Erro', 'Não foi possível salvar a evolução.\n' + text);
          });
        }
      })
      .catch(err => {
        console.error('Erro:', err);
        Alert.alert('Erro', 'Não foi possível salvar a evolução.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Adicionar Evolução</Text>

      <Text style={styles.label}>Paciente</Text>
      {pacientes.length > 0 ? (
        <Picker
          selectedValue={pacienteId}
          style={styles.input}
          onValueChange={(itemValue: number) => setPacienteId(itemValue)}
        >
          {pacientes.map(p => (
            <Picker.Item key={p.id} label={p.nome} value={p.id} />
          ))}
        </Picker>
      ) : (
        <ActivityIndicator size="small" color="#1A335C" />
      )}

      <Text style={styles.label}>Data</Text>
      <TextInput
        style={styles.input}
        placeholder="DD/MM/AAAA"
        value={data}
        onChangeText={setData}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Progresso (%)</Text>
      <TextInput
        style={styles.input}
        placeholder="0 - 100"
        keyboardType="numeric"
        value={progresso}
        onChangeText={setProgresso}
      />

      <TouchableOpacity style={styles.botaoSalvar} onPress={handleSalvar} disabled={loading}>
        <Text style={styles.textoBotao}>{loading ? 'Salvando...' : 'Salvar'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoCancelar} onPress={() => navigation.goBack()}>
        <Text style={styles.textoBotao}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EvolucaoPacienteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    backgroundColor: '#fff',
  },
  botaoSalvar: {
    backgroundColor: '#1A335C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  botaoCancelar: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from '@/contexts/AuthContext';
import RNPickerSelect from 'react-native-picker-select';

interface Paciente {
  id: number;
  nome: string;
}

const TelaAdicionarConsulta = () => {
  const navigation = useNavigation<any>();
  const { token } = useAuth();

  const [data, setData] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [pacienteId, setPacienteId] = useState<number | null>(null);
  const [loadingPacientes, setLoadingPacientes] = useState(true);

  const fetchPacientes = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8080/pacientes', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar pacientes');
      }

      const data: Paciente[] = await response.json();
      setPacientes(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar a lista de pacientes.');
    } finally {
      setLoadingPacientes(false);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const adicionarConsulta = async () => {
    if (!pacienteId) {
      Alert.alert('Erro', 'Por favor, selecione um paciente.');
      return;
    }

    const novaConsulta = {
      pacienteId,
      data: data.toISOString().split('T')[0], 
      hora: hora.toTimeString().split(' ')[0], 
    };

    try {
      const response = await fetch('http://10.0.2.2:8080/consultas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(novaConsulta),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Consulta adicionada com sucesso!');
        navigation.goBack();
      } else {
        Alert.alert('Erro', 'Erro ao salvar a consulta.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Adicionar Consulta</Text>

      {loadingPacientes ? (
        <ActivityIndicator size="large" color="#1A335C" />
      ) : (
        <>
          <Text style={styles.label}>Paciente</Text>
          <View style={styles.input}>
            <RNPickerSelect
              onValueChange={(value) => setPacienteId(value)}
              items={pacientes.map(p => ({ label: p.nome, value: p.id }))}
              placeholder={{ label: 'Selecione um paciente', value: null }}
              value={pacienteId}
            />
          </View>

          <Text style={styles.label}>Data</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
            <Text>{data.toLocaleDateString('pt-BR')}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={data}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setData(selectedDate);
              }}
            />
          )}

          <Text style={styles.label}>Hora</Text>
          <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input}>
            <Text>{hora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={hora}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => {
                setShowTimePicker(false);
                if (selectedTime) setHora(selectedTime);
              }}
            />
          )}

          <TouchableOpacity style={styles.botaoSalvar} onPress={adicionarConsulta}>
            <Text style={styles.textoBotao}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoCancelar} onPress={() => navigation.goBack()}>
            <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
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
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  botaoSalvar: {
    backgroundColor: '#1A335C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  botaoCancelar: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textoBotaoCancelar: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TelaAdicionarConsulta;

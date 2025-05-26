import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TelaAdicionarConsulta = () => {
  const navigation = useNavigation<any>();
  const [data, setData] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [paciente, setPaciente] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const adicionarConsulta = async () => {
    if (!paciente.trim()) {
      Alert.alert('Erro', 'Por favor, informe o nome do paciente.');
      return;
    }

    const novaConsulta = {
      paciente,
      data: data.toISOString().split('T')[0], // "yyyy-MM-dd"
      hora: hora.toTimeString().split(' ')[0], // "HH:mm:ss"
    };

    try {
      const response = await fetch('http://10.0.2.2:8080/consultas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
    <View style={styles.container}>
      <Text style={styles.titulo}>Adicionar Consulta</Text>

      <Text style={styles.label}>Paciente</Text>
      <TextInput
        style={styles.input}
        value={paciente}
        onChangeText={setPaciente}
        placeholder="Nome do paciente"
      />

      <Text style={styles.label}>Data</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text>{data.toLocaleDateString()}</Text>
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
        <Text>{hora.toLocaleTimeString()}</Text>
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
        <Text style={styles.textoBotao}>Cancelar</Text>
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
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  botaoSalvar: {
    backgroundColor: '#1A335C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
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
});

export default TelaAdicionarConsulta;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from '@/contexts/AuthContext';

const TelaEditarConsulta = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { consulta } = route.params;

  const { token } = useAuth();

  const [data, setData] = useState(new Date(consulta.data));
  const [hora, setHora] = useState(() => {
    const [hh, mm] = consulta.hora.split(':');
    const date = new Date();
    date.setHours(Number(hh), Number(mm));
    return date;
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const salvarEdicao = async () => {
    if (!data || !hora) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    const consultaEditada = {
      id: consulta.id,
      pacienteId: consulta.paciente.id,  // Mantemos o mesmo paciente
      data: data.toISOString().split('T')[0],
      hora: hora.toTimeString().substring(0, 5),
    };

    try {
      const response = await fetch(`http://10.0.2.2:8080/consultas/${consulta.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(consultaEditada),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Consulta atualizada com sucesso!');
        navigation.goBack();
      } else {
        Alert.alert('Erro', 'Erro ao atualizar a consulta.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Editar Consulta</Text>

      <Text style={styles.label}>Paciente</Text>
      <View style={[styles.input, { backgroundColor: '#e0e0e0' }]}>
        <Text>{consulta.paciente.nome}</Text>
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

      <TouchableOpacity style={styles.botaoSalvar} onPress={salvarEdicao}>
        <Text style={styles.textoBotao}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botaoCancelar} onPress={() => navigation.goBack()}>
        <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
      </TouchableOpacity>
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
    padding: 10,
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

export default TelaEditarConsulta;

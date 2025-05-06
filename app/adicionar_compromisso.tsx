import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ArrowLeft, CalendarDays, Clock, UserRound } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const AdicionarCompromissoScreen = () => {
  const navigation = useNavigation();
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [mostrarData, setMostrarData] = useState(false);
  const [mostrarHora, setMostrarHora] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState('');

  // Simulando pacientes
  const pacientes = [
    { id: '1', nome: 'Maria Souza' },
    { id: '2', nome: 'Carlos Oliveira' },
    { id: '3', nome: 'Fernanda Lima' },
  ];

  const salvarCompromisso = () => {
    if (!titulo || !descricao || !pacienteSelecionado) {
      alert('Preencha todos os campos e selecione um paciente!');
      return;
    }

    const compromisso = {
      titulo,
      descricao,
      data,
      hora,
      paciente: pacienteSelecionado,
    };

    console.log('Compromisso salvo:', compromisso);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Novo Compromisso</Text>

      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Reunião, Atendimento..."
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Descreva o compromisso"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <Text style={styles.label}>Paciente</Text>
      <View style={styles.pickerContainer}>
        <UserRound size={20} color="#1A335C" />
        <Picker
          selectedValue={pacienteSelecionado}
          style={styles.picker}
          onValueChange={(itemValue) => setPacienteSelecionado(itemValue)}>
          <Picker.Item label="Selecione um paciente..." value="" />
          {pacientes.map((paciente) => (
            <Picker.Item key={paciente.id} label={paciente.nome} value={paciente.nome} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Data</Text>
      <TouchableOpacity style={styles.datePicker} onPress={() => setMostrarData(true)}>
        <CalendarDays size={20} color="#1A335C" />
        <Text style={styles.dateText}>{data.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {mostrarData && (
        <DateTimePicker
          value={data}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setMostrarData(false);
            if (selectedDate) setData(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Hora</Text>
      <TouchableOpacity style={styles.datePicker} onPress={() => setMostrarHora(true)}>
        <Clock size={20} color="#1A335C" />
        <Text style={styles.dateText}>{hora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      </TouchableOpacity>
      {mostrarHora && (
        <DateTimePicker
          value={hora}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setMostrarHora(false);
            if (selectedTime) setHora(selectedTime);
          }}
        />
      )}

      <TouchableOpacity style={styles.botaoSalvar} onPress={salvarCompromisso}>
        <Text style={styles.textoBotao}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
        
        <Text style={styles.textoBotao}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdicionarCompromissoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1A335C',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  dateText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  botaoSalvar: {
    backgroundColor: '#1A335C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  botaoVoltar: {
    backgroundColor: '#888',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

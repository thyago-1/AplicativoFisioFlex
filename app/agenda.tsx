import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CalendarDays } from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';

const TelaAgenda = () => {
  const navigation = useNavigation();

  const [compromissos, setCompromissos] = useState([
    { id: '1', paciente: 'João Silva', data: '2025-04-05', hora: '09:00' },
    { id: '2', paciente: 'Ana Costa', data: '2025-04-05', hora: '11:00' },
    { id: '3', paciente: 'Lucas Pereira', data: '2025-04-06', hora: '14:00' },
    { id: '4', paciente: 'Fernanda Lima', data: '2025-04-07', hora: '10:30' },
    { id: '5', paciente: 'Carlos Mendes', data: '2025-04-07', hora: '13:00' },
    { id: '6', paciente: 'Debora Teixeira', data: '2025-04-08', hora: '09:45' },
    { id: '7', paciente: 'Diego Souza', data: '2025-04-10', hora: '15:30' },
    { id: '8', paciente: 'Tatiane Alves', data: '2025-04-12', hora: '08:00' },
    { id: '9', paciente: 'Rafael Monteiro', data: '2025-05-01', hora: '11:15' },
    { id: '10', paciente: 'Juliana Rocha', data: '2025-05-03', hora: '10:00' },
    { id: '11', paciente: 'Marcos Vinicius', data: '2025-05-05', hora: '14:45' },
  ]);

  const [mesSelecionado, setMesSelecionado] = useState('04');
  const [diaSelecionado, setDiaSelecionado] = useState('');

  const filtrarCompromissos = () => {
    return compromissos.filter((item) => {
      const [ano, mes, dia] = item.data.split('-');
      const filtroMes = mes === mesSelecionado;
      const filtroDia = diaSelecionado ? dia === diaSelecionado : true;
      return filtroMes && filtroDia;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Agenda</Text>

      <View style={styles.filtros}>
        <View style={styles.pickerWrapper}>
          <Text style={styles.label}>Mês:</Text>
          <Picker
            selectedValue={mesSelecionado}
            onValueChange={(itemValue) => setMesSelecionado(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Abril" value="04" />
            <Picker.Item label="Maio" value="05" />
          </Picker>
        </View>

        <View style={styles.pickerWrapper}>
          <Text style={styles.label}>Dia:</Text>
          <Picker
            selectedValue={diaSelecionado}
            onValueChange={(itemValue) => setDiaSelecionado(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Todos" value="" />
            {[...Array(31)].map((_, i) => (
              <Picker.Item key={i} label={`${i + 1}`} value={String(i + 1).padStart(2, '0')} />
            ))}
          </Picker>
        </View>
      </View>

      <FlatList
        data={filtrarCompromissos()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <CalendarDays size={20} color="#1A335C" />
              <Text style={styles.data}>{item.data}</Text>
            </View>
            <Text style={styles.hora}>🕒 {item.hora}</Text>
            <Text style={styles.paciente}>👤 {item.paciente}</Text>
          </View>
        )}
      />

      <TouchableOpacity onPress={() => navigation.navigate('adicionar_compromisso')} style={styles.botaoAdicionar}>
        <Text style={styles.textoBotao}>Adicionar Compromisso</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('tela_profissional')} style={styles.botaoVoltar}>
        <Text style={styles.textoBotao}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fc',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A335C',
    marginBottom: 20,
    textAlign: 'center',
  },
  filtros: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pickerWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 14,
    color: '#1A335C',
    marginBottom: 5,
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  data: {
    marginLeft: 8,
    fontWeight: 'bold',
    color: '#1A335C',
  },
  hora: {
    fontSize: 16,
    marginBottom: 5,
  },
  paciente: {
    fontSize: 16,
  },
  botaoAdicionar: {
    backgroundColor: '#1A335C',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  botaoVoltar: {
    backgroundColor: '#1A335C',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TelaAgenda;

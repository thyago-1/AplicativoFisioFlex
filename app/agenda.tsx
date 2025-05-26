import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CalendarDays } from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';

interface Compromisso {
  id: number;
  paciente: string;
  data: string; // "2025-05-03"
  hora: string; // "14:00"
}

const TelaAgenda = () => {
  const navigation = useNavigation<any>();

  const [compromissos, setCompromissos] = useState<Compromisso[]>([]);
  const [loading, setLoading] = useState(true);

  const [mesSelecionado, setMesSelecionado] = useState('04');
  const [diaSelecionado, setDiaSelecionado] = useState('');

  useEffect(() => {
    fetch('http://10.0.2.2:8080/consultas') // ajuste para seu IP se estiver em celular físico
      .then(res => res.json())
      .then(data => setCompromissos(data))
      .catch(error => {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar os compromissos.');
      })
      .finally(() => setLoading(false));
  }, []);

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
            <Picker.Item label="Junho" value="06" />
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

      {loading ? (
        <ActivityIndicator size="large" color="#1A335C" />
      ) : (
        <FlatList
          data={filtrarCompromissos()}
          keyExtractor={(item) => item.id.toString()}
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
      )}

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

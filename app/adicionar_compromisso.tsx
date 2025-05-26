import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CalendarDays, Clock, UserRound } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

interface Paciente {
  id: number;
  nome: string;
}

const AdicionarCompromissoScreen = () => {
  const navigation = useNavigation<any>();

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [mostrarData, setMostrarData] = useState(false);
  const [mostrarHora, setMostrarHora] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState<number | null>(null);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loadingPacientes, setLoadingPacientes] = useState(true);

  useEffect(() => {
    fetch('http://10.0.2.2:8080/pacientes')
      .then(res => res.json())
      .then(data => setPacientes(data))
      .catch(err => {
        console.error(err);
        Alert.alert('Erro', 'Erro ao buscar pacientes.');
      })
      .finally(() => setLoadingPacientes(false));
  }, []);

  const salvarCompromisso = async () => {
    if (!titulo || !descricao || !pacienteSelecionado) {
      Alert.alert('Erro', 'Preencha todos os campos e selecione um paciente!');
      return;
    }

    const compromisso = {
      pacienteId: pacienteSelecionado,
      data: data.toISOString().split('T')[0],
      hora: hora.toTimeString().split(' ')[0],
    };

    try {
      const response = await fetch('http://10.0.2.2:8080/consultas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(compromisso),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Consulta agendada com sucesso!');
        navigation.goBack();
      } else {
        Alert.alert('Erro', 'Erro ao salvar compromisso.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro de conexão com o servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Novo Compromisso</Text>

      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Atendimento, Avaliação..."
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
      {loadingPacientes ? (
        <ActivityIndicator color="#1A335C" />
      ) : (
        <View style={styles.pickerContainer}>
          <UserRound size={20} color="#1A335C" />
          <Picker
            selectedValue={pacienteSelecionado}
            style={styles.picker}
            onValueChange={(itemValue) => setPacienteSelecionado(itemValue)}
          >
            <Picker.Item label="Selecione um paciente..." value={null} />
            {pacientes.map((p) => (
              <Picker.Item key={p.id} label={p.nome} value={p.id} />
            ))}
          </Picker>
        </View>
      )}

      <Text style={styles.label}>Data</Text>
      <TouchableOpacity
        style={styles.datePicker}
        onPress={() => setMostrarData(true)}
      >
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
      <TouchableOpacity
        style={styles.datePicker}
        onPress={() => setMostrarHora(true)}
      >
        <Clock size={20} color="#1A335C" />
        <Text style={styles.dateText}>
          {hora.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
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
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

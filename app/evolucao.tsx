import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native"; 

type RootStackParamList = {
  "Minha Evolução": undefined;
};
type TelaMinhaEvolucaoNavigationProp = StackNavigationProp<RootStackParamList, "Minha Evolução">;

interface Props {
  navigation: TelaMinhaEvolucaoNavigationProp;
}

const TelaMinhaEvolucao: React.FC<Props> = ({ }) => {
  const navigation = useNavigation();

  const progresso = [20, 40, 50, 60, 80, 90, 100];

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>

        <TouchableOpacity 
        
        onPress={() => navigation.navigate('tela_paciente') } >
                  
          <Ionicons name="arrow-back" size={24} color="#1A335C" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Minha Evolução</Text>
        <View style={{ width: 24 }} />
      </View>

     
      <View style={styles.card}>
        <Text style={styles.subtitulo}>Progresso do Tratamento</Text>
        <LineChart
          data={{
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai',],
            datasets: [{ data: progresso }],

          }}
          width={Dimensions.get('window').width - 60}
          height={170}
          yAxisSuffix="%"
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            color: (opacity = 1) => `rgba(26, 51, 92, ${opacity})`,
          }}
          bezier
        />
      </View>

      
      <ScrollView style={styles.card}>
        <Text style={styles.subtitulo}>Histórico de Sessões</Text>
        {[
          
          { data: '12/01/2025', descricao: 'Exercícios de mobilidade' },
          { data: '14/02/2025', descricao: 'Fortalecimento muscular' },
          { data: '16/03/2025', descricao: 'Treino de equilíbrio' },
          { data: '18/04/2025', descricao: 'Alongamento passivo' },
          { data: '20/05/2025', descricao: 'Reavaliação e ajustes' },
          
        ].map((sessao, index) => (
          <View key={index} style={styles.sessao}>
            <Text style={styles.sessaoData}>{sessao.data}</Text>
            <Text style={styles.sessaoTexto}>{sessao.descricao}</Text>
          </View>
        ))}
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A9A6BA',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A335C',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A335C',
    marginBottom: 10,
    textAlign: 'center',
  },
  sessao: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    paddingVertical: 10,
  },
  sessaoData: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A335C',
  },
  sessaoTexto: {
    fontSize: 14,
    color: '#555',
  },
});

export default TelaMinhaEvolucao;

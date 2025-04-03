import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native"; 

type RootStackParamList = {
  "Meus Atendimentos": undefined;
};
type TelaMeusAtendimentosNavigationProp = StackNavigationProp<RootStackParamList, "Meus Atendimentos">;

interface Props {
  navigation: TelaMeusAtendimentosNavigationProp;
}


const atendimentosPassados = [
  { id: "1", data: "10/03/2025", descricao: "Sessão de fisioterapia geral" },
  { id: "2", data: "15/03/2025", descricao: "Treino de equilíbrio" },
  { id: "3", data: "24/06/2025", descricao: "Reabilitação pós-cirúrgica" }
];

const atendimentosFuturos = [
  { id: "4", data: "14/08/2025", descricao: "Fortalecimento muscular" },
  { id: "5", data: "14/09/2025", descricao: "Alongamento guiado" }
];

const MeusAtendimentosScreen: React.FC<Props> = ({  }) => {
 
    const navigation = useNavigation();
    return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        
        <TouchableOpacity onPress={() => navigation.navigate('tela_paciente') } >

          <Ionicons name="arrow-back" size={24} color="#1A335C" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Meus Atendimentos</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitulo}>Atendimentos Passados</Text>
        <FlatList
          data={atendimentosPassados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.atendimento}>
              <Text style={styles.data}>{item.data}</Text>
              <Text style={styles.descricao}>{item.descricao}</Text>
            </View>
          )}
        />
      </View>

      
      <View style={styles.card}>
        <Text style={styles.subtitulo}>Atendimentos Futuros</Text>
        <FlatList
          data={atendimentosFuturos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.atendimento}>
              <Text style={styles.data}>{item.data}</Text>
              <Text style={styles.descricao}>{item.descricao}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A9A6BA",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A335C",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A335C",
    marginBottom: 10,
    textAlign: "center",
  },
  atendimento: {
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
    paddingVertical: 10,
  },
  data: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A335C",
  },
  descricao: {
    fontSize: 14,
    color: "#555",
  },
});

export default MeusAtendimentosScreen;

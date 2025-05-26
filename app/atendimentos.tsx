import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface Atendimento {
  id: string;
  data: string;
  descricao: string;
}

const MeusAtendimentosScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const [loading, setLoading] = useState(true);

  const idPaciente = 1; // ✅ Troque conforme sua lógica de login/AsyncStorage
  const API_URL = `http://10.0.2.2:8080/atendimentos/${idPaciente}`;

  useEffect(() => {
    const buscarAtendimentos = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setAtendimentos(data);
      } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Não foi possível carregar os atendimentos.");
      } finally {
        setLoading(false);
      }
    };

    buscarAtendimentos();
  }, []);

  const hoje = new Date();

  const passados = atendimentos.filter((a) => new Date(a.data) < hoje);
  const futuros = atendimentos.filter((a) => new Date(a.data) >= hoje);

  const renderItem = ({ item }: { item: Atendimento }) => (
    <View style={styles.atendimento}>
      <Text style={styles.data}>{new Date(item.data).toLocaleDateString()}</Text>
      <Text style={styles.descricao}>{item.descricao}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("tela_paciente")}>
          <Ionicons name="arrow-back" size={24} color="#1A335C" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Meus Atendimentos</Text>
        <View style={{ width: 24 }} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#1A335C" />
      ) : (
        <>
          <View style={styles.card}>
            <Text style={styles.subtitulo}>Atendimentos Passados</Text>
            <FlatList
              data={passados}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.subtitulo}>Atendimentos Futuros</Text>
            <FlatList
              data={futuros}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default MeusAtendimentosScreen;

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

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";


type RootStackParamList = {
  "Meus Pagamentos": undefined;
};
type TelaMeusPagamentosNavigationProp = StackNavigationProp<RootStackParamList, "Meus Pagamentos">;

interface Props {
  navigation: TelaMeusPagamentosNavigationProp;
}


const pagamentos = [
  { id: "1", data: "10/02/2025", valor: "R$ 150,00", status: "Pago" },
  { id: "2", data: "10/03/2025", valor: "R$ 150,00", status: "Pendente" },
  { id: "3", data: "10/04/2025", valor: "R$ 150,00", status: "Pendente" },
];

const TelaMeusPagamentos: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
     
      <View style={styles.header}>
        <TouchableOpacity >
          <Ionicons name="arrow-back" size={24} color="#1A335C" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Meus Pagamentos</Text>
        <View style={{ width: 24 }} />
      </View>

      
      <FlatList
        data={pagamentos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.subtitulo}>{item.data}</Text>
            <Text style={styles.valor}>{item.valor}</Text>
            <Text style={[styles.status, item.status === "Pendente" ? styles.pendente : styles.pago]}>
              {item.status}
            </Text>

            {item.status === "Pendente" && (
              <TouchableOpacity style={styles.botao}>
                <Text style={styles.botaoTexto}>Pagar Agora</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
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
    alignItems: "center",
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A335C",
  },
  valor: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 5,
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 5,
    borderRadius: 10,
    marginBottom: 10,
  },
  pago: {
    color: "#4CAF50",
    backgroundColor: "#E8F5E9",
  },
  pendente: {
    color: "#D32F2F",
    backgroundColor: "#FFEBEE",
  },
  botao: {
    backgroundColor: "#1A335C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  botaoTexto: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TelaMeusPagamentos;

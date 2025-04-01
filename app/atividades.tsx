import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { StackNavigationProp } from "@react-navigation/stack";


type RootStackParamList = {
  "Minhas Atividades": undefined;
};
type TelaMinhasAtividadesNavigationProp = StackNavigationProp<RootStackParamList, "Minhas Atividades">;

interface Props {
  navigation: TelaMinhasAtividadesNavigationProp;
}


const atividades = [
  {
    id: "1",
    titulo: "Alongamento para lombar",
    descricao: "Exercício de alongamento para aliviar a dor lombar.",
    videoUrl: "https://www.youtube.com/watch?v=2rhE67qpFT4",
  },
  {
    id: "2",
    titulo: "Exercícios de mobilidade",
    descricao: "Ajuda na flexibilidade e mobilidade das articulações.",
    videoUrl: "https://www.youtube.com/watch?v=JyG8LvVNIKM&t=111s",
  },
  {
    id: "3",
    titulo: "Treino de força para joelho",
    descricao: "Fortalecimento muscular para prevenção de lesões.",
    videoUrl: "https://www.youtube.com/watch?v=i3dNhtvTJQ4",
  },
];

const TelaMinhasAtividades: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
 
      <View style={styles.header}>
        <TouchableOpacity >
          <Ionicons name="arrow-back" size={24} color="#1A335C" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Minhas Atividades</Text>
        <View style={{ width: 24 }} /> 
      </View>

      
      <FlatList
        data={atividades}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.subtitulo}>{item.titulo}</Text>
            <Text style={styles.descricao}>{item.descricao}</Text>

            
            <View style={styles.videoContainer}>
              <WebView 
                source={{ uri: item.videoUrl }}
                style={styles.video}
              />
            </View>

            <TouchableOpacity style={styles.botao}>
              <Text style={styles.botaoTexto}>Iniciar Atividade</Text>
            </TouchableOpacity>
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
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A335C",
    marginBottom: 10,
    textAlign: "center",
  },
  descricao: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 10,
  },
  videoContainer: {
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  video: {
    flex: 1,
  },
  botao: {
    backgroundColor: "#1A335C",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },
  botaoTexto: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TelaMinhasAtividades;

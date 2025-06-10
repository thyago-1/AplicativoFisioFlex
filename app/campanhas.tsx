import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { router } from 'expo-router';

type RootStackParamList = {
  Campanhas: undefined;
};
type TelaCampanhasNavigationProp = StackNavigationProp<RootStackParamList, "Campanhas">;

interface Props {
  navigation: TelaCampanhasNavigationProp;
}


const campanhas = [
  {
    id: "1",
    titulo: "Semana da Saúde",
    descricao: "Participe da nossa semana especial de cuidados com descontos exclusivos!",
    imagem: require("./assets/img/icone.png"),
  },
  {
    id: "2",
    titulo: "Treinamento Postural",
    descricao: "Aprenda exercícios para melhorar sua postura e evitar dores no dia a dia.",
    imagem: require("./assets/img/icone.png"),
  },
  {
    id: "3",
    titulo: "Promoção FisioFlex",
    descricao: "Ganhe uma sessão extra ao fechar um pacote de 5 atendimentos!",
    imagem: require("./assets/img/icone.png"),
  },
];

const TelaCampanhas: React.FC<Props> = ({  }) => {


  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity 
        onPress={() => router.push('/tela_paciente') } >
          
          <Ionicons name="arrow-back" size={24} color="#1A335C" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Campanhas</Text>
        <View style={{ width: 24 }} /> 
      </View>

      
      <FlatList
        data={campanhas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.imagem} style={styles.imagem} />
            <Text style={styles.tituloCampanha}>{item.titulo}</Text>
            <Text style={styles.descricao}>{item.descricao}</Text>
            <TouchableOpacity style={styles.botao}>
              <Text style={styles.botaoTexto}>Saiba mais</Text>
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
    alignItems: "center",
  },
  imagem: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  tituloCampanha: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A335C",
    textAlign: "center",
  },
  descricao: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
    textAlign: "center",
  },
  botao: {
    backgroundColor: "#1A335C",
    paddingVertical: 10,
    paddingHorizontal: 20,
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

export default TelaCampanhas;

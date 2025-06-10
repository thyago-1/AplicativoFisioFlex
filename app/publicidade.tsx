import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { router } from 'expo-router';

type RootStackParamList = {
  Publicidade: undefined;
};
type TelaPublicidadeNavigationProp = StackNavigationProp<RootStackParamList, "Publicidade">;

interface Props {
  navigation: TelaPublicidadeNavigationProp;
}


const publicidades = [
  {
    id: "1",
    titulo: "Clínica Saúde Viva",
    descricao: "Os melhores tratamentos fisioterapêuticos da região. Agende sua consulta!",
    imagem: require("./assets/img/icone.png"),
  },
  {
    id: "2",
    titulo: "Loja Postura & Bem-Estar",
    descricao: "Produtos ergonômicos para sua saúde e conforto no dia a dia.",
    imagem: require("./assets/img/icone.png"),
  },
  {
    id: "3",
    titulo: "NutriVida",
    descricao: "Consultoria nutricional para potencializar seus resultados na fisioterapia.",
    imagem: require("./assets/img/icone.png"),
  },
];

const TelaPublicidade: React.FC<Props> = ({  }) => {
 

  return (
    <View style={styles.container}>
     
      <View style={styles.header}>
        <TouchableOpacity 
        
        onPress={() => router.push('/tela_paciente') } >

          <Ionicons name="arrow-back" size={24} color="#1A335C" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Publicidade</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <FlatList
        data={publicidades}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.imagem} style={styles.imagem} />
            <Text style={styles.tituloPublicidade}>{item.titulo}</Text>
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
  tituloPublicidade: {
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

export default TelaPublicidade;

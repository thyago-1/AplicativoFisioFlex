import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  "Consultar Serviços": undefined;
};
type TelaConsultarServicosNavigationProp = StackNavigationProp<RootStackParamList, "Consultar Serviços">;

interface Props {
  navigation: TelaConsultarServicosNavigationProp;
}


const servicos = [
  { id: "1", nome: "Avaliação Inicial", descricao: "Consulta para diagnóstico e planejamento do tratamento", preco: "R$ 120,00" },
  { id: "2", nome: "Sessão de Fisioterapia", descricao: "Terapia personalizada com exercícios e técnicas manuais", preco: "R$ 100,00" },
  { id: "3", nome: "Reabilitação Pós-Cirúrgica", descricao: "Programa de recuperação para pós-operatório", preco: "R$ 150,00" },
  { id: "4", nome: "Terapia Manual", descricao: "Técnicas especializadas para alívio da dor e mobilidade", preco: "R$ 130,00" },
];

const TelaConsultarServicos: React.FC<Props> = ({  }) => {
 
 const navigation = useNavigation();

  return (
    <View style={styles.container}>
   
      <View style={styles.header}>
        <TouchableOpacity 
       
       onPress={() => navigation.navigate('tela_paciente') } >

          <Ionicons name="arrow-back" size={24} color="#1A335C" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Consultar Serviços</Text>
        <View style={{ width: 24 }} /> 
      </View>

 
      <FlatList
        data={servicos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.descricao}>{item.descricao}</Text>
            <Text style={styles.preco}>{item.preco}</Text>
            <TouchableOpacity style={styles.botao}>
              <Text style={styles.botaoTexto}>Agendar</Text>
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
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A335C",
  },
  descricao: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  preco: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
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

export default TelaConsultarServicos;

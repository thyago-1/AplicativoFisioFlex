import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { router } from "expo-router";

const TelaInicio = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/img/icone.png")} style={styles.imagem} />

      <Text style={styles.bemvindo}>SEJA BEM-VINDO</Text>

      <TouchableOpacity onPress={() => router.push('/login')} style={styles.btEntrar}>
        <Text style={styles.btTexto}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/ajuda')} style={styles.txtAjuda}>
        <Text style={styles.txtAjudaTexto}>Preciso de ajuda!</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/login_profissional')} style={styles.areaProfissional}>
        <Text style={styles.areaProfissionalTexto}>Área do Profissional</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C7C6D1",
    justifyContent: "center",
    alignItems: "center",
  },
  imagem: {
    width: 400,
    height: 400,
    marginBottom: 20,
  },
  bemvindo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A335C",
    marginVertical: 10,
  },
  btEntrar: {
    backgroundColor: "#1A335C",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginVertical: 20,
  },
  btTexto: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  txtAjuda: {
    marginBottom: 30,
  },
  txtAjudaTexto: {
    color: "#1A335C",
    textDecorationLine: "underline",
  },
  areaProfissional: {
    marginBottom: 120,
  },
  areaProfissionalTexto: {
    color: "#1A335C",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});

export default TelaInicio;

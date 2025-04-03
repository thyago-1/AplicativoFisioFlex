  import React from "react";
  import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
  import { useNavigation } from "@react-navigation/native"; 

  const TelaInicio = () => {
    const navigation = useNavigation();

    return (
      <View style={styles.container}>
        <Image source={require("./assets/img/icone.png")} style={styles.imagem} />

        <Text style={styles.bemvindo}>SEJA BEM-VINDO</Text>

        <TouchableOpacity       onPress={() => navigation.navigate('login') } 
        
        style={styles.btEntrar} >
          <Text style={styles.btTexto}>Entrar</Text>
        
        </TouchableOpacity> o
        <TouchableOpacity  onPress={() => navigation.navigate('ajuda') }   style={styles.txtAjuda}>
          <Text style={styles.txtAjuda}>Preciso de ajuda!</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('login_profissional') }style={styles.areaProfissional}>
          <Text style={styles.areaProfissional}>Área do Profissional</Text>
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
      color: "#1A335C",
      marginBottom: 30,
      textDecorationLine: "underline",
    },
    areaProfissional: {
      color: "#1A335C",
      fontSize: 14,
      marginBottom: 120,
      textDecorationLine: "underline",
    },
  });

  export default TelaInicio;

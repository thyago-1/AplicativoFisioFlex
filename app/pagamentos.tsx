import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Alert, SafeAreaView, RefreshControl } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/contexts/AuthContext";

interface Pagamento {
  id: string;
  data: string;
  valor: number;
  status: string;
}

const TelaMeusPagamentos: React.FC = () => {
  const navigation = useNavigation<any>();
  const { user, token } = useAuth();

  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const idPaciente = user?.id; // ✅ Agora puxa dinamicamente do AuthContext

  const API_URL = `http://10.0.2.2:8080/pagamentos/${idPaciente}`;

  const buscarPagamentos = useCallback(async () => {
    if (!idPaciente || !token) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const data: Pagamento[] = await response.json();
      setPagamentos(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro ao carregar pagamentos.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [API_URL, idPaciente, token]);

  useEffect(() => {
    buscarPagamentos();
  }, [buscarPagamentos]);

  const onRefresh = () => {
    setRefreshing(true);
    buscarPagamentos();
  };

  const renderItem = ({ item }: { item: Pagamento }) => (
    <View style={styles.card}>
      <Text style={styles.subtitulo}>{new Date(item.data).toLocaleDateString('pt-BR')}</Text>
      <Text style={styles.valor}>R$ {item.valor.toFixed(2)}</Text>
      <Text style={[styles.status, item.status === "Pendente" ? styles.pendente : styles.pago]}>
        {item.status}
      </Text>

      {item.status === "Pendente" && (
        <TouchableOpacity style={styles.botao}>
          <Text style={styles.botaoTexto}>Pagar Agora</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("tela_paciente")}>
          <Ionicons name="arrow-back" size={24} color="#1A335C" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Meus Pagamentos</Text>
        <View style={{ width: 24 }} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#1A335C" />
      ) : (
        <FlatList
          data={pagamentos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.vazio}>Nenhum pagamento encontrado.</Text>}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </SafeAreaView>
  );
};

export default TelaMeusPagamentos;

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
  vazio: {
    textAlign: "center",
    fontSize: 14,
    color: "#777",
    marginTop: 10,
  },
});

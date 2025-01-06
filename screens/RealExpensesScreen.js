import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Button, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RealExpensesScreen = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const getUserId = async () => {
      const userId = await AsyncStorage.getItem("userId");
      fetchExpenses(userId);
    };

    getUserId();
  }, []);

  const fetchExpenses = (idUtilisateur) => {
    axios
      .get(`http://192.168.1.103:3000/api/expenses/${idUtilisateur}`)
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des dépenses:", error);
        Alert.alert("Erreur", "Impossible de récupérer les dépenses.");
      });
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>
        {item.description}: {item.amount} €
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dépenses Réelles</Text>
      <FlatList
        data={expenses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button
        title="Ajouter une Dépense"
        onPress={() => {
          /* Logique pour ajouter une dépense */
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default RealExpensesScreen;

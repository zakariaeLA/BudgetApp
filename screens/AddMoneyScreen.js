import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AddMoneyScreen = ({ navigation }) => {
  const [totalArgent, setTotalArgent] = useState("");
  const [salaire, setSalaire] = useState("");
  const [budget, setBudget] = useState("");
  const [epargne, setEpargne] = useState("");
  const [idUtilisateur, setIdUtilisateur] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      const userId = await AsyncStorage.getItem("userId");
      setIdUtilisateur(userId);

      // Vérifier si l'utilisateur a déjà saisi ses informations
      if (userId) {
        axios
          .get(`http://192.168.1.103:3000/api/users/argent/${userId}`)
          .then((response) => {
            // Si des données existent, rediriger vers le tableau de bord
            navigation.navigate("Dashboard");
          })
          .catch((error) => {
            // Si aucune donnée n'est trouvée, rester sur l'écran d'ajout d'argent
            console.log("Aucune donnée trouvée, afficher le formulaire.");
          });
      }
    };

    getUserId();
  }, [navigation]);

  const handleSubmit = () => {
    if (!idUtilisateur) {
      Alert.alert("Erreur", "ID utilisateur non trouvé.");
      return;
    }

    axios
      .post("http://192.168.1.103:3000/api/users/argent", {
        idutilisateur: idUtilisateur,
        totalargent: parseFloat(totalArgent) || 0,
        salaire: parseFloat(salaire) || 0,
        budget: parseFloat(budget) || 0,
        epargne: parseFloat(epargne) || 0,
      })
      .then((response) => {
        Alert.alert("Succès", "Données ajoutées avec succès !");
        navigation.navigate("Dashboard");
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          Alert.alert(
            "Erreur",
            error.response.data.message ||
              "Une erreur est survenue lors de l'ajout des données."
          );
        } else {
          Alert.alert("Erreur", "Erreur de connexion au serveur.");
        }
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Total Argent"
        value={totalArgent}
        onChangeText={setTotalArgent}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Salaire"
        value={salaire}
        onChangeText={setSalaire}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Budget"
        value={budget}
        onChangeText={setBudget}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Épargne"
        value={epargne}
        onChangeText={setEpargne}
        keyboardType="numeric"
      />
      <Button title="Soumettre" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default AddMoneyScreen;

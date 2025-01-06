import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditInfoScreen = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [ville, setVille] = useState("");
  const [idUtilisateur, setIdUtilisateur] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      const userId = await AsyncStorage.getItem("userId");
      setIdUtilisateur(userId); // Mettre à jour l'état avec l'ID de l'utilisateur
      fetchUserData(userId); // Récupérer les informations de l'utilisateur
    };

    getUserId();
  }, []);

  const fetchUserData = (idUtilisateur) => {
    axios
      .get(`http://192.168.1.103:3000/api/users/${idUtilisateur}`)
      .then((response) => {
        const userData = response.data;
        setNom(userData.nom);
        setPrenom(userData.prenom);
        setEmail(userData.email);
        setVille(userData.ville);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données de l'utilisateur:",
          error
        );
        Alert.alert(
          "Erreur",
          "Impossible de récupérer les données de l'utilisateur."
        );
      });
  };

  const handleUpdate = () => {
    if (!idUtilisateur) {
      Alert.alert("Erreur", "ID utilisateur non trouvé.");
      return;
    }

    axios
      .put(`http://192.168.1.103:3000/api/users/${idUtilisateur}`, {
        nom,
        prenom,
        email,
        ville,
      })
      .then((response) => {
        Alert.alert("Succès", "Informations mises à jour avec succès !");
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour des informations:", error);
        Alert.alert("Erreur", "Impossible de mettre à jour les informations.");
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={nom}
        onChangeText={setNom}
      />
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={prenom}
        onChangeText={setPrenom}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Ville"
        value={ville}
        onChangeText={setVille}
      />
      <Button title="Mettre à Jour" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default EditInfoScreen;

import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ProfileScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({
    nom: "",
    prenom: "",
    email: "",
    totalArgent: 0,
    salaire: 0,
    budget: 0,
    epargne: 0,
    situationFamiliale: "",
    nbrEnfants: 0,
    dateNaissance: "",
    ville: "",
    genre: "",
  });
  const [idUtilisateur, setIdUtilisateur] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      const userId = await AsyncStorage.getItem("userId");
      setIdUtilisateur(userId);
      if (userId) {
        fetchUserData(userId);
      }
    };

    getUserId();
  }, []);

  const fetchUserData = (userId) => {
    // Récupérer les données de l'utilisateur et les données financières
    axios
      .get(`http://192.168.1.103:3000/api/users/users/${userId}`)
      .then((response) => {
        console.log("Données récupérées :", response.data);
        // Assurez-vous que les valeurs sont au bon format
        setUserInfo({
          nom: response.data.nom,
          prenom: response.data.prenom,
          email: response.data.email,
          totalArgent: parseFloat(response.data.totalargent) || 0, // Convertir en décimal
          salaire: parseFloat(response.data.salaire) || 0, // Convertir en décimal
          budget: parseFloat(response.data.budget) || 0, // Convertir en décimal
          epargne: parseFloat(response.data.epargne) || 0, // Convertir en décimal
          situationFamiliale: response.data.situationFamiliale,
          nbrEnfants: parseInt(response.data.nbrEnfants, 10) || 0, // Convertir en entier
          dateNaissance: response.data.dateNaissance,
          ville: response.data.ville,
          genre: response.data.genre,
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
        Alert.alert("Erreur", "Impossible de récupérer les informations.");
      });
  };

  const handleUpdate = () => {
    axios
      .put(`http://192.168.1.103:3000/api/users/users/${idUtilisateur}`, {
        nom: userInfo.nom,
        prenom: userInfo.prenom,
        email: userInfo.email,
        totalArgent: parseFloat(userInfo.totalArgent),
        salaire: parseFloat(userInfo.salaire),
        budget: parseFloat(userInfo.budget),
        epargne: parseFloat(userInfo.epargne),
        situationFamiliale: userInfo.situationFamiliale,
        nbrEnfants: parseInt(userInfo.nbrEnfants, 10),
        ville: userInfo.ville,
        // Ne pas inclure genre et date de naissance dans la mise à jour
      })
      .then((response) => {
        Alert.alert("Succès", "Informations mises à jour avec succès !");
        navigation.navigate("Dashboard"); // Rediriger vers le tableau de bord
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour des données :", error);
        Alert.alert("Erreur", "Impossible de mettre à jour les informations.");
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={userInfo.nom}
        onChangeText={(text) => setUserInfo({ ...userInfo, nom: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={userInfo.prenom}
        onChangeText={(text) => setUserInfo({ ...userInfo, prenom: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userInfo.email}
        onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Total Argent"
        value={
          userInfo.totalArgent !== null
            ? userInfo.totalArgent.toFixed(2).toString()
            : "0.00"
        }
        onChangeText={(text) => setUserInfo({ ...userInfo, totalArgent: text })}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Salaire"
        value={
          userInfo.salaire !== undefined
            ? userInfo.salaire.toFixed(2).toString()
            : "0.00"
        }
        onChangeText={(text) => setUserInfo({ ...userInfo, salaire: text })}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Budget"
        value={
          userInfo.budget !== null
            ? userInfo.budget.toFixed(2).toString()
            : "0.00"
        }
        onChangeText={(text) => setUserInfo({ ...userInfo, budget: text })}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Épargne"
        value={
          userInfo.epargne !== null
            ? userInfo.epargne.toFixed(2).toString()
            : "0.00"
        }
        onChangeText={(text) => setUserInfo({ ...userInfo, epargne: text })}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Situation Familiale"
        value={userInfo.situationFamiliale}
        onChangeText={(text) =>
          setUserInfo({ ...userInfo, situationFamiliale: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre d'Enfants"
        value={
          userInfo.nbrEnfants !== null ? userInfo.nbrEnfants.toString() : "0"
        }
        onChangeText={(text) => setUserInfo({ ...userInfo, nbrEnfants: text })}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Ville"
        value={userInfo.ville}
        onChangeText={(text) => setUserInfo({ ...userInfo, ville: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Genre"
        value={userInfo.genre}
        editable={false} // Ne pas permettre la modification
      />
      <TextInput
        style={styles.input}
        placeholder="Date de Naissance"
        value={userInfo.dateNaissance}
        editable={false} // Ne pas permettre la modification
      />
      <Button title="Mettre à Jour" onPress={handleUpdate} />
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

export default ProfileScreen;

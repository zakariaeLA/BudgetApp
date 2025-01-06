import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";

const RegisterScreen = ({ navigation }) => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [situationFamiliale, setSituationFamiliale] = useState("");
  const [nbrEnfants, setNbrEnfants] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [genre, setGenre] = useState("");
  const [ville, setVille] = useState("");

  const handleRegister = () => {
    axios
      .post("http://192.168.1.103:3000/api/users/register", {
        nom,
        prenom,
        email,
        motdepasse,
        situationFamiliale,
        nbrEnfants,
        dateNaissance,
        genre,
        ville,
      })
      .then((response) => {
        Alert.alert("Succès", "Inscription réussie !");
        navigation.navigate("Login"); // Rediriger vers l'écran de connexion
      })
      .catch((error) => {
        console.error("Erreur lors de l'inscription:", error);
        Alert.alert("Erreur", "Impossible de s'inscrire.");
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
        placeholder="Mot de passe"
        secureTextEntry
        value={motdepasse}
        onChangeText={setMotdepasse}
      />
      <TextInput
        style={styles.input}
        placeholder="Situation familiale"
        value={situationFamiliale}
        onChangeText={setSituationFamiliale}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre d'enfants"
        value={nbrEnfants}
        onChangeText={setNbrEnfants}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Date de naissance (YYYY-MM-DD)"
        value={dateNaissance}
        onChangeText={setDateNaissance}
      />
      <TextInput
        style={styles.input}
        placeholder="Genre"
        value={genre}
        onChangeText={setGenre}
      />
      <TextInput
        style={styles.input}
        placeholder="Ville"
        value={ville}
        onChangeText={setVille}
      />
      <Button title="S'inscrire" onPress={handleRegister} />
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

export default RegisterScreen;

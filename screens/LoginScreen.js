import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    axios
      .post("http://192.168.1.103:3000/api/users/login", {
        email,
        motdepasse: password,
      })
      .then((response) => {
        const userId = response.data.userId; // Récupérer l'ID de l'utilisateur
        if (userId) {
          AsyncStorage.setItem("userId", userId.toString()); // Stocker l'ID dans AsyncStorage
          navigation.navigate("Add Money", { idUtilisateur: userId }); // Passer l'ID à l'écran suivant
        } else {
          Alert.alert("Erreur", "Identifiant non trouvé.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion:", error);
        Alert.alert("Erreur", "Identifiants incorrects.");
      });
  };

  return (
    <View style={styles.container}>
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
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Se connecter" onPress={handleLogin} />
      <Button
        title="S'inscrire"
        onPress={() => navigation.navigate("Register")}
      />
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

export default LoginScreen;

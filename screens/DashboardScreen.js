import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tableau de Bord</Text>
      <Button
        title="Voir et Modifier les Dépenses Réelles"
        onPress={() => navigation.navigate("RealExpenses")}
      />
      <Button
        title="Accéder à Mon Profil"
        onPress={() => navigation.navigate("Profile")}
      />
      <Button
        title="Modifier Mes Informations"
        onPress={() => navigation.navigate("EditInfo")}
      />
      <Button
        title="Saisir les Dépenses Prévisionnelles"
        onPress={() => navigation.navigate("ForecastExpenses")}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default DashboardScreen;

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen"; // Créez ce fichier aussi
import ExpenseTrackerScreen from "./screens/ExpenseTrackerScreen"; // Créez ce fichier aussi
import AddMoneyScreen from "./screens/AddMoneyScreen"; // Importer le nouvel écran
import DashboardScreen from "./screens/DashboardScreen"; // Importer le nouvel écran
import RealExpensesScreen from "./screens/RealExpensesScreen"; // Écran pour les dépenses réelles
import ProfileScreen from "./screens/ProfileScreen"; // Écran pour le profil
import EditInfoScreen from "./screens/EditInfoScreen"; // Écran pour modifier les informations
import ForecastExpensesScreen from "./screens/ForecastExpensesScreen"; // Écran pour les dépenses prévisionnelles

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Add Money" component={AddMoneyScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="RealExpenses" component={RealExpensesScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditInfo" component={EditInfoScreen} />
        <Stack.Screen
          name="ForecastExpenses"
          component={ForecastExpensesScreen}
        />
        <Stack.Screen name="Expense Tracker" component={ExpenseTrackerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

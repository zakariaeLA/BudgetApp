import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForecastExpensesScreen = () => {
    const [transport, setTransport] = useState('');
    const [divertissement, setDivertissement] = useState('');
    const [loyer, setLoyer] = useState('');
    const [budgetTotal, setBudgetTotal] = useState('');

    const handleSubmit = () => {
        const idUtilisateur = AsyncStorage.getItem('userId'); // Récupérer l'ID de l'utilisateur

        axios.post(`http://192.168.1.103:3000/api/forecast`, {
            idutilisateur: idUtilisateur,
            transport,
            divertissement,
            loyer,
            budgetTotal,
        })
        .then(response => {
            Alert.alert("Succès", "Dépenses prévisionnelles ajoutées avec succès !");
        })
        .catch(error => {
            console.error("Erreur lors de l'ajout des dépenses prévisionnelles:", error);
            Alert.alert("Erreur", "Impossible d'ajouter les dépenses prévisionnelles.");
        });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Pourcentage Transport"
                value={transport}
                onChangeText={setTransport}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Pourcentage Divertissement"
                value={divertissement}
                onChangeText={setDivertissement}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Pourcentage Loyer"
                value={loyer}
                onChangeText={setLoyer}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Budget Total"
                value={budgetTotal}
                onChangeText={setBudgetTotal}
                keyboardType="numeric"
            />
            <Button title="Soumettre" onPress={handleSubmit} />
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

export default ForecastExpensesScreen; 
import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            Alert.alert("Помилка", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
            <TextInput placeholder="Пароль" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
            <Button title="Увійти" onPress={handleLogin} />
            <Text style={styles.link} onPress={() => navigation.navigate("Register")}>Реєстрація</Text>
            <Text style={styles.link} onPress={() => navigation.navigate("ForgotPassword")}>Забули пароль?</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 },
    link: { marginTop: 10, color: "blue", textAlign: "center" },
});

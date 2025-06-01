import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export default function ForgotPasswordScreen({ navigation }) {
    const [email, setEmail] = useState("");

    const handleReset = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert("Готово", "Лист для скидання пароля надіслано.");
        } catch (error) {
            Alert.alert("Помилка", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
            <Button title="Скинути пароль" onPress={handleReset} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 },
});

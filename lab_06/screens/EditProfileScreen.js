import React, { useEffect, useState, useContext } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import { auth, db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

export default function EditProfileScreen({ navigation }) {
    const { user } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [city, setCity] = useState("");

    useEffect(() => {
        const load = async () => {
            const snap = await getDoc(doc(db, "users", user.uid));
            if (snap.exists()) {
                const data = snap.data();
                setName(data.name || "");
                setAge(data.age || "");
                setCity(data.city || "");
            }
        };
        load();
    }, []);

    const handleSave = async () => {
        try {
            await updateDoc(doc(db, "users", user.uid), { name, age, city });
            Alert.alert("Готово", "Профіль оновлено");
            navigation.goBack();
        } catch (err) {
            Alert.alert("Помилка", err.message);
        }
    };

    const handleDeleteAccount = async () => {
        Alert.prompt("Підтвердження", "Введіть пароль для видалення акаунта:", async (password) => {
            const credential = EmailAuthProvider.credential(user.email, password);
            try {
                await reauthenticateWithCredential(user, credential);
                await deleteDoc(doc(db, "users", user.uid));
                await deleteUser(user);
            } catch (err) {
                Alert.alert("Помилка", err.message);
            }
        });
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder="Імʼя" value={name} onChangeText={setName} style={styles.input} />
            <TextInput placeholder="Вік" value={age} onChangeText={setAge} keyboardType="numeric" style={styles.input} />
            <TextInput placeholder="Місто" value={city} onChangeText={setCity} style={styles.input} />
            <Button title="Зберегти" onPress={handleSave} />
            <Button title="Видалити акаунт" onPress={handleDeleteAccount} color="red" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 },
});

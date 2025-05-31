import React, { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

const DeleteAccountScreen = ({ navigation }) => {
    const [password, setPassword] = useState("");
    const { deleteAccount, logout } = useContext(AuthContext);

    const handleDelete = async () => {
        Alert.alert(
            "Підтвердження",
            "Ви впевнені, що хочете видалити акаунт? Цю дію не можна скасувати.",
            [
                { text: "Відміна", style: "cancel" },
                {
                    text: "Видалити",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteAccount(password);
                            Alert.alert("Акаунт видалено");
                            logout();
                        } catch (e) {
                            Alert.alert("Помилка", e.message);
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Введіть пароль для підтвердження"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />
            <Button title="Видалити акаунт" onPress={handleDelete} color="red" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1, justifyContent: "center" },
    input: { borderWidth: 1, marginVertical: 10, padding: 10, borderRadius: 5 }
});

export default DeleteAccountScreen;

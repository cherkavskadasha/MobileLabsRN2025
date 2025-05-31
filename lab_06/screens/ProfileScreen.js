import React, { useEffect, useState, useContext } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const ProfileScreen = ({ navigation }) => {
    const { user, logout } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setProfile(docSnap.data());
            } else {
                setProfile(null);
            }
        } catch (e) {
            Alert.alert("Помилка", "Не вдалося завантажити профіль");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    if (loading) {
        return <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} size="large" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Email: {user.email}</Text>
            <Text style={styles.text}>Ім'я: {profile?.name || "-"}</Text>
            <Text style={styles.text}>Вік: {profile?.age || "-"}</Text>
            <Text style={styles.text}>Місто: {profile?.city || "-"}</Text>

            <Button title="Редагувати профіль" onPress={() => navigation.navigate("EditProfile", { profile })} />
            <Button title="Видалити акаунт" onPress={() => navigation.navigate("DeleteAccount")} color="red" />
            <Button title="Вийти" onPress={logout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1 },
    text: { fontSize: 16, marginVertical: 5 },
});

export default ProfileScreen;

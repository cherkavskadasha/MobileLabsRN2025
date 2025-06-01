import React, { useEffect, useState, useContext } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

export default function ProfileScreen({ navigation }) {
    const { logout, user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setProfile(docSnap.data());
            }
        };
        fetchProfile();
    }, []);

    return (
        <View style={styles.container}>
            <Text>Ім'я: {profile?.name || "—"}</Text>
            <Text>Вік: {profile?.age || "—"}</Text>
            <Text>Місто: {profile?.city || "—"}</Text>

            <Button title="Редагувати профіль" onPress={() => navigation.navigate("EditProfile")} />
            <Button title="Вийти" onPress={logout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
});

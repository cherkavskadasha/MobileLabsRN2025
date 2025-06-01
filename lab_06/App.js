import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import AuthStack from "./navigation/AuthStack";
import AppStack from "./navigation/AppStack";

export default function App() {
    return (
        <AuthProvider>
            <Navigation />
        </AuthProvider>
    );
}

const Navigation = () => {
    const { user, loading } = useContext(AuthContext);
    if (loading) return null;
    return (
        <NavigationContainer>
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

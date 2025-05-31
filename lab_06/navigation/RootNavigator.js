import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import GuestStack from "./GuestStack";
import AppStack from "./AppStack";
import { AuthContext } from "../contexts/AuthContext";
import { ActivityIndicator, View } from "react-native";

const RootNavigator = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {user ? <AppStack /> : <GuestStack />}
        </NavigationContainer>
    );
};

export default RootNavigator;

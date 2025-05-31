import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import FileEditorScreen from './screens/FileEditorScreen';
import StorageStatsScreen from './screens/StorageStatsScreen';
import * as FileSystem from 'expo-file-system';

const Stack = createNativeStackNavigator();

export default function App() {
    useEffect(() => {
        const init = async () => {
            const dir = FileSystem.documentDirectory + 'AppData/';
            const info = await FileSystem.getInfoAsync(dir);
            if (!info.exists) {
                await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
            }
        };
        init();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="FileEditor" component={FileEditorScreen} />
                <Stack.Screen name="StorageStats" component={StorageStatsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


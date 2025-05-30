import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import GalleryScreen from './screens/GalleryScreen';
import ProfileScreen from './screens/ProfileScreen';

import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

function CustomHeader() {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.header, { paddingTop: insets.top + 10}]}>
            <Image source={require('./assets/news.png')} style={styles.logo} />
            <Text style={styles.title}>Черкавська Дарина Віталіївна, Вт-23-2</Text>
        </View>
    );
}

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        header: () => <CustomHeader />,
                        tabBarIcon: ({ color, size }) => {
                            let iconName;
                            if (route.name === 'Головна') iconName = 'home';
                            else if (route.name === 'Фотогалерея') iconName = 'images';
                            else if (route.name === 'Профіль') iconName = 'person';
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                    })}
                >
                    <Tab.Screen name="Головна" component={HomeScreen} />
                    <Tab.Screen name="Фотогалерея" component={GalleryScreen} />
                    <Tab.Screen name="Профіль" component={ProfileScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#2196F3',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 10,
    },
    logo: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    title: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

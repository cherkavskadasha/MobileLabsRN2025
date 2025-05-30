import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import StoreScreen from './screens/StoreScreen';
import CommunityScreen from './screens/CommunityScreen';
import ChatScreen from './screens/ChatScreen';
import SafetyScreen from './screens/SafetyScreen';
import ProfileScreen from './screens/ProfileScreen';


import { NavigationContainer } from '@react-navigation/native';
import {Image} from "react-native";
const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#111', // темний фон
                    borderTopWidth: 0,
                    height: 60,
                },
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let iconColor = focused ? '#fff' : '#555';

                    switch (route.name) {
                        case 'Store':
                            iconName = 'cart';
                            return <Ionicons name={iconName} size={24} color={iconColor} />;
                        case 'Community':
                            iconName = 'person';
                            return <Ionicons name={iconName} size={24} color={iconColor} />;
                        case 'Chat':
                            iconName = 'chatbubble-outline';
                            return <Ionicons name={iconName} size={24} color={iconColor} />;
                        case 'Safety':
                            iconName = 'shield-outline';
                            return <Ionicons name={iconName} size={24} color={iconColor} />;
                        case 'Profile':
                            return <Image
                                source={require('./assets/avatar1.png')}
                                style={{
                                    width: 24,
                                    height: 24,
                                }}
                            />
                    }
                },
            })}
        >
            <Tab.Screen name="Store" component={StoreScreen} />
            <Tab.Screen name="Community" component={CommunityScreen} />
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Safety" component={SafetyScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
        </NavigationContainer>
    );
}

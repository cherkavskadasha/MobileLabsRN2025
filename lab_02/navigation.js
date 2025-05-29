import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StoreScreen from './screens/StoreScreen';
import CommunityScreen from './screens/CommunityScreen';
import ChatScreen from './screens/ChatScreen';
import SafetyScreen from './screens/SafetyScreen';
import ProfileScreen from './screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Store" component={StoreScreen} />
                <Tab.Screen name="Community" component={CommunityScreen} />
                <Tab.Screen name="Chat" component={ChatScreen} />
                {/*<Tab.Screen name="Safety" component={SafetyScreen} />*/}
                {/*<Tab.Screen name="Profile" component={ProfileScreen} />*/}
            </Tab.Navigator>
        </NavigationContainer>
    );
}

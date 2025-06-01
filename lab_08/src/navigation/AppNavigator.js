import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductsScreen from '../screens/ProductsScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrdersScreen from '../screens/OrdersScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Products">
                <Stack.Screen name="Products" component={ProductsScreen} />
                <Stack.Screen name="Cart" component={CartScreen} />
                <Stack.Screen name="Checkout" component={CheckoutScreen} />
                <Stack.Screen name="Orders" component={OrdersScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

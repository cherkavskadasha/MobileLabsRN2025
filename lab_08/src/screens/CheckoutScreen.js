import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../features/user/userSlice';
import { addOrder } from '../features/orders/ordersSlice';
import { clearCart } from '../features/cart/cartSlice';

export default function CheckoutScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const cartItems = useSelector((state) => state.cart.items);
    const total = useSelector((state) => state.cart.total);
    const dispatch = useDispatch();

    const validateEmail = (email) => {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    };

    const handleConfirm = () => {
        if (!name.trim()) {
            Alert.alert('Помилка', 'Введіть ім’я');
            return;
        }
        if (!validateEmail(email)) {
            Alert.alert('Помилка', 'Введіть коректний email');
            return;
        }
        if (cartItems.length === 0) {
            Alert.alert('Помилка', 'Кошик порожній');
            return;
        }

        dispatch(setUserData({ name, email }));

        dispatch(addOrder({ items: cartItems, total }));

        dispatch(clearCart());

        Alert.alert('Успіх', 'Замовлення оформлено', [
            {
                text: 'OK',
                onPress: () => navigation.navigate('Products'),
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <Text>Ім’я:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Ваше ім’я"
            />
            <Text>Email:</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="email@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Button title="Підтвердити замовлення" onPress={handleConfirm} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1, justifyContent: 'center' },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 15,
        borderRadius: 4,
    },
});

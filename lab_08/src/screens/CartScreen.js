import React from 'react';
import { View, Text, FlatList, Button, TextInput, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../features/cart/cartSlice';

export default function CartScreen({ navigation }) {
    const cartItems = useSelector((state) => state.cart.items);
    const total = useSelector((state) => state.cart.total);
    const dispatch = useDispatch();

    const handleQuantityChange = (id, quantity) => {
        const q = parseInt(quantity);
        if (!isNaN(q) && q > 0) {
            dispatch(updateQuantity({ id, quantity: q }));
        }
    };

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={{ flex: 1 }}>{item.title}</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={item.quantity.toString()}
                            onChangeText={(text) => handleQuantityChange(item.id, text)}
                        />
                        <Text style={{ width: 60 }}>{item.price * item.quantity} грн</Text>
                        <Button title="Видалити" onPress={() => dispatch(removeFromCart(item.id))} />
                    </View>
                )}
            />
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>
                Всього: {total} грн
            </Text>
            <Button title="Оформити замовлення" onPress={() => navigation.navigate('Checkout')} />
        </View>
    );
}

const styles = StyleSheet.create({
    item: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        width: 40,
        height: 30,
        marginHorizontal: 10,
        textAlign: 'center',
    },
});

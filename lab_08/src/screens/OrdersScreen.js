import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function OrdersScreen() {
    const orders = useSelector((state) => state.orders.history);

    return (
        <View style={{ flex: 1, padding: 10 }}>
            {orders.length === 0 ? (
                <Text>Історія замовлень порожня</Text>
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.order}>
                            <Text>Дата: {new Date(item.date).toLocaleString()}</Text>
                            <Text>Кількість товарів: {item.items.length}</Text>
                            <Text>Загальна сума: {item.total} грн</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    order: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
    },
});

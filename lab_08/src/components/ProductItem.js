import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

export default function ProductItem({ product, onAddToCart }) {
    return (
        <View style={styles.container}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.title}>{product.title}</Text>
                <Text>{product.description}</Text>
                <Text style={styles.price}>{product.price} грн</Text>
                <Button title="Додати до кошика" onPress={() => onAddToCart(product)} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
    image: { width: 80, height: 80, marginRight: 10 },
    details: { flex: 1, justifyContent: 'center' },
    title: { fontWeight: 'bold', fontSize: 16 },
    price: { marginVertical: 5, fontWeight: 'bold' },
});

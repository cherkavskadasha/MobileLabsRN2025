import React from 'react';
import { FlatList, View, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../components/ProductItem';
import { addToCart } from '../features/cart/cartSlice';

export default function ProductsScreen({ navigation }) {
    const products = useSelector((state) => state.products.items);
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ProductItem product={item} onAddToCart={handleAddToCart} />
                )}
            />
            <Button title="Перейти в кошик" onPress={() => navigation.navigate('Cart')} />
            <Button title="Історія замовлень" onPress={() => navigation.navigate('Orders')} />
        </View>
    );
}

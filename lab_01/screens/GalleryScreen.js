import React from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';

const dummyImages = Array(52).fill().map((_, i) => ({
    id: i.toString(),
    uri: 'https://i.pinimg.com/736x/c9/9c/45/c99c4584215b87f421693f8019cfef1d.jpg',
}));

export default function GalleryScreen() {
    return (
        <FlatList
            data={dummyImages}
            keyExtractor={(item) => item.id}
            numColumns={3}
            renderItem={({ item }) => (
                <Image style={styles.img} source={{ uri: item.uri }} />
            )}
        />
    );
}

const styles = StyleSheet.create({
    img: {
        width: '30%',
        aspectRatio: 1,
        margin: '1.5%',
        borderRadius: 8,
        backgroundColor: '#eee',
    },
});

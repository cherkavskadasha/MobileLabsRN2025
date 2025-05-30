import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const newsData = [
    {
        id: 0,
        title: `Кохфее`,
        date: `05.05.2025`,
        text: `Кохфе це класно`,
        source: {uri: 'https://i.pinimg.com/736x/79/12/de/7912de4ad9c320dfb0a287ce8932f743.jpg'}
    },
    {
        id: 1,
        title: `Куріння вбиває!`,
        date: `05.05.2025`,
        text: `Не паліть пацани, ви прєподам ще нужни`,
        source: {uri: 'https://i.pinimg.com/736x/e2/0f/40/e20f409831d6eda487f4ef7e685ddc9a.jpg'}
    },

].concat(Array(10).fill().map((_, i) => ({
    id: i + 2,
    title: `Мені ліньки щось ще видумувати`,
    date: `05.05.2025`,
    text: `Спааааттииии хочуууу`,
    source: {uri: 'https://i.pinimg.com/736x/41/b4/4c/41b44c425502c7253b0fd2a9ed6fede7.jpg'}
})))

export default function HomeScreen() {
    return (
        <FlatList
            data={newsData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.newsItem}>
                    <Image style={styles.image} source={item.source || require('../assets/news.png')} />
                    <View>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.date}>{item.date}</Text>
                        <Text>{item.text}</Text>
                    </View>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    newsItem: { flexDirection: 'row', padding: 10 },
    image: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
    title: { fontWeight: 'bold' },
    date: { color: 'gray', fontSize: 12 },
});

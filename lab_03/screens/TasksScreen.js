
import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

const tasksList = [
    'Зробити 10 кліків',
    'Зробити подвійний клік 5 разів',
    "Утримувати об'єкт 3 секунди",
    "Перетягнути об'єкт",
    "Свайп вправо",
    "Свайп вліво",
    "Змінити розмір об'єкта",
    "Отримати 100 очок",
];

export default function TasksScreen({ route }) {
    const { tasks, isTaskDone } = route.params || {};

    return (
        <View style={styles.container}>
            <FlatList
                data={tasksList}
                keyExtractor={(item) => item}
                renderItem={({ item }) => {
                    const done = isTaskDone ? isTaskDone[item] : false;
                    return (
                        <View style={styles.item}>
                            <Text style={{ fontSize: 18 }}>{item}</Text>
                            <Text style={{ fontSize: 18 }}>{done ? '✅' : '⬜'}</Text>
                        </View>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
});

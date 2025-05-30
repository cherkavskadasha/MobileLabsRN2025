
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
    Directions,
} from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    runOnJS,
} from 'react-native-reanimated';

const initialTasks = {
    clicks: 0,
    doubleClicks: 0,
    longPresses: 0,
    pans: 0,
    flingRight: 0,
    flingLeft: 0,
    pinches: 0,
    totalScore: 0,
};

export default function HomeScreen({ navigation }) {
    const [score, setScore] = useState(0);
    const [tasks, setTasks] = useState(initialTasks);

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: scale.value },
        ],
    }));

    useEffect(() => {
        setTasks((prev) => ({
            ...prev,
            totalScore: score,
        }));
    }, [score]);

    const updateTask = (key) => {
        setTasks((prev) => ({
            ...prev,
            [key]: (prev[key] || 0) + 1,
        }));
    };



    const isTaskDone = {
        'Зробити 10 кліків': tasks.clicks >= 10,
        'Зробити подвійний клік 5 разів': tasks.doubleClicks >= 5,
        "Утримувати об'єкт 3 секунди": tasks.longPresses >= 1,
        'Перетягнути об\'єкт': tasks.pans >= 1,
        'Свайп вправо': tasks.flingRight >= 1,
        'Свайп вліво': tasks.flingLeft >= 1,
        'Змінити розмір об\'єкта': tasks.pinches >= 1,
        'Отримати 100 очок': tasks.totalScore >= 100,
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.score}>Очки: {score}</Text>

                <GestureDetector gesture={gesture}>
                    <Animated.View style={[styles.circle, animatedStyle]} />
                </GestureDetector>

                <Button
                    title="Завдання"
                    onPress={() => navigation.navigate('Завдання', { tasks, isTaskDone })}
                />
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    score: { fontSize: 32, marginBottom: 20 },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#4caf50',
    },
});

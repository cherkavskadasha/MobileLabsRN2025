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

    const handleSingleTap = () => {
        setScore((prev) => prev + 1);
        updateTask('clicks');
    };

    const handleDoubleTap = () => {
        setScore((prev) => prev + 2);
        updateTask('doubleClicks');
    };

    const handleLongPress = () => {
        setScore((prev) => prev + 5);
        updateTask('longPresses');
    };

    const handleFlingRight = () => {
        const points = Math.floor(Math.random() * 10) + 1;
        setScore((prev) => prev + points);
        updateTask('flingRight');
    };

    const handleFlingLeft = () => {
        const points = Math.floor(Math.random() * 5) + 1;
        setScore((prev) => prev + points);
        updateTask('flingLeft');
    };

    const increaseScoreBy3 = () => setScore(prev => prev + 3);
    const increasePinchTask = () => updateTask('pinches');

    const singleTap = Gesture.Tap()
        .numberOfTaps(1)
        .onEnd(() => runOnJS(handleSingleTap)());

    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onEnd(() => runOnJS(handleDoubleTap)());

    const longPress = Gesture.LongPress()
        .minDuration(3000)
        .onEnd(() => runOnJS(handleLongPress)());

    const pan = Gesture.Pan()
        .onUpdate((e) => {
            translateX.value = e.translationX;
            translateY.value = e.translationY;
        })
        .onEnd(() => {
            translateX.value = withSpring(0);
            translateY.value = withSpring(0);
            runOnJS(updateTask)('pans');
        });

    const pinch = Gesture.Pinch()
        .onUpdate((e) => {
            // Обмеження масштабу від 0.5 до 3
            scale.value = Math.min(Math.max(e.scale, 0.5), 3);
        })
        .onEnd(() => {
            if (scale.value > 1.2 || scale.value < 0.8) {
                runOnJS(increaseScoreBy3)();
                runOnJS(increasePinchTask)();
            }
            scale.value = withSpring(1);
        });

    const flingRight = Gesture.Fling()
        .direction(Directions.RIGHT)
        .onEnd(() => runOnJS(handleFlingRight)());

    const flingLeft = Gesture.Fling()
        .direction(Directions.LEFT)
        .onEnd(() => runOnJS(handleFlingLeft)());

    const gesture = Gesture.Simultaneous(
        Gesture.Exclusive(doubleTap, singleTap),
        longPress,
        pan,
        pinch,
        flingRight,
        flingLeft
    );

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
                <Button
                    title="Завдання"
                    onPress={() => navigation.navigate('Завдання', { tasks, isTaskDone })}
                />
                <Text style={styles.score}>Очки: {score}</Text>

                <GestureDetector gesture={gesture}>
                    <Animated.View style={[styles.circle, animatedStyle]} />
                </GestureDetector>


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

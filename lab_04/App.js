import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { OneSignal, LogLevel } from 'react-native-onesignal';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [reminders, setReminders] = useState([]);

    const oneSignalAppId = Constants.expoConfig?.extra?.oneSignalAppId;
    const oneSignalApiKey = Constants.expoConfig?.extra?.apiKey;

    useEffect(() => {
        if (!oneSignalAppId) {
            Alert.alert('Помилка', 'OneSignal App ID не знайдено!');
            return;
        }

        OneSignal.Debug.setLogLevel(LogLevel.Verbose);
        OneSignal.initialize(oneSignalAppId);

        OneSignal.Notifications.requestPermission(true);

        OneSignal.Notifications.addEventListener('foregroundWillDisplay', event => {
            event.preventDefault();
            event.notification.display();
        });
    }, []);

    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);

    const handleConfirm = (selectedDate) => {
        setDate(selectedDate);
        hideDatePicker();
    };

    const scheduleNotification = () => {
        if (!title || !desc) {
            Alert.alert('Помилка', 'Заповніть усі поля!');
            return;
        }

        const now = new Date();
        if (date < now) {
            Alert.alert('Помилка', 'Час не може бути в минулому!');
            return;
        }

        const sendAfter = date.toISOString();
        console.log('Local Time:', date.toLocaleString());
        console.log('Send After Time (ISO, UTC):', sendAfter);
        const notification = {
            app_id: oneSignalAppId,
            headings: { en: title },
            contents: { en: desc },
            included_segments: ["All"],
            send_after: sendAfter,
        };

        console.log('Sending notification:', notification);
        console.log("OneSignal API Key:", oneSignalApiKey);

        fetch('https://api.onesignal.com/notifications', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${oneSignalApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(notification),
        })
            .then(res => res.json())
            .then(data => {
                console.log("OneSignal API Response:", data);

                if (data.id) {
                    const newReminder = {
                        id: data.id,
                        title,
                        desc,
                        date,
                        completed: false,
                    };
                    setReminders(prev => [newReminder, ...prev]);
                    setTitle('');
                    setDesc('');
                    Alert.alert('Успіх', 'Нагадування створено!');
                } else {
                    Alert.alert('Помилка', 'Не вдалося створити нагадування.');
                }
            })
            .catch(err => {
                console.error("OneSignal API Error:", err);
                Alert.alert('Помилка', 'Не вдалося створити нагадування.');
            });
    };

    const cancelNotification = (id) => {
        const notificationBody = { app_id: oneSignalAppId };

        fetch(`https://api.onesignal.com/notifications/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Basic ${oneSignalApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(notificationBody),
        })
            .then(res => res.json())
            .then(data => {
                console.log('Notification cancelled:', data);
                // Видаляємо нагадування з локального списку
                deleteReminder(id);
                Alert.alert('Успіх', 'Нагадування скасовано!');
            })
            .catch(err => {
                console.error('Error cancelling notification:', err);
                Alert.alert('Помилка', 'Не вдалося скасувати нагадування.');
            });
    };

    const markCompleted = (id) => {
        setReminders(prev =>
            prev.map(item => (item.id === id ? { ...item, completed: true } : item))
        );
        cancelNotification(id);
    };

    const deleteReminder = (id) => {
        setReminders(prev => prev.filter(item => item.id !== id));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>📋 To-Do Reminder</Text>

            <TextInput
                placeholder="Назва"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />
            <TextInput
                placeholder="Опис"
                value={desc}
                onChangeText={setDesc}
                style={styles.input}
            />

            <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
                <Text style={styles.dateText}>Обрати час: {date.toLocaleString('uk-UA')}</Text>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />

            <Button title="ДОДАТИ НАГАДУВАННЯ" onPress={scheduleNotification} color="#007AFF" />

            <FlatList
                data={reminders}
                keyExtractor={(item) => item.id.toString()}
                style={styles.reminderList}
                renderItem={({ item }) => (
                    <View style={styles.reminderItem}>
                        <View style={styles.reminderDetails}>
                            <Text style={styles.reminderTitle}>{item.title}</Text>
                            <Text>{item.desc}</Text>
                            <Text style={styles.reminderDate}>
                                {item.date.toLocaleString('uk-UA', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </Text>
                        </View>

                        <View style={styles.reminderActions}>
                            {!item.completed && (
                                <TouchableOpacity onPress={() => markCompleted(item.id)}>
                                    <Ionicons name="checkmark-circle" size={24} color="green" style={styles.actionIcon} />
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity onPress={() => cancelNotification(item.id)}>
                                <Ionicons name="close-circle" size={24} color="orange" style={styles.actionIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F9F9F9',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    dateButton: {
        padding: 12,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: '#c00000',
        alignItems: 'center',
    },
    dateText: {
        color: '#fff',
        fontSize: 16,
    },
    reminderList: {
        marginTop: 20,
    },
    reminderItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reminderDetails: {
        flex: 1,
    },
    reminderTitle: {
        fontWeight: 'bold',
    },
    reminderDate: {
        color: '#888',
        marginTop: 5,
    },
    reminderActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionIcon: {
        marginLeft: 10,
    },
});

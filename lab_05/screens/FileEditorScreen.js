import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function FileEditorScreen({ route, navigation }) {
    const { fileUri, fileName } = route.params;
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        readFile();
    }, []);

    const readFile = async () => {
        try {
            const text = await FileSystem.readAsStringAsync(fileUri);
            setContent(text);
        } catch {
            Alert.alert('Помилка', 'Не вдалося зчитати файл');
        } finally {
            setLoading(false);
        }
    };

    const saveFile = async () => {
        try {
            setSaving(true);
            await FileSystem.writeAsStringAsync(fileUri, content);
            Alert.alert('Збережено', 'Файл успішно оновлено');
        } catch {
            Alert.alert('Помилка', 'Не вдалося зберегти файл');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#2979FF" />
                <Text style={{ marginTop: 10 }}>Завантаження...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.title} numberOfLines={1}>{fileName}</Text>
                <Text style={styles.typeBtn} onPress={saveFile} disabled={saving}>Зберегти</Text>
            </View>
            <TextInput
                multiline
                style={styles.editor}
                value={content}
                onChangeText={setContent}
                textAlignVertical="top"
                placeholder="Введіть текст..."
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
            />


        </View>
    );
}

const styles = StyleSheet.create({
    typeBtn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#2979FF',
        borderRadius: 6,
        fontSize: 16,
    },
    container: { flex: 1, backgroundColor: '#f9f9f9'},
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 14,
        justifyContent: 'space-between',
    },
    title: {
        flex: 1,
        fontSize: 18,
        color: '#2979FF',
        fontWeight: 'bold',
        marginLeft: 12,
        marginRight: 12,
    },
    editor: {
        flex: 1,
        fontSize: 16,
        padding: 16,
        backgroundColor: '#ffffff',
        margin: 12,
        borderRadius: 8,
        borderColor: '#ddd',
        borderWidth: 1,
        color: '#333',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

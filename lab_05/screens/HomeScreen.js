import React, { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Modal, TextInput
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const ROOT_PATH = FileSystem.documentDirectory + 'AppData/';

export default function HomeScreen({ navigation }) {
    const [currentPath, setCurrentPath] = useState(ROOT_PATH);
    const [items, setItems] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newName, setNewName] = useState('');
    const [newType, setNewType] = useState('folder');

    useEffect(() => {
        ensureAppDataFolder();
        loadItems();
    }, [currentPath]);

    const ensureAppDataFolder = async () => {
        const dirInfo = await FileSystem.getInfoAsync(ROOT_PATH);
        if (!dirInfo.exists) {
            await FileSystem.makeDirectoryAsync(ROOT_PATH, { intermediates: true });
        }
    };

    const loadItems = async () => {
        const names = await FileSystem.readDirectoryAsync(currentPath);
        const full = await Promise.all(
            names.map(async (name) => {
                const path = currentPath + name;
                const info = await FileSystem.getInfoAsync(path);
                return { name, path, isDirectory: info.isDirectory };
            })
        );
        setItems(full);
    };

    const goTo = (item) => {
        if (item.isDirectory) {
            setCurrentPath(item.path + '/');
        } else {
            navigation.navigate('FileEditor', {
                fileUri: item.path,
                fileName: item.name
            });
        }
    };

    const goBack = () => {
        if (currentPath === ROOT_PATH) return;
        const parts = currentPath
            .replace(FileSystem.documentDirectory, '') // remove base
            .split('/')
            .filter(Boolean);
        parts.pop();
        const newPath = FileSystem.documentDirectory + parts.join('/') + '/';
        setCurrentPath(newPath);
    };


    const createItem = async () => {
        if (!newName.trim()) return;
        const fullPath = currentPath + newName.trim() + (newType === 'folder' ? '/' : '.txt');
        try {
            if (newType === 'folder') {
                await FileSystem.makeDirectoryAsync(fullPath, { intermediates: true });
            } else {
                await FileSystem.writeAsStringAsync(fullPath, '');
            }
            setModalVisible(false);
            setNewName('');
            loadItems();
        } catch {
            Alert.alert('Помилка', 'Не вдалося створити елемент');
        }
    };

    const deleteItem = (item) => {
        Alert.alert('Підтвердження', `Видалити "${item.name}"?`, [
            { text: 'Скасувати', style: 'cancel' },
            {
                text: 'Так', onPress: async () => {
                    try {
                        await FileSystem.deleteAsync(item.path, { idempotent: true });
                        loadItems();
                    } catch {
                        Alert.alert('Помилка', 'Не вдалося видалити');
                    }
                }
            }
        ]);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => goTo(item)}>
            <Ionicons
                name={item.isDirectory ? 'folder' : 'document-text'}
                size={24}
                color={item.isDirectory ? '#4B9EFF' : '#4CAF50'}
                style={styles.icon}
            />
            <Text style={styles.itemText}>{item.name}</Text>
            <TouchableOpacity onPress={() => deleteItem(item)}>
                <MaterialIcons name="delete-outline" size={22} color="#E53935" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    const renderBreadcrumb = () => {
        const relativePath = currentPath.replace(ROOT_PATH, '');
        return (
            <Text style={styles.breadcrumb}>
                /AppData
                {relativePath.split('/').filter(Boolean).map(p => ` › ${p}`)}
            </Text>
        );
    };

    return (
        <View style={styles.container}>
            {renderBreadcrumb()}
            {currentPath !== ROOT_PATH && (
                <TouchableOpacity onPress={goBack}>
                    <Text style={styles.back}>⬅ Назад</Text>
                </TouchableOpacity>
            )}
            <FlatList
                data={items}
                keyExtractor={(item) => item.path}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
            <TouchableOpacity onPress={() => navigation.navigate('StorageStats')}>
                <Ionicons name="stats-chart" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.fab}
                onPress={() => setModalVisible(true)}
            >
                <Ionicons name="add" size={28} color="#fff" />
            </TouchableOpacity>

            {/* Modal для створення */}
            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Створити</Text>
                        <TextInput
                            placeholder="Назва"
                            style={styles.input}
                            value={newName}
                            onChangeText={setNewName}
                        />
                        <View style={styles.typeSwitch}>
                            <TouchableOpacity onPress={() => setNewType('folder')}>
                                <Text style={[styles.typeBtn, newType === 'folder' && styles.selected]}>📁 Папка</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setNewType('file')}>
                                <Text style={[styles.typeBtn, newType === 'file' && styles.selected]}>📄 Файл</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalActions}>
                            <TouchableOpacity onPress={createItem}>
                                <Text style={styles.confirm}>Створити</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text style={styles.cancel}>Скасувати</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f7f9fc', padding: 12 },
    breadcrumb: { fontSize: 14, color: '#555', marginBottom: 8 },
    back: { fontSize: 16, color: '#2979FF', marginBottom: 10 },
    list: { paddingBottom: 80 },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        elevation: 2,
    },
    icon: { marginRight: 10 },
    itemText: { flex: 1, fontSize: 16 },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 30,
        backgroundColor: '#2979FF',
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: '#00000077',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '85%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        elevation: 5,
    },
    modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        marginBottom: 12,
    },
    typeSwitch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 14,
    },
    typeBtn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#eee',
        borderRadius: 6,
        fontSize: 16,
    },
    selected: { backgroundColor: '#2979FF', color: '#fff' },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    confirm: { fontSize: 16, color: '#2979FF' },
    cancel: { fontSize: 16, color: '#E53935' },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    backIcon: {
        marginBottom: 10,
    },

});

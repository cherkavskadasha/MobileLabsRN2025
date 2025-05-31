import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function StorageStatsScreen() {
    const [usedSpace, setUsedSpace] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchStorageInfo();
    }, []);

    const fetchStorageInfo = async () => {
        try {
            setRefreshing(true);
            const appDataPath = FileSystem.documentDirectory + 'AppData/';
            const size = await getDirectorySize(appDataPath);
            setUsedSpace(size);
        } catch (e) {
            Alert.alert('Помилка', 'Не вдалося отримати дані про памʼять');
        } finally {
            setRefreshing(false);
        }
    };

    const getDirectorySize = async (path) => {
        let total = 0;
        const items = await FileSystem.readDirectoryAsync(path);
        for (const item of items) {
            const itemPath = path + item;
            const info = await FileSystem.getInfoAsync(itemPath);
            if (info.isDirectory) {
                total += await getDirectorySize(itemPath + '/');
            } else {
                total += info.size || 0;
            }
        }
        return total;
    };

    const formatBytes = (bytes) => {
        if (bytes === null) return '...';
        const sizes = ['Б', 'КБ', 'МБ', 'ГБ'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
    };

    const renderCard = (label, value, color) => (
        <View style={[styles.card, { borderLeftColor: color }]}>
            <Text style={styles.cardLabel}>{label}</Text>
            <Text style={styles.cardValue}>{value}</Text>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>📦 Використання памʼяті</Text>

            {renderCard('Обсяг зайнятого простору (AppData)', formatBytes(usedSpace), '#4B9EFF')}

            <View style={styles.progressContainer}>
                <Text style={styles.progressLabel}>Обсяг зайнятого простору/вільного</Text>
                <View style={styles.progressBarBackground}>
                    <View
                        style={[
                            styles.progressBarFill,
                            { width: usedSpace ? Math.min(usedSpace / 54857, 1) * 100 + '%' : '0%' }, // max 10 MB для оцінки
                        ]}
                    />
                </View>
                <Text style={styles.progressHint}>* базується на оцінці 0.05 МБ</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F4F8FB',
        flexGrow: 1,
        alignItems: 'center',
    },
    header: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 20,
        color: '#333',
    },
    card: {
        backgroundColor: '#fff',
        width: '100%',
        padding: 20,
        borderRadius: 12,
        marginVertical: 10,
        elevation: 3,
        borderLeftWidth: 6,
    },
    cardLabel: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    cardValue: {
        fontSize: 18,
        fontWeight: '600',
        color: '#222',
    },
    progressContainer: {
        marginVertical: 20,
        width: '100%',
    },
    progressLabel: {
        fontSize: 14,
        marginBottom: 8,
        color: '#444',
    },
    progressBarBackground: {
        height: 18,
        backgroundColor: '#D0D6E1',
        borderRadius: 9,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#4B9EFF',
    },
    progressHint: {
        fontSize: 12,
        color: '#999',
        marginTop: 5,
        textAlign: 'right',
    },
    refreshButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#4B9EFF',
        borderRadius: 10,
    },
    refreshText: {
        color: '#fff',
        fontWeight: '600',
    },
});

import React, { useState, useEffect, useContext } from 'react';
import { FlatList } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import ChatItem from '../components/ChatItem';
import { Header } from "../components/Header";
import avatar1 from '../assets/avatar1.png';
import avatar2 from '../assets/avatar2.png';
import avatar3 from '../assets/avatar3.png';
import avatar4 from '../assets/avatar4.png';


const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
    padding: 20px;
`;

const TabsContainer = styled.View`
        flex-direction: row;
        background-color: ${({ theme }) => theme.card};
        padding: 4px;
        border-radius: 16px;
        align-self: center;
        margin-bottom: 20px;
    `;

const TabButton = styled.TouchableOpacity`
        background-color: ${({ active, theme }) => (active ? '#3c4047' : 'transparent')};
        padding: 10px 20px;
        border-radius: 12px;
    `;

const TabText = styled.Text`
        color: ${({ active }) => (active ? 'white' : '#aaa')};
        font-weight: bold;
        font-size: 14px;
    `;

const allChats = Array(40)
    .fill(0)
    .map((_, i) => {
        const id = i + 1;
        return {
            id: id.toString(),
            username: `User${id}`,
            lastMessage: `Повідомлення від User${id}...`,
            timestamp: `${id % 24}:00`,
            avatar:
                i % 2 ? avatar1 :
                    i % 3 ? avatar2 :
                        i % 4 ? avatar3 :
                            avatar4,
        };
    });

export default function ChatScreen() {
    const theme = useContext(ThemeContext);

    const [chats, setChats] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const newChats = allChats.slice(startIndex, endIndex);

        setChats((prev) => [...prev, ...newChats]);
    }, [page]);

    const loadMore = () => {
        const nextPage = page + 1;
        const nextStartIndex = (nextPage - 1) * itemsPerPage;
        if (nextStartIndex < allChats.length) {
            setPage(nextPage);
        }
    };
    const [activeTab, setActiveTab] = useState('Open Chats');

    return (
        <Container>
            <Header title="Chat" />
            <TabsContainer>
                {['Open Chats', 'My friends'].map((tab) => (
                    <TabButton
                        key={tab}
                        active={tab === activeTab}
                        onPress={() => setActiveTab(tab)}
                    >
                        <TabText active={tab === activeTab}>{tab}</TabText>
                    </TabButton>
                ))}
            </TabsContainer>
            <FlatList
                data={chats}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ChatItem
                        avatar={item.avatar}
                        username={item.username}
                        lastMessage={item.lastMessage}
                        timestamp={item.timestamp}
                    />
                )}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
            />
        </Container>
    );
}

import React, { useState } from 'react';
import { FlatList } from 'react-native';
import styled, {useTheme} from 'styled-components/native';
import { Header } from '../components/Header';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
`;

const NewsCard = styled.View`
  background-color: ${({ theme }) => theme.card};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
`;

const NewsTitle = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 18px;
  font-weight: bold;
`;

const NewsContent = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  margin-top: 8px;
`;

const TabsContainer = styled.View`
    flex-direction: row;
    margin-bottom: 20px;
`;

const TabButton = styled.TouchableOpacity`
  background-color: ${({ active, theme }) =>
    active ? '#2e8eff' : theme.card};
  padding: 8px 14px;
  border-radius: 14px;
  margin-right: 10px;
`;

const TabText = styled.Text`
  color: ${({ active }) => (active ? 'white' : '#aaa')};
  font-weight: bold;
`;

const NewsImage = styled.Image`
  width: 285px;
  height: 200px;
`;

const mockNews = [
    {
        id: '1',
        title: 'Steam Summer Sale is coming!',
        content: 'Get ready for massive discounts across thousands of games.',
        image: require('../assets/KingomCome.png'),
    },
    {
        id: '2',
        title: 'New Update for Cyberpunk 2077',
        content: 'Patch 2.1 brings major improvements and new content.',
        image: require('../assets/KingomCome.png'),
    },
    {
        id: '3',
        title: 'Free Weekend: Rainbow Six Siege',
        content: 'Play for free this weekend and grab it at 70% off.',
        image: require('../assets/KingomCome.png'),
    },
];


export default function CommunityScreen() {
    const [news, setNews] = useState(mockNews);
    const [activeTab, setActiveTab] = useState('Search');
    const loadMoreNews = () => {
        const newItem = {
            id: Math.random().toString(),
            title: 'New Game Release',
            image: require('../assets/KingomCome.png'),
            content: 'Check out the latest indie titles added this week.',
        };
        setNews((prev) => [...prev, newItem]);
    };

    return (
        <Container>
            <Header title="Community" />
            <TabsContainer>
                {['Search', 'All', 'Screenshots', 'Artwork'].map((tab) => (
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
                data={news}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <NewsCard>
                        <NewsTitle>{item.title}</NewsTitle>
                        <NewsImage source={item.image} />
                        <NewsContent>{item.content}</NewsContent>
                    </NewsCard>
                )}
                onEndReached={loadMoreNews}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
            />
        </Container>
    );
}

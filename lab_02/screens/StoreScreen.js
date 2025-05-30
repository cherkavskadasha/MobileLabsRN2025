import React, { useState } from 'react';
import { FlatList, ImageBackground } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { GameCard } from '../components/GameCard';
import { Header } from '../components/Header';

const StoreContainer = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
    padding: 20px;
`;

const Banner = styled(ImageBackground)`
    height: 150px;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 20px;
    justify-content: center;
    padding-left: 20px;
`;

const BannerTitle = styled.Text`
    color: white;
    font-size: 24px;
    font-weight: bold;
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);
`;

const BannerSubtitle = styled.Text`
    color: white;
    font-size: 14px;
    margin-top: 4px;
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);
`;


const TabsContainer = styled.View`
    flex-direction: row;
    margin-bottom: 20px;
`;

const TabButton = styled.TouchableOpacity`
  background-color: ${({ active, theme }) =>
    active ? '#2e8eff' : theme.card};
  padding: 8px 14px;
  border-radius: 20px;
  margin-right: 10px;
`;

const TabText = styled.Text`
  color: ${({ active }) => (active ? 'white' : '#aaa')};
  font-weight: bold;
`;

const OldPrice = styled.Text`
  text-decoration: line-through;
  color: gray;
  margin-right: 6px;
`;

const Price = styled.Text`
  color: #fff;
`;

const Discount = styled.Text`
  color: #00d166;
  margin-left: 6px;
`;

const PriceRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const mockGames = [
    {
        id: '1',
        name: 'Grand Theft Auto V',
        image: require('../assets/gta.png'),
        oldPrice: '$20',
        price: '$10',
        discount: '-50%',
    },
    {
        id: '2',
        name: 'Battlefield 4™',
        image: require('../assets/bf4.png'),
        price: '$35',
    },
    {
        id: '3',
        name: 'Factorio',
        image: require('../assets/factorio.png'),
        price: '$7',
    },
    {
        id: '4',
        name: 'Horizon Zero Dawn',
        image: require('../assets/hzd.png'),
        price: '$39',
    },
];

export default function StoreScreen() {
    const [activeTab, setActiveTab] = useState('Top Sellers');
    const [games, setGames] = useState(mockGames);
    const theme = useTheme();

    const loadMoreGames = () => {
        const moreGames = [
            {
                id: Math.random().toString(),
                name: 'New Game',
                image: require('../assets/gta.png'),
                price: '$12',
            },
        ];
        setGames((prev) => [...prev, ...moreGames]);
    };

    return (
        <StoreContainer>
            <Header title="Store" />

            <Banner
                source={require('../assets/dbd.png')}
                resizeMode="cover"
            >
                <BannerTitle>Dead by Daylight</BannerTitle>
                <BannerSubtitle>Recommended by your friend, Player</BannerSubtitle>
                <PriceRow>

                    <Discount>-70%</Discount> <OldPrice>$18</OldPrice> <Price>$5</Price>
                </PriceRow>

            </Banner>

            <TabsContainer>
                {['Top Sellers', 'Free to play', 'Early Access'].map((tab) => (
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
                data={games}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <GameCard game={item} />}
                onEndReached={loadMoreGames}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
            />
        </StoreContainer>
    );
}

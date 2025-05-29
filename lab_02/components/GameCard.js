import React from 'react';
import styled from 'styled-components/native';

const CardContainer = styled.View`
  flex-direction: row;
  margin-bottom: 12px;
`;

const GameImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 10px;
`;

const Info = styled.View`
  margin-left: 10px;
  flex: 1;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  font-weight: 500;
`;

const PriceRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const OldPrice = styled.Text`
  text-decoration: line-through;
  color: gray;
  margin-right: 6px;
`;

const Price = styled.Text`
  color: ${({ theme }) => theme.text};
`;

const Discount = styled.Text`
  color: #00d166;
  margin-left: 6px;
`;

export const GameCard = ({ game }) => (
    <CardContainer>
        <GameImage source={game.image} />
        <Info>
            <Title>{game.name}</Title>
            <PriceRow>
                {game.oldPrice && <OldPrice>{game.oldPrice}</OldPrice>}
                <Price>{game.price}</Price>
                {game.discount && <Discount>{game.discount}</Discount>}
            </PriceRow>
        </Info>
    </CardContainer>
);

import React from 'react';
import styled from 'styled-components/native';
import {TextBase} from "react-native";

const Container = styled.TouchableOpacity`
  flex-direction: row;
  padding: 12px 16px;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.background};
`;

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 12px;
`;

const Content = styled.View`
  flex: 1;
`;

const UserName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const LastMessage = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  margin-top: 4px;
`;

const TimeStamp = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.text};
`;

export default function ChatItem({ avatar, username, lastMessage, timestamp, onPress }) {
    return (
        <Container onPress={onPress}>
            <Avatar source={avatar} />
            <Content>
                <UserName>{username}</UserName>
                <LastMessage numberOfLines={1}>{lastMessage}</LastMessage>
            </Content>
            <TimeStamp>{timestamp}</TimeStamp>
        </Container>
    );
}

import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { Header } from '../components/Header';
import { TouchableOpacity } from 'react-native';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
`;

const AvatarContainer = styled.View`
  align-items: center;
  margin-top: 30px;
  margin-bottom: 20px;
  position: relative;
`;

const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const OnlineIndicator = styled.View`
  position: absolute;
  bottom: 5px;
  right: 110px;
  width: 25px;
  height: 25px;
  background-color: #00ff47;
  border-radius: 50%;
  border-width: 3px;
  border-color: ${({ theme }) => theme.background};
`;

const NameText = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const GroupText = styled.Text`
  color: #9aa0aa;
  font-size: 14px;
  text-align: center;
  margin-top: 4px;
`;

const Menu = styled.View`
  background-color: ${({ theme }) => theme.card};
  border-radius: 12px;
  overflow: hidden;
  margin-top: 30px;
`;

const MenuItem = styled(TouchableOpacity)`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #3c4047;
`;

const MenuText = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 16px;
`;

export default function ProfileScreen() {
    const theme = useTheme();

    return (
        <Container>
            <Header title="Profile" />
            <AvatarContainer>
                <Avatar source={require('../assets/avatar1.png')} />
                <OnlineIndicator />
            </AvatarContainer>
            <NameText>Firstname Lastname</NameText>
            <GroupText>Group</GroupText>

            <Menu>
                <MenuItem>
                    <MenuText>Change Theme</MenuText>
                </MenuItem>
                <MenuItem>
                    <MenuText>Logout</MenuText>
                </MenuItem>
            </Menu>
        </Container>
    );
}

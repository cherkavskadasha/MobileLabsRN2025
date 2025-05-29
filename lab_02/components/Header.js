import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { ThemeContext } from '../theme/ThemeContext';
import { Switch } from 'react-native';

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 24px;
  font-weight: bold;
`;

export const Header = ({ title }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    return (
        <Container>
            <Title>{title}</Title>
            <Switch value={isDark} onValueChange={toggleTheme} />
        </Container>
    );
};

import React, {useState} from 'react';
import styled, { useTheme } from 'styled-components/native';
import {Header} from "../components/Header";

const SafetyScreen = () => {
    const theme = useTheme();
    const Container = styled.View`
    flex: 1;
    padding: 60px 20px 0 20px;
    background-color: ${({ theme }) => theme.background};
`;
    const LoggedInText = styled.Text`
    text-align: center;
    margin-top: 20px;
    color: #9aa0aa;
`;

    const Code = styled.Text`
    font-size: 36px;
    font-weight: bold;
    text-align: center;
    color: ${({ theme }) => theme.text};
    margin-vertical: 20px;
`;

    const ProgressBarContainer = styled.View`
    height: 6px;
    background-color: #3a3f47;
    border-radius: 3px;
    overflow: hidden;
    margin: 0 40px 30px 40px;
`;

    const ProgressBarFill = styled.View`
    width: 50%;
    height: 100%;
    background-color: #00bfff;
`;

    const Description = styled.Text`
    font-size: 14px;
    color: ${({ theme }) => theme.text};
    margin-bottom: 16px;
`;

    const Tip = styled.Text`
    font-size: 13px;
    color: #32baff;
    margin-bottom: 30px;
`;

    const TipHighlight = styled.Text`
    color: #32baff;
`;

    const Menu = styled.View`
    background-color: ${({ theme }) => theme.card};
    border-radius: 10px;
    overflow: hidden;
`;

    const MenuItem = styled.TouchableOpacity`
    padding: 16px;
    border-bottom-width: 1px;
    border-bottom-color: #3c4047;
`;

    const MenuText = styled.Text`
    color: ${({ theme }) => theme.text};
    font-size: 16px;
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
    const [activeTab, setActiveTab] = useState('Guard');
    return (
        <Container>
            <Header title={'Safety'} />
            <TabsContainer>
                {['Guard', 'Confirmations'].map((tab) => (
                    <TabButton
                        key={tab}
                        active={tab === activeTab}
                        onPress={() => setActiveTab(tab)}
                    >
                        <TabText active={tab === activeTab}>{tab}</TabText>
                    </TabButton>
                ))}
            </TabsContainer>

            <LoggedInText>Logged in as player</LoggedInText>
            <Code>N5KCV</Code>

            <ProgressBarContainer>
                <ProgressBarFill />
            </ProgressBarContainer>

            <Description>
                You'll enter your code each time you enter your password to sign in to your Steam account.
            </Description>

            <Tip>
                Tip: If you don’t share your PC, you can select{" "}
                <TipHighlight>"Remember my password"</TipHighlight> when you sign in to the PC client to enter
                your password and authenticator code less often.
            </Tip>

            <Menu>
                <MenuItem>
                    <MenuText>Remove Authenticator</MenuText>
                </MenuItem>
                <MenuItem>
                    <MenuText>My Recovery Code</MenuText>
                </MenuItem>
                <MenuItem>
                    <MenuText>Help</MenuText>
                </MenuItem>
            </Menu>
        </Container>
    );
};

export default SafetyScreen;

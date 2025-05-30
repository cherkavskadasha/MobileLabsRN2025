// navigation/AppNavigator.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import TasksScreen from '../screens/TasksScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Головна" component={HomeScreen} />
                <Stack.Screen name="Завдання" component={TasksScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

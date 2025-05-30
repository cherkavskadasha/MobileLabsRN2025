import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './theme/ThemeContext';
import AppNavigator from "./navigation";

export default function App() {
  return (
      <SafeAreaProvider>
          <ThemeProvider>
              <AppNavigator />
          </ThemeProvider>
      </SafeAreaProvider>
  );
}

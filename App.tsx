import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Routes } from './utils/Routes';
import { MainNavigation } from './screens/MainNavigation';
import { EventScreen } from './screens/common/EventScreen';
import { ArticleScreen } from './screens/common/ArticleScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureDirection: 'horizontal',
            cardStyle: {
              backgroundColor: 'white'
            }
          }}
          initialRouteName={Routes.NavigationScreen}
        >
          <Stack.Screen name={Routes.NavigationScreen} component={MainNavigation} />
          <Stack.Screen name={Routes.ShowEvent} component={EventScreen} />
          <Stack.Screen name={Routes.ShowArticle} component={ArticleScreen} />
        </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

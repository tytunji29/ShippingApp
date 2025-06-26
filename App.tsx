import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignUpScreen';
import { AppProvider } from './context/AppContext';
import { RootStackParamList } from './types/navigation';
import DashboardScreen from './screens/DashboardScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const DrawerScreens = () => (
  <Drawer.Navigator  id={undefined} screenOptions={{ headerShown: true }}>
    <Drawer.Screen name="Dashboard" component={DashboardScreen} />
    <Drawer.Screen name="Signup" component={SignupScreen} />
    {/* Add more drawer items here */}
  </Drawer.Navigator>
);
export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="MainApp" component={DrawerScreens} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

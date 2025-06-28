import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignUpScreen';
import DashboardScreen from './screens/DashboardScreen';
import CreateShipmentScreen from './screens/CreateShipmentScreen';
import { AppProvider } from './context/AppContext';
import { RootStackParamList } from './types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const DrawerScreens = () => (
  <Drawer.Navigator  id={undefined}
    screenOptions={{
      headerShown: true,
      drawerActiveTintColor: '#1f65ff',
    }}
  >
    <Drawer.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="view-dashboard-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="CreateShipment"
      component={CreateShipmentScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="select" size={size} color={color} />
        ),
      }}
    />
    {/* Add more drawer items if needed */}
  </Drawer.Navigator>
);

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        
        <Stack.Navigator  id={undefined} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="MainApp" component={DrawerScreens} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

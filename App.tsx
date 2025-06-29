import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignUpScreen";
import DashboardScreen from "./screens/DashboardScreen";
import CreateShipmentScreen from "./screens/CreateShipmentScreen";
import { AppProvider } from "./context/AppContext";
import { RootStackParamList } from "./types/navigation";
import ShipmentsTabs from "./screens/ShipmentsTabs";
import CustomDrawerContent from "./screens/CustomDrawerContent";
import ProfileAvatar from "./screens/ProfileAvatar";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();
const DrawerScreens = () => (
  <Drawer.Navigator
    id={undefined}
    screenOptions={{
      headerShown: true,
      drawerActiveTintColor: "#1f65ff",
      headerRight: () => <ProfileAvatar />, // ✅ add this
    }}
    drawerContent={(props) => <CustomDrawerContent {...props} />}
  >
    <Drawer.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="view-dashboard-outline"
            size={size}
            color={color}
          />
        ),
      }}
    />
    <Drawer.Screen
      name="Shipments"
      component={ShipmentsTabs}
      options={{
        drawerIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="package-variant-closed"
            size={size}
            color={color}
          />
        ),
      }}
    />
  </Drawer.Navigator>
);

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator
          id={undefined}
          initialRouteName="Login"
          screenOptions={{
            headerShown: true,
            headerRight: () => <ProfileAvatar />,
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }} // hide header for login
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: false }} // hide header for signup
          />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen
            name="MainApp"
            component={DrawerScreens}
            options={{ headerShown: false }} // Drawer handles its own header
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

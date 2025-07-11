import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import CreateShipmentScreen from "./screens/CreateShipmentScreen";
import { AppProvider } from "./context/AppContext";
import { RootStackParamList } from "./types/navigation";
import ShipmentsTabs from "./screens/ShipmentsTabs";
import CustomDrawerContent from "./components/CustomDrawerContent";
import ProfileAvatar from "./components/ProfileAvatar";
import SelectOnMapScreen from "./screens/SelectOnMapScreen";
import SignupScreen from "./screens/SignUpScreen";
import DriverRatingScreen from "./screens/DriverRatingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();
const DrawerScreens = () => {
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const uT = await AsyncStorage.getItem("user_Type");
        setUserType(uT);
      } catch (error) {
        console.error("Error fetching user_Type:", error);
      }
    };
    fetchUserType();
  }, []);

  return (
    <Drawer.Navigator
      id={undefined}
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: "#1f65ff",
        headerRight: () => <ProfileAvatar />,
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
      {userType === "No" && (
        <Drawer.Screen
          name="Rate Last Rider"
          component={DriverRatingScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="star-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
      )}
    </Drawer.Navigator>
  );
};

  

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
            name="SelectOnMapScreen"
            component={SelectOnMapScreen}
            options={{ title: "Select Location on Map" }}
          />
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

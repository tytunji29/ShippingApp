// screens/ShipmentsTabs.tsx
import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CreateShipmentScreen from './CreateShipmentScreen';
import MyShipmentsScreen from './MyShipmentsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AvailableShipmentScreen from './AvailableShipmentScreen';

const Tab = createMaterialTopTabNavigator();

const ShipmentsTabs = () => {
      const [isCompany, setIsCompany] = useState<string | null>(null);

  useEffect(() => {
    const fetchIsCompany = async () => {
      try {
        const userType = await AsyncStorage.getItem("user_Type");
        setIsCompany(userType);
      } catch (error) {
        console.log("Error fetching user_Type:", error);
      }
    };

    fetchIsCompany();
  }, []);

  if (isCompany === null) {
    // Show loading or nothing while loading AsyncStorage
    return null;
  }
  return (
    <Tab.Navigator  id={undefined}
      screenOptions={{
        tabBarActiveTintColor: '#1f65ff',
        tabBarIndicatorStyle: { backgroundColor: '#1f65ff' },
      }}
    >
         {isCompany === "No" && (
        <Tab.Screen
          name="CreateShipment"
          component={CreateShipmentScreen}
          options={{ title: 'Create Shipment' }}
        />
      )}
         {isCompany === "Yes" && (
        <Tab.Screen
          name="AvailableShipment"
          component={AvailableShipmentScreen}
          options={{ title: 'Available Shipment' }}
        />
      )}
      <Tab.Screen name="MyShipments" component={MyShipmentsScreen} options={{ title: 'My Shipments' }} />
    </Tab.Navigator>
  );
};

export default ShipmentsTabs;

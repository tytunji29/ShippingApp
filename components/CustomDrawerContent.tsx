import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;
export default function CustomDrawerContent(props) {
  
    const navigation = useNavigation<NavigationProp>();
  

  const handleSignOut = async () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.clear();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={styles.bottomContainer}>
        {/* <Image
          source={{ uri: 'https://i.pravatar.cc/150' }} // Replace with dynamic user image if needed
          style={styles.avatar}
        /> */}
        <TouchableOpacity onPress={handleSignOut} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    alignItems: 'center',
    paddingBottom: 80,
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#1f65ff',
  },
  logoutButton: {
    backgroundColor: '#E53935',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

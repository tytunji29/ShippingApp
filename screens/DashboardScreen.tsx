import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation();
  const { state } = useAppContext();
  const fullName = state?.user?.fullName || "Guest";

  return (
    <View style={styles.container}>
      {/* ☰ Menu toggle button */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        {/* <Text style={styles.menuIcon}>☰</Text> */}
      </TouchableOpacity>

      <Text style={styles.heading}>Welcome, {fullName}</Text>
      <Text style={styles.subText}>Dashboard content goes here...</Text>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 20, backgroundColor: '#fff',
  },
  menuButton: {
    alignSelf: 'flex-start', marginBottom: 15,
  },
  menuIcon: {
    fontSize: 24,
  },
  heading: {
    fontSize: 22, fontWeight: '600', marginBottom: 10,
  },
  subText: {
    fontSize: 16, color: '#555',
  },
});

import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Alert, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function SelectOnMapScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { onLocationSelected } = route.params as any;

  const [marker, setMarker] = useState({
    latitude: 6.5244, // Lagos default
    longitude: 3.3792,
  });
  const [loadingLocation, setLoadingLocation] = useState(false);

  const getAddressFromCoords = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        {
          headers: {
            "User-Agent": "JetSend (tytunji29@gmail.com)",
            Accept: "application/json",
          },
        }
      );
      const data = await response.json(); 
      return data.display_name || '';
    } catch (error) {
      console.error(error);
      return '';
    }
  };

  const handleConfirm = async () => {
    const address = await getAddressFromCoords(marker.latitude, marker.longitude);
    onLocationSelected({
      latitude: marker.latitude,
      longitude: marker.longitude,
      address,
    });
    navigation.goBack();
  };

  const handleUseMyLocation = async () => {
    try {
      setLoadingLocation(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
        setLoadingLocation(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setMarker({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to fetch location.');
    } finally {
      setLoadingLocation(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: marker.latitude,
          longitude: marker.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={(e) => setMarker(e.nativeEvent.coordinate)}
      >
        <Marker
          coordinate={marker}
          draggable
          onDragEnd={(e) => setMarker(e.nativeEvent.coordinate)}
        />
      </MapView>
      <View style={styles.bottomContainer}>
        <View style={styles.buttonRow}>
          <Button
            title={loadingLocation ? "Locating..." : "Use My Location"}
            onPress={handleUseMyLocation}
            disabled={loadingLocation}
          />
          <Button title="Confirm Location" onPress={handleConfirm} />
        </View>
        <Text style={{ textAlign: 'center', fontSize: 12, marginTop: 4 }}>
          Tap or drag pin to select precise delivery/pickup location
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

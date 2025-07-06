import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import StarRating from "react-native-star-rating-widget";
import { APIURL } from "../context/Actions";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-toast-message";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DriverRating"
>;

export default function DriverRatingScreen() {
  const [mainUser, setMainUser] = useState<{
    name: string;
    riderId: string;
  } | null>(null);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<NavigationProp>();

  const fetchLatestRider = async () => {
    try {
      const token = await AsyncStorage.getItem("vubids_token");
      const url = `${APIURL}/Shipments/get-lastest-shipment`;
      const res = await axios.get(`${url}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data.data;
      setMainUser({
        name: data.transporter,
        riderId: data.shipmentId,
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch rider information.");
    }
  };

  useEffect(() => {
    fetchLatestRider();
  }, []);

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert("Validation", "Please select a rating before submitting.");
      return;
    }
    if (!mainUser) {
      Alert.alert("Error", "No rider information available.");
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("vubids_token");

      const response = await fetch(`${APIURL}/Shipments/rate-rider`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating: rating.toString(),
          riderId: mainUser.name,
          shipmentId: mainUser.riderId, // send riderId to backend
        }),
      });
      const responseData = await response.json();
      if (responseData.statusCode === 200) {
        Alert.alert(
          "Success",
          responseData.message || "Rating submitted successfully."
        );
        navigation.goBack();
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Failed to submit rating.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while submitting your rating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.riderName}>
        {mainUser ? mainUser.name : "Loading Rider..."}
      </Text>
      <StarRating
        rating={rating}
        onChange={setRating}
        starSize={40}
        color="#facc15"
      />
      {!mainUser && (
      <View style={styles.buttonContainer}>
        <Button
          title={loading ? "Submitting..." : "Submit"}
          onPress={handleSubmit}
          disabled={loading}
        />
      </View>
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  riderName: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  buttonContainer: { marginTop: 20, width: "60%" },
});

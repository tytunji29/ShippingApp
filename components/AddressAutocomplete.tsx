import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SelectOnMapScreen"
>;
const NominatimBaseUrl = "https://nominatim.openstreetmap.org/search";

export default function AddressAutocomplete({
  label,
  value,
  onSelect,
  iconName,
}) {
  const [query, setQuery] = useState(value || "");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<NavigationProp>();
  const handleSearch = async (text) => {
    setQuery(text);
    if (text.length < 3) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${NominatimBaseUrl}?q=${encodeURIComponent(
          text
        )}&format=json&addressdetails=1&limit=5`,
        {
          headers: {
            "User-Agent": "JetSend (tytunji29@gmail.com)",
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ fontWeight: "600", marginBottom: 6 }}>{label}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 8,
        }}
      >
        {iconName && (
          <Ionicons
            name={iconName}
            size={20}
            color="#333"
            style={{ marginRight: 8 }}
          />
        )}
        <TextInput
          placeholder={`Enter ${label.toLowerCase()}`}
          value={query}
          onChangeText={handleSearch}
          style={{ flex: 1 }}
        />
        <Pressable
          onPress={() => {
            navigation.navigate("SelectOnMapScreen", {
              onLocationSelected: (location) => {
                setQuery(location.address);
                onSelect({
                  address: location.address,
                  latitude: location.latitude,
                  longitude: location.longitude,
                });
              },
            });
          }}
          style={{
            marginLeft: 8,
            padding: 4,
            backgroundColor: "#0E1E3F",
            borderRadius: 4,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 12 }}>Map</Text>
        </Pressable>
      </View>

      {loading && (
        <ActivityIndicator size="small" color="#333" style={{ marginTop: 6 }} />
      )}

      {results.length > 0 && (
        <ScrollView
          style={{
            maxHeight: 150,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            marginTop: 4,
            backgroundColor: "#fff",
          }}
        >
          {results.map((item) => (
            <TouchableOpacity
              key={item.place_id.toString()}
              onPress={() => {
                setQuery(item.display_name);
                setResults([]);
                onSelect({
                  address: item.display_name,
                  latitude: parseFloat(item.lat),
                  longitude: parseFloat(item.lon),
                });
              }}
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#eee",
              }}
            >
              <Text>{item.display_name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Modal,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APIURL } from "../context/Actions";

const pageSize = 10; // you can adjust

const AvailableShipmentScreen = () => {
  const [shipments, setShipments] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [selectedShipment, setSelectedShipment] = useState(null);
  const [quoteAmount, setQuoteAmount] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const fetchShipments = async (reset = false) => {
    if (loading) return;
    if (!reset && !hasMore) return;

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("vubids_token");
      const currentPage = reset ? 1 : page;
      const url = `${APIURL}/Shipments/get-all-shipment-landingpaginated?page=${currentPage}&pageSize=${pageSize}&source=1`;
      const res = await axios.get(`${url}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.status) {
        const fetchedData = res.data.data;
        setShipments((prev) =>
          reset ? fetchedData : [...prev, ...fetchedData]
        );
        setPage(currentPage + 1);
        if (fetchedData.length < pageSize) {
          setHasMore(false);
        }
      }
    } catch {
      Toast.show({ type: "error", text1: "Failed to fetch shipments" });
    } finally {
      setLoading(false);
      if (reset) setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchShipments(true);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setHasMore(true);
    setPage(1);
    fetchShipments(true);
  };

  const handleBidSubmit = async () => {
    if (!quoteAmount || !selectedShipment) {
      Toast.show({ type: "error", text1: "Please enter quote amount" });
      return;
    }

    try {
      const token = await AsyncStorage.getItem("vubids_token");
      const res = await axios.post(
        `${APIURL}/Quotes/make-bid`,
        {
          shipmentId: selectedShipment.shipmentId,
          amount: quoteAmount,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.status) {
        Toast.show({ type: "success", text1: "Bid submitted successfully" });
        setModalVisible(false);
        setQuoteAmount("");
        handleRefresh(); // refresh to remove bidded shipment
      } else {
        Toast.show({ type: "error", text1: res.data.message || "Bid failed" });
      }
    } catch {
      Toast.show({ type: "error", text1: "Error submitting bid" });
    }
  };

  const renderShipment = ({ item: shipment }) => (
    <View key={shipment.shipmentId} style={styles.card}>
      <Text style={styles.title}>{shipment.item?.name}</Text>
      <Text>From: {shipment.from}</Text>
      <Text>To: {shipment.to}</Text>
      <Text>Quote: ₦{shipment.quote}</Text>
      <Text>Pickup: {new Date(shipment.pickupDate).toDateString()}</Text>
      <Text>Delivery: {new Date(shipment.deliveryDate).toDateString()}</Text>

      {shipment.status === "Accepted" && shipment.asBidded === "Yes" && (
        <Text style={{ color: "red" }}>
          This shipment has been accepted by another bidder.
        </Text>
      )}

      {shipment.status === "In-Transit" && shipment.asBidded === "Yes" && (
        <Text style={{ color: "orange" }}>
          This shipment has been bidded for.
        </Text>
      )}

      {shipment.status === "In-Transit" && shipment.asBidded === "No" && (
        <Button
          title="Bid For This Shipment"
          onPress={() => {
            setSelectedShipment(shipment);
            setModalVisible(true);
          }}
        />
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={shipments}
        renderItem={renderShipment}
        keyExtractor={(item) => item.shipmentId}
        onEndReached={() => fetchShipments()}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListFooterComponent={
          loading && <ActivityIndicator size="small" color="#1f65ff" />
        }
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Submit Your Bid</Text>
            <TextInput
              placeholder="Enter your quote amount"
              keyboardType="numeric"
              value={quoteAmount}
              onChangeText={setQuoteAmount}
              style={styles.input}
            />
            <Button title="Submit Bid" onPress={handleBidSubmit} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Toast />
    </View>
  );
};

export default AvailableShipmentScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  title: { fontSize: 16, fontWeight: "bold" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
});

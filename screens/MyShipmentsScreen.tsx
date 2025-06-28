
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APIURL } from "../context/Actions";
import { useAppContext } from "../context/AppContext";

const formatNaira = (amount) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(Number(amount));
};

const MyShipmentsScreen = () => {
  const [shipments, setShipments] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [showBiddersModal, setShowBiddersModal] = useState(false);
  const [mainUser, setMainUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
const pageSize = 10; 

  const { state } = useAppContext();
  const fullName = state?.user?.fullName || "Guest";
  const fetchShipments = async (reset = false) => {
    if (loading) return;
    if (!reset && !hasMore) return;
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("vubids_token");
      const currentPage = reset ? 1 : page;
      const url = `${APIURL}/Shipments/get-all-shipment-landingpaginated?page=${currentPage}&pageSize=${pageSize}&source=2`;
      
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
      }}catch {
      Toast.show({ type: "error", text1: "Failed to fetch shipments" });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchUserType = async () => {
    const userType = await AsyncStorage.getItem("user_Type");
    setMainUser(userType);
  };

  useEffect(() => {
    fetchUserType();
    fetchShipments();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchShipments();
  };

  const handleAcceptBid = async (quoteId) => {
    try {
      const token = await AsyncStorage.getItem("vubids_token");
      const res = await axios.post(
        `${APIURL}/Quotes/accept-bid?quouteId=${quoteId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.status) {
        Toast.show({ type: "success", text1: "Bid accepted successfully!" });
        fetchShipments();
        setShowBiddersModal(false);
      } else {
        Toast.show({
          type: "error",
          text1: res.data.message || "Failed to accept bid",
        });
      }
    } catch {
      Toast.show({ type: "error", text1: "Error accepting bid" });
    }
  };

const renderShipment = ({ item: shipment }) => {
  if (mainUser === "Yes") {
    // COMPANY: show only bidded shipments
    if (shipment.asBidded === true || shipment.asBidded === "Yes") {
      const isBidEnded =
        shipment.status !== "In-Transit" &&
        shipment.transporterId?.toLowerCase() !== fullName?.toLowerCase();

      return (
        <View style={styles.card}>
          <Text style={styles.title}>{shipment.item?.name}</Text>
          <Text>From: {shipment.from}</Text>
          <Text>To: {shipment.to}</Text>
          <Text>Quote: {formatNaira(shipment.quote)}</Text>
          <Text>Status: {shipment.status}</Text>
          <Button
            title={isBidEnded ? "Bid Ended" : "Already Bidded"}
            disabled={true}
            color={isBidEnded ? "red" : "orange"}
          />
        </View>
      );
    } else {
      return null; // skip unbidded shipments for company
    }
  } else {
    // CREATOR: show all shipments with bidders modal
    const isAccepted = shipment.status === "Accepted";
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{shipment.item?.name}</Text>
        <Text>From: {shipment.from}</Text>
        <Text>To: {shipment.to}</Text>
        <Text>Quote: {formatNaira(shipment.quote)}</Text>
        <Text>Status: {shipment.status}</Text>

        <Button
          title={isAccepted ? "Accepted" : "View Bidders"}
          color={isAccepted ? "green" : "blue"}
          disabled={isAccepted}
          onPress={() => {
            if (!isAccepted) {
              setSelectedShipment(shipment);
              setShowBiddersModal(true);
            }
          }}
        />
      </View>
    );
  }
};


  return (
    <View style={{ flex: 1, padding: 16 }}>
      {loading && shipments.length === 0 ? (
        <ActivityIndicator size="large" color="#1f65ff" />
      ) : (
        <FlatList
          data={shipments}
          keyExtractor={(item) => item.shipmentId}
          renderItem={renderShipment}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={<Text>No shipments yet.</Text>}
        />
      )}

      {/* Bidders Modal */}
      <Modal
        visible={showBiddersModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowBiddersModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Bidders</Text>
            {selectedShipment?.quotes?.length ? (
              selectedShipment.quotes.map((q) => (
                <View key={q.quoteId} style={styles.bidCard}>
                  <Text>Amount: {formatNaira(q.amount)}</Text>
                  <Text>Bidder: {q.transporterId}</Text>
                  <Button
                    title="Accept Bid"
                    onPress={() => handleAcceptBid(q.quoteId)}
                  />
                </View>
              ))
            ) : (
              <Text>No bids yet.</Text>
            )}
            <Button title="Close" onPress={() => setShowBiddersModal(false)} />
          </View>
        </View>
      </Modal>
      <Toast />
    </View>
  );
};

export default MyShipmentsScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
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
  bidCard: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
});

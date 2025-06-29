
import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { LineChart, PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const DashboardScreen = () => {
  const deliveryData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
        color: () => "#2e7d32",
        strokeWidth: 2,
      },
    ],
    legend: ["Deliveries This Week"],
  };

  const pieData = [
    { name: "Delivered", population: 124, color: "#2e7d32", legendFontColor: "#333", legendFontSize: 12 },
    { name: "Pending", population: 8, color: "#fbc02d", legendFontColor: "#333", legendFontSize: 12 },
    { name: "In Transit", population: 12, color: "#0288d1", legendFontColor: "#333", legendFontSize: 12 },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Delivery Dashboard</Text>

      {/* Stats Cards */}
      <View style={styles.cardRow}>
        <View style={styles.card}>
          <MaterialCommunityIcons name="truck-delivery" size={30} color="#2e7d32" />
          <Text style={styles.cardValue}>124</Text>
          <Text style={styles.cardLabel}>Deliveries Today</Text>
        </View>
        <View style={styles.card}>
          <FontAwesome5 name="clock" size={30} color="#2e7d32" />
          <Text style={styles.cardValue}>8</Text>
          <Text style={styles.cardLabel}>Pending Pickups</Text>
        </View>
      </View>

      {/* Line Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Weekly Delivery Performance</Text>
        <LineChart
          data={deliveryData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundGradientFrom: "#f1f8e9",
            backgroundGradientTo: "#f1f8e9",
            color: () => "#2e7d32",
            labelColor: () => "#333",
            propsForDots: { r: "4", strokeWidth: "2", stroke: "#2e7d32" },
          }}
          bezier
          style={{ borderRadius: 12 }}
        />
      </View>

      {/* Pie Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Delivery Status Breakdown</Text>
        <PieChart
          data={pieData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            color: () => "#333",
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          hasLegend={true}
        />
      </View>

      {/* Top Driver */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Performing Driver</Text>
        <View style={styles.driverCard}>
          <MaterialCommunityIcons name="account-circle" size={50} color="#2e7d32" />
          <View>
            <Text style={styles.driverName}>John Doe</Text>
            <Text style={styles.driverStats}>Deliveries: 32 | Rating: 4.9 ⭐</Text>
          </View>
        </View>
      </View>

      {/* Recent Activities */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activities</Text>
        <View style={styles.activity}><Text style={styles.activityText}>✅ Package delivered to Ikeja</Text></View>
        <View style={styles.activity}><Text style={styles.activityText}>✅ Pickup completed at Yaba</Text></View>
        <View style={styles.activity}><Text style={styles.activityText}>🚚 Package in transit to Lekki</Text></View>
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f9fafb" },
  header: { fontSize: 24, fontWeight: "700", marginBottom: 20, textAlign: "center", color: "#1b5e20" },
  cardRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  card: {
    flex: 0.48, backgroundColor: "#fff", padding: 20, borderRadius: 12,
    alignItems: "center", elevation: 3,
  },
  cardValue: { fontSize: 24, fontWeight: "700", marginTop: 10, color: "#2e7d32" },
  cardLabel: { fontSize: 14, color: "#555", marginTop: 5, textAlign: "center" },
  section: {
    marginTop: 25, backgroundColor: "#fff", padding: 15, borderRadius: 12, elevation: 3,
  },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 10, color: "#1b5e20" },
  driverCard: { flexDirection: "row", alignItems: "center", gap: 15 },
  driverName: { fontSize: 16, fontWeight: "600", color: "#2e7d32" },
  driverStats: { fontSize: 14, color: "#555" },
  activity: { backgroundColor: "#e8f5e9", padding: 10, borderRadius: 8, marginTop: 8 },
  activityText: { fontSize: 14, color: "#2e7d32" },
  chartContainer: { marginTop: 25, backgroundColor: "#fff", padding: 15, borderRadius: 12, elevation: 3 },
});

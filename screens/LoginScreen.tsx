import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { useAppContext } from "../context/AppContext";
import Toast from "react-native-toast-message";
import ShippingLottie from "../styles/SequentialLottie";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const LoginScreen = () => {
  const [selectedType, setSelectedType] = useState<"individual" | "company">(
    "individual"
  );

  const { loginUser, state } = useAppContext();
  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    const result = await loginUser({ email, password });

    // Alert the API message regardless of status
    alert(result.message);

    if (result.success) {
      Toast.show({
        type: "success",
        text1: `Welcome, ${result.data.fullName}`,
      });
      navigation.replace("MainApp");
    } else {
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: result.message,
      });
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#f9fafb" }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>
            <ShippingLottie />

            {/* Optional dark overlay for readability */}
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: "rgba(0,0,0,0.15)",
                borderRadius: 12,
              }}
            />
            <Text style={styles.title}>Log In</Text>

            {/* Toggle Buttons */}
            <View style={styles.toggleRow}>
              <TouchableOpacity
                style={[
                  styles.toggleBox,
                  selectedType === "individual" && styles.toggleBoxActive,
                ]}
                onPress={() => setSelectedType("individual")}
              >
                <MaterialCommunityIcons name="account" size={24} color="#000" />
                <Text style={styles.toggleTitle}>Individual</Text>
                <Text style={styles.toggleDesc}>
                  To sign up as an Individual
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toggleBox,
                  selectedType === "company" && styles.toggleBoxActive,
                ]}
                onPress={() => setSelectedType("company")}
              >
                <MaterialCommunityIcons
                  name="office-building"
                  size={24}
                  color="#000"
                />
                <Text style={styles.toggleTitle}>Courier Company</Text>
                <Text style={styles.toggleDesc}>
                  To sign up as a transport company
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={20}
                  color="#666"
                />
                <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                  placeholderTextColor="#888"
                />
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={20}
                  color="#666"
                />
                <TextInput
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input}
                  secureTextEntry
                  placeholderTextColor="#888"
                />
              </View>
            </View>

            {/* Google */}

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.googleButton}>
              <FontAwesome name="google" size={20} color="#000" />
              <Text style={styles.googleText}>Log in with Google</Text>
            </TouchableOpacity>

            {/* Signup Link */}
            <View style={{ marginTop: 25 }}>
              <Text style={styles.bottomText}>
                Don’t have an account?{" "}
                <Text
                  style={styles.link}
                  onPress={() => navigation.navigate("Signup")}
                >
                  Sign Up
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  bottomText: {
    textAlign: "center",
    fontSize: 13,
    color: "#333",
  },
  link: {
    color: "#0b1b36",
    textDecorationLine: "underline",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 25,
  },
  googleButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 15,
  },
  googleText: {
    fontSize: 14,
    marginLeft: 10,
    color: "#000",
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  toggleBox: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  toggleBoxActive: {
    borderColor: "#0b1b36",
    backgroundColor: "#f0f4ff",
  },
  toggleTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginTop: 10,
  },
  toggleDesc: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
  },
  inputWrapper: { marginBottom: 20 },
  label: { fontWeight: "600", marginBottom: 8, fontSize: 13 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#000",
  },
  loginButton: {
    backgroundColor: "#0b1b36",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

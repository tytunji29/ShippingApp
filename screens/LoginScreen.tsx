// File: screens/LoginScreen.tsx

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
import { Ionicons, MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../context/AppContext";
import { RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
const LoginScreen = () => {
  const { loginUser } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedType, setSelectedType] = useState<"individual" | "company">("individual");

const navigation = useNavigation<NavigationProp>();
  const handleLogin = async () => {
    if (!email || !password) return alert("Please fill all fields");
    await loginUser({ email, password });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#f9fafb" }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>Log In</Text>

            {/* Toggle Buttons */}
            <View style={styles.toggleRow}>
              <TouchableOpacity
                style={[styles.toggleBox, selectedType === "individual" && styles.toggleBoxActive]}
                onPress={() => setSelectedType("individual")}
              >
                <MaterialCommunityIcons name="account" size={24} color="#000" />
                <Text style={styles.toggleTitle}>Individual</Text>
                <Text style={styles.toggleDesc}>To sign up as an Individual</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleBox, selectedType === "company" && styles.toggleBoxActive]}
                onPress={() => setSelectedType("company")}
              >
                <MaterialCommunityIcons name="office-building" size={24} color="#000" />
                <Text style={styles.toggleTitle}>Courier Company</Text>
                <Text style={styles.toggleDesc}>To sign up as a transport company</Text>
              </TouchableOpacity>
            </View>

            {/* Email */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="email-outline" size={20} color="#666" />
                <TextInput
                  placeholder="Email Address"
                  placeholderTextColor="#888"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputWrapper}>
              <View style={styles.passwordRow}>
                <Text style={styles.label}>Password</Text>
                <TouchableOpacity>
                  <Text style={styles.forgotText}>Forgot your password?</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="lock-outline" size={20} color="#666" />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#888"
                  secureTextEntry
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
            </View>

            {/* Login */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>

            {/* Google */}
            <TouchableOpacity style={styles.googleButton}>
              <FontAwesome name="google" size={20} color="#000" />
              <Text style={styles.googleText}>Log in with Google</Text>
            </TouchableOpacity>

            {/* Signup Link */}
            <View style={{ marginTop: 25 }}>
              <Text style={styles.bottomText}>
                Don’t have an account?{' '}
                <Text style={styles.link} onPress={() => navigation.navigate("Signup")}>Sign Up</Text>
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
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 25,
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
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "600",
    marginBottom: 8,
    fontSize: 13,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#000",
  },
  passwordRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  forgotText: {
    fontSize: 12,
    color: "#0b1b36",
    textDecorationLine: "underline",
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
  bottomText: {
    textAlign: "center",
    fontSize: 13,
    color: "#333",
  },
  link: {
    color: "#0b1b36",
    textDecorationLine: "underline",
  },
});

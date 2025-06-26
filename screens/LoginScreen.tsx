import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard
} from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { useAppContext } from "../context/AppContext";
import Toast from 'react-native-toast-message';
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const LoginScreen = () => {
  const { loginUser,state } = useAppContext();
  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) return alert("Please fill all fields");

    const result = await loginUser({ email, password });
    if (result) {
    
      Toast.show({
  type: 'success',
  text1: `Welcome, ${result.fullName}`,
});
      navigation.replace("MainApp"); // Navigate to the main app screen
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
            <Text style={styles.title}>Log In</Text>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="email-outline" size={20} color="#666" />
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
                <MaterialCommunityIcons name="lock-outline" size={20} color="#666" />
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

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20,
  },
  card: {
    width: "100%", backgroundColor: "#fff", borderRadius: 12,
    padding: 20, elevation: 4,
  },
  title: {
    fontSize: 28, fontWeight: "700", textAlign: "center", marginBottom: 25,
  },
  inputWrapper: { marginBottom: 20 },
  label: { fontWeight: "600", marginBottom: 8, fontSize: 13 },
  inputContainer: {
    flexDirection: "row", alignItems: "center", backgroundColor: "#f8f8f8",
    borderRadius: 10, borderWidth: 1, borderColor: "#ccc", paddingHorizontal: 12,
  },
  input: {
    flex: 1, marginLeft: 10, fontSize: 14, color: "#000",
  },
  loginButton: {
    backgroundColor: "#0b1b36", padding: 15, borderRadius: 10,
    alignItems: "center", marginTop: 10,
  },
  loginText: {
    color: "#fff", fontSize: 16, fontWeight: "600",
  },
});

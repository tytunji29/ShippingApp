import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useAppContext } from "../context/AppContext";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import InputField from "../components/InputField";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Signup'>;
const SignupScreen = () => {
  const { signupUser, signupCompanyUser } = useAppContext();

const navigation = useNavigation<NavigationProp>();
  const [selectedType, setSelectedType] = useState<"individual" | "company">(
    "individual"
  );
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSignup = async () => {
    const { firstName, lastName, email, phone, gender, password } = form;
    if (!firstName || !lastName || !email || !phone || !gender || !password) {
      return alert("All fields are required");
    }

    const credentials = {
      firstName,
      lastName,
      email,
      phoneNumber: phone,
      gender,
      password,
    };
    // const companyCredentials = {
    //   firstName,
    //   lastName,
    //   phoneNumber: phone,
    //   email,
    //   username,
    //   password,
    //   gender,
    //   typeOfService,
    //   region,
    //   noOfVeicles,
    //   loadingNo,
    //   rate,
    //   availability,
    // };

    if (selectedType === "individual") {
      await signupUser(credentials);
    } else {
      //await signupCompanyUser(companyCredentials);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create Account</Text>

        {/* Toggle */}
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
            <Text style={styles.toggleDesc}>Signup as an individual</Text>
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
            <Text style={styles.toggleTitle}>Company</Text>
            <Text style={styles.toggleDesc}>Signup as a transport company</Text>
          </TouchableOpacity>
        </View>

        {/* First Name */}
        <InputField
          label="First Name"
          iconName="account-outline"
          value={form.firstName}
          onChangeText={(text) => handleChange("firstName", text)}
        />

        {/* Last Name */}
        <InputField
          label="Last Name"
          iconName="account-outline"
          value={form.lastName}
          onChangeText={(text) => handleChange("lastName", text)}
        />

        {/* Email */}
        <InputField
          label="Email"
          iconName="email-outline"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
        />

        {/* Phone */}
        <InputField
          label="Phone Number"
          iconName="phone"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(text) => handleChange("phone", text)}
        />

        {/* Gender */}
        <InputField
          label="Gender"
          iconName="gender-male-female"
          value={form.gender}
          onChangeText={(text) => handleChange("gender", text)}
        />

        {/* Password */}
        <InputField
          label="Password"
          iconName="lock-outline"
          secureTextEntry
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
        />

        {/* Sign Up */}
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Google Signup */}
        <TouchableOpacity style={styles.googleButton}>
          <FontAwesome name="google" size={20} color="#000" />
          <Text style={styles.googleText}>Sign up with Google</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={{ marginTop: 25 }}>
          <Text style={styles.bottomText}>
            Already have an account? <Text style={styles.link} onPress={() => navigation.navigate("Login")}>Login</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
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
  signupButton: {
    backgroundColor: "#0b1b36",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  signupText: {
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

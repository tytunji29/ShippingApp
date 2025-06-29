import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from "react-native";
import globalStyles from "../styles/global";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InputField from "../components/InputField";
import { APIURL } from "../context/Actions";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../context/AppContext";
import Loader from "../components/Loader";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Picker } from "@react-native-picker/picker";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Signup">;

const SignupScreen = () => {
  const { signupUser } = useAppContext();
  const navigation = useNavigation<NavigationProp>();
  const [selectedType, setSelectedType] = useState<"individual" | "company">(
    "individual"
  );
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [regionStates, setRegionStates] = useState<any[]>([]);
  const [regionLgas, setRegionLgas] = useState<any[]>([]);
  const [vehicleTypeId, setVehicleTypes] = useState<any[]>([]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeDateField, setActiveDateField] = useState<"individual" | "company" | null>(null);

  const [form, setForm] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    dateOfBirth: "",
    address: "",
  });

  const [formCompany, setFormCompany] = useState<any>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    gender: "",
    address: "",
    regionState: "",
    regionLgaId: "",
    dateOfBirth: "",
    vehicleTypeId: "",
    plateNumber: "",
    accountName: "",
    accountNumber: "",
    bankName: "",
    nationalIdentityNumber: "",
    driverLicenseImage: "",
    photo: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showCompanyPassword, setShowCompanyPassword] = useState(false);

  useEffect(() => {
    fetchStates();
    fetchVehicleTypes();
  }, []);

  useEffect(() => {
    if (formCompany.regionState) {
      fetchLgas(formCompany.regionState);
    }
  }, [formCompany.regionState]);

  const fetchStates = async () => {
    const res = await fetch(`${APIURL}/GeneralSetup/get-all-region-state`);
    const data = await res.json();
    setRegionStates(data.data);
  };

  const fetchLgas = async (stateId: string) => {
    const res = await fetch(`${APIURL}/GeneralSetup/get-all-region-lga/${stateId}`);
    const data = await res.json();
    setRegionLgas(data.data);
  };

  const fetchVehicleTypes = async () => {
    const res = await fetch(`${APIURL}/GeneralSetup/get-all-vehicletypes`);
    const data = await res.json();
    setVehicleTypes(data.data);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      const isoDate = selectedDate.toISOString();
      if (activeDateField === "individual") {
        setForm((prev: any) => ({ ...prev, dateOfBirth: isoDate }));
      } else if (activeDateField === "company") {
        setFormCompany((prev: any) => ({ ...prev, dateOfBirth: isoDate }));
      }
    }
    setShowDatePicker(false);
  };

  const pickImage = async (field: string) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const name = uri.split("/").pop() || "upload.jpg";
      const type = "image/jpeg";
      const file = { uri, name, type };
      setFormCompany({ ...formCompany, [field]: file });
    }
  };

  const handleIndividualSignup = async () => {
    const { firstName, lastName, email, phone, gender, password, address, dateOfBirth } = form;
    if (!firstName || !lastName || !email || !phone || !gender || !password || !address || !dateOfBirth) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    setLoading(true);
    try {
      const result = await signupUser({
        firstName,
        lastName,
        email,
        phoneNumber: phone,
        gender,
        password,
        dateOfBirth,
        address,
      });
      if (!result.success) {
        Alert.alert("Error", result.message || "Signup failed.");
      } else {
        Alert.alert("Success", "Signup successful", [
          { text: "OK", onPress: () => navigation.navigate("Login") },
        ]);
      }
    } catch {
      Alert.alert("Error", "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleCompanySignup = async () => {
    const requiredFields = ["firstName", "lastName", "email", "phoneNumber", "gender", "password"];
    for (const field of requiredFields) {
      if (!formCompany[field]) {
        Alert.alert("Missing Field", `Please fill in your ${field}.`);
        return;
      }
    }

    setLoading(true);
    const formData = new FormData();
    Object.entries(formCompany).forEach(([key, value]: [string, any]) => {
      if (value) {
        if (typeof value === "object" && "uri" in value) {
          const localUri = value.uri;
          const filename = localUri.split("/").pop() || "photo.jpg";
          const match = /\.(\w+)$/.exec(filename);
          const type = match ? `image/${match[1]}` : `image`;
          formData.append(key.charAt(0).toUpperCase() + key.slice(1), {
            uri: localUri,
            name: filename,
            type,
          } as any);
        } else {
          formData.append(key.charAt(0).toUpperCase() + key.slice(1), value);
        }
      }
    });

    try {
      const response = await fetch(`${APIURL}/Auth/agent-signUp`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (response.ok && result.status) {
        Alert.alert("Success", "Registration submitted!", [
          { text: "OK", onPress: () => navigation.navigate("Login") },
        ]);
      } else {
        Alert.alert("Error", result.message || "Registration failed.");
      }
    } catch {
      Alert.alert("Error", "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
<KeyboardAvoidingView
  style={{ flex: 1, backgroundColor: "#fff" }}
  behavior={Platform.OS === "ios" ? "padding" : undefined}
  keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // adjusted for header
>
  <KeyboardAwareScrollView
    contentContainerStyle={[globalStyles.container, { paddingBottom: 50 }]}
    extraScrollHeight={100} // increased to avoid keyboard overlap
    enableOnAndroid={true}
    keyboardShouldPersistTaps="handled"
  >

        <Text style={globalStyles.title}>Create Account</Text>

        {/* Toggle */}
        <View style={globalStyles.toggleRow}>
          <TouchableOpacity
            style={[globalStyles.toggleBox, selectedType === "individual" && globalStyles.toggleBoxActive]}
            onPress={() => setSelectedType("individual")}
          >
            <MaterialCommunityIcons name="account" size={24} color="#000" />
            <Text style={globalStyles.toggleTitle}>Individual</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[globalStyles.toggleBox, selectedType === "company" && globalStyles.toggleBoxActive]}
            onPress={() => setSelectedType("company")}
          >
            <MaterialCommunityIcons name="office-building" size={24} color="#000" />
            <Text style={globalStyles.toggleTitle}>Company</Text>
          </TouchableOpacity>
        </View>

        {/* Individual Signup */}
        {selectedType === "individual" && (
          <>
            <InputField label="First Name" value={form.firstName} onChangeText={(t) => setForm({ ...form, firstName: t })} iconName="account-outline" />
            <InputField label="Last Name" value={form.lastName} onChangeText={(t) => setForm({ ...form, lastName: t })} iconName="account-outline" />
            <InputField label="Home Address" value={form.address} onChangeText={(t) => setForm({ ...form, address: t })} iconName="map" />
            <InputField label="Email" value={form.email} keyboardType="email-address" onChangeText={(t) => setForm({ ...form, email: t })} iconName="email-outline" />
            <InputField label="Phone" value={form.phone} keyboardType="phone-pad" onChangeText={(t) => setForm({ ...form, phone: t })} iconName="phone" />

            <Text style={globalStyles.label}>Gender</Text>
            <View style={globalStyles.pickerContainer}>
              <Picker
                selectedValue={form.gender}
                onValueChange={(itemValue) => setForm({ ...form, gender: itemValue })}
              >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
              </Picker>
            </View>

            <Text style={globalStyles.label}>Date of Birth</Text>
            <TouchableOpacity
              onPress={() => { setActiveDateField("individual"); setShowDatePicker(true); }}
              style={[globalStyles.input, { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}
            >
              <Text>{form.dateOfBirth ? new Date(form.dateOfBirth).toISOString().slice(0, 10) : "Select date of birth"}</Text>
              <Ionicons name="calendar" size={20} color="#333" />
            </TouchableOpacity>

            <InputField
              label="Password"
              secureTextEntry={!showPassword}
              value={form.password}
              onChangeText={(t) => setForm({ ...form, password: t })}
              iconName="lock-outline"
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#333" />
                </TouchableOpacity>
              }
            />
            <TouchableOpacity style={globalStyles.button} onPress={handleIndividualSignup}>
              {loading ? <Loader /> : <Text style={globalStyles.buttonText}>Sign Up</Text>}
            </TouchableOpacity>
          </>
        )}

        {/* Company Signup */}
         {/* Company Signup */}
        {selectedType === "company" && (
          <>
            <Text style={globalStyles.stepTitle}>Step {step} of 4</Text>
            {step === 1 && (
              <>
                <InputField label="First Name" value={formCompany.firstName} onChangeText={text => setFormCompany({ ...formCompany, firstName: text })} iconName="account-outline" />
                <InputField label="Last Name" value={formCompany.lastName} onChangeText={text => setFormCompany({ ...formCompany, lastName: text })} iconName="account-outline" />
                <InputField label="Phone Number" value={formCompany.phoneNumber} onChangeText={text => setFormCompany({ ...formCompany, phoneNumber: text })} iconName="phone" />
                <InputField label="Email" value={formCompany.email} onChangeText={text => setFormCompany({ ...formCompany, email: text })} iconName="email-outline" />
                <InputField
              label="Password"
              secureTextEntry={!showCompanyPassword}
              value={formCompany.password}
              onChangeText={(t) => setFormCompany({ ...formCompany, password: t })}
              iconName="lock-outline"
              rightIcon={
                <TouchableOpacity onPress={() => setShowCompanyPassword(!showCompanyPassword)}>
                  <Ionicons name={showCompanyPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#333" />
                </TouchableOpacity>
              }
            />
                <TouchableOpacity style={globalStyles.button} onPress={() => setStep(2)}>
                  <Text style={globalStyles.buttonText}>Next</Text>
                </TouchableOpacity>
              </>
            )}

            {step === 2 && (
              <>
                <InputField label="Address" value={formCompany.address} onChangeText={text => setFormCompany({ ...formCompany, address: text })} iconName="home" />

                {/* Gender Picker */}
                <Text style={globalStyles.label}>Gender</Text>
                <View style={globalStyles.pickerContainer}>
                  <Picker selectedValue={formCompany.gender} onValueChange={value => setFormCompany({ ...formCompany, gender: value })}>
                    <Picker.Item label="Select Gender" value="" />
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                    <Picker.Item label="Other" value="Other" />
                  </Picker>
                </View>

                {/* State and LGA Pickers */}
                <Text style={globalStyles.label}>State</Text>
                <View style={globalStyles.pickerContainer}>
                  <Picker selectedValue={formCompany.regionState} onValueChange={value => setFormCompany({ ...formCompany, regionState: value })}>
                    <Picker.Item label="Select State" value="" />
                    {regionStates.map(state => (
                      <Picker.Item key={state.id} label={state.name} value={state.id} />
                    ))}
                  </Picker>
                </View>

                <Text style={globalStyles.label}>LGA</Text>
                <View style={globalStyles.pickerContainer}>
                  <Picker selectedValue={formCompany.regionLgaId} onValueChange={value => setFormCompany({ ...formCompany, regionLgaId: value })}>
                    <Picker.Item label="Select LGA" value="" />
                    {regionLgas.map(lga => (
                      <Picker.Item key={lga.id} label={lga.name} value={lga.id} />
                    ))}
                  </Picker>
                </View>

                {/* Date of Birth */}
                <Text style={globalStyles.label}>Date of Birth</Text>
                <TouchableOpacity
                  onPress={() => {
                    setActiveDateField("company");
                    setShowDatePicker(true);
                  }}
                  style={globalStyles.input}
                >
                  <Text>{formCompany.dateOfBirth ? new Date(formCompany.dateOfBirth).toISOString().slice(0, 10) : "Select Date of Birth"}</Text>
                  <Ionicons name="calendar" size={20} color="#333" />
                </TouchableOpacity>

                <View style={globalStyles.row}>
                  <TouchableOpacity style={globalStyles.button} onPress={() => setStep(1)}>
                    <Text style={globalStyles.buttonText}>Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={globalStyles.button} onPress={() => setStep(3)}>
                    <Text style={globalStyles.buttonText}>Next</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

  {step === 3 && (
              <>
                <Text style={globalStyles.label}>Vehicle Type</Text>
                <View style={globalStyles.pickerContainer}>
                  <Picker
                    selectedValue={formCompany.vehicleTypeId}
                    onValueChange={(itemValue) =>
                      setFormCompany({
                        ...formCompany,
                        vehicleTypeId: itemValue,
                      })
                    }
                  >
                    <Picker.Item label="Select Vehicle Type" value="" />
                    {vehicleTypeId.map((state) => (
                      <Picker.Item
                        key={state.id}
                        label={state.name}
                        value={state.id}
                      />
                    ))}
                  </Picker>
                </View>
                <InputField
                  label="Plate Number"
                  value={formCompany.plateNumber}
                  onChangeText={(text) =>
                    setFormCompany({ ...formCompany, plateNumber: text })
                  }
                  iconName={"numeric"}
                />
                <InputField
                  label="Account Name"
                  value={formCompany.accountName}
                  onChangeText={(text) =>
                    setFormCompany({ ...formCompany, accountName: text })
                  }
                  iconName={"account-outline"}
                />
                <InputField
                  label="Account Number"
                  value={formCompany.accountNumber}
                  onChangeText={(text) =>
                    setFormCompany({ ...formCompany, accountNumber: text })
                  }
                  iconName={"numeric"}
                />
                <InputField
                  label="Bank Name"
                  value={formCompany.bankName}
                  onChangeText={(text) =>
                    setFormCompany({ ...formCompany, bankName: text })
                  }
                  iconName={"account-outline"}
                />
                <InputField
                  label="National Identity Number"
                  value={formCompany.nationalIdentityNumber}
                  onChangeText={(text) =>
                    setFormCompany({
                      ...formCompany,
                      nationalIdentityNumber: text,
                    })
                  }
                  iconName={"numeric"}
                />
                <InputField
                  label="Driver License Number"
                  value={formCompany.driverLicenseImage}
                  onChangeText={(text) =>
                    setFormCompany({ ...formCompany, driverLicenseImage: text })
                  }
                  iconName={"numeric"}
                />
              
                <TouchableOpacity
                  onPress={() => pickImage("photo")}
                  style={globalStyles.uploadButton}
                >
                  <Text>Upload Photo</Text>
                </TouchableOpacity>
                {formCompany.photo && (
                  <Image
                    source={{ uri: formCompany.photo.uri }}
                    style={globalStyles.imagePreview}
                  />
                )}
                <View style={globalStyles.row}>
                  <TouchableOpacity
                    style={globalStyles.button}
                    onPress={() => setStep(2)}
                  >
                    <Text style={globalStyles.buttonText}>Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={globalStyles.button}
                    onPress={() => setStep(4)}
                  >
                    <Text style={globalStyles.buttonText}>Next</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
            {step === 4 && (
              <>
                <Text>Review your details and submit.</Text>
                <View style={globalStyles.row}>
                  <TouchableOpacity style={globalStyles.button} onPress={() => setStep(3)}>
                    <Text style={globalStyles.buttonText}>Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={globalStyles.button} onPress={handleCompanySignup}>
                    {loading ? <Loader /> : <Text style={globalStyles.buttonText}>Submit</Text>}
                  </TouchableOpacity>
                </View>
              </>
            )}
          </>
        )}

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 18))}
          />
        )}
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

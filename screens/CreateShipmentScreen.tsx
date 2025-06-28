import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { APIURL } from "../context/Actions";
import InputField from "../components/InputField";
import globalStyles from "../styles/global";
import { useAppContext } from "../context/AppContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import * as FileSystem from "expo-file-system";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CreateShipment"
>;
export default function CreateShipment() {
  const [currentStep, setCurrentStep] = useState(1);
  const { itemCategories, itemTypes } = useAppContext();
  const [iCategories, setICategories] = useState<any[]>([]);
  const [iTypes, setITypes] = useState<any[]>([]);
  const [pickupDateObj, setPickupDateObj] = useState(new Date());
  const [deliveryDateObj, setDeliveryDateObj] = useState(new Date());
  const { createShipment, state } = useAppContext();
  const navigation = useNavigation<NavigationProp>();
  const [formData, setFormData] = useState({
    itemsRequest: {
      vehicleTypeId: 0,
      itemCategoryId: 0,
      itemTypeId: 0,
      length: 0,
      weight: 0,
      height: 0,
      quantity: 0,
      imageUrl: null,
      instructions: "",
      regionState: "",
      regionLgaId: "",
    },
    deliveryPickupRequest: {
      pickUpAddress: "",
      deliveryAddress: "",
      pickupDate: "",
      deliveryDate: "",
      pickupLongitude: 0,
      pickupLatitude: 0,
      deliveryLongitude: 0,
      deliveryLatitude: 0,
    },
  });
  const handleSubmit = async () => {
    if (!formData) return;

    const result = await createShipment(formData);
    alert(result.message);

    if (result.success) {
      Toast.show({
        type: "success",
        text1: `${result.message}`,
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
  const handlePickupDateChange = (event: any, date?: Date) => {
    setShowPickupDatePicker(false);
    if (date) {
      setPickupDateObj(date);
      setFormData((prev) => ({
        ...prev,
        deliveryPickupRequest: {
          ...prev.deliveryPickupRequest,
          pickupDate: date.toISOString(),
        },
      }));

      // Reset delivery date if it's before new pickup date
      if (date > deliveryDateObj) {
        setDeliveryDateObj(date);
        setFormData((prev) => ({
          ...prev,
          deliveryPickupRequest: {
            ...prev.deliveryPickupRequest,
            deliveryDate: date.toISOString(),
          },
        }));
      }
    }
  };

  const handleDeliveryDateChange = (event: any, date?: Date) => {
    setShowDeliveryDatePicker(false);
    if (date) {
      // Prevent dates before pickup
      if (date < pickupDateObj) {
        Toast.show({
          type: "error",
          text1: "Invalid Date",
          text2: "Delivery date must be after pickup date",
        });
        return;
      }
      setDeliveryDateObj(date);
      setFormData((prev) => ({
        ...prev,
        deliveryPickupRequest: {
          ...prev.deliveryPickupRequest,
          deliveryDate: date.toISOString(),
        },
      }));
    }
  };

  const convertToBase64 = async (uri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log(base64);
      return base64;
    } catch (error) {
      console.error("Error converting to base64:", error);
      return null;
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const base64Image = await convertToBase64(uri);
      setFormData((prev) => ({
        ...prev,
        itemsRequest: {
          ...prev.itemsRequest,
          imageUrl: base64Image,
        },
      }));
    }
  };

  const [regionStates, setRegionStates] = useState([]);
  const [regionLgas, setRegionLgas] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      const res = await fetch(`${APIURL}/GeneralSetup/get-all-region-state`);
      const data = await res.json();
      setRegionStates(data.data);
    };
    fetchStates();
  }, []);

  const fetchLgas = async (stateId) => {
    const res = await fetch(
      `${APIURL}/GeneralSetup/get-all-region-lga/${stateId}`
    );
    const data = await res.json();
    setRegionLgas(data.data);
  };

  useEffect(() => {
    if (formData.itemsRequest.regionState) {
      fetchLgas(formData.itemsRequest.regionState);
    }
  }, [formData.itemsRequest.regionState]);
  useEffect(() => {
    const fetchCategories = async () => {
      const icats = await itemCategories();
      if (Array.isArray(icats)) {
        setICategories(icats);
      }
    };
    fetchCategories();
  }, [itemCategories]);
  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };
  const [showPickupDatePicker, setShowPickupDatePicker] = useState(false);
  const [showDeliveryDatePicker, setShowDeliveryDatePicker] = useState(false);

  const vehicleLabels = ["Truck", "Mini-Van", "Cars", "Motorcycles"];
  const vehicleIcons = ["bus", "car-sport", "car", "bicycle"];
  const getItemTypes = async (categoryId: any) => {
    const res = await itemTypes(categoryId);
    if (Array.isArray(res)) {
      setITypes(res);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {currentStep === 1 && (
        <View>
          <Text style={globalStyles.header}>Step 1: Pickup Details</Text>

          <Text style={globalStyles.label}>Pick Up State</Text>
          <Picker
            selectedValue={formData.itemsRequest.regionState}
            onValueChange={(itemValue) =>
              setFormData((prev) => ({
                ...prev,
                itemsRequest: {
                  ...prev.itemsRequest,
                  regionState: itemValue.toString(),
                  regionLgaId: "",
                },
              }))
            }
          >
            <Picker.Item label="Select State" value="" />
            {regionStates.map((state) => (
              <Picker.Item key={state.id} label={state.name} value={state.id} />
            ))}
          </Picker>

          <Text style={globalStyles.label}>Pick Up Local Govt</Text>
          <Picker
            selectedValue={formData.itemsRequest.regionLgaId}
            onValueChange={(itemValue) =>
              setFormData((prev) => ({
                ...prev,
                itemsRequest: {
                  ...prev.itemsRequest,
                  regionLgaId: itemValue.toString(),
                },
              }))
            }
          >
            <Picker.Item label="Select Local Govt" value="" />
            {regionLgas.map((lga) => (
              <Picker.Item key={lga.id} label={lga.name} value={lga.id} />
            ))}
          </Picker>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {vehicleLabels.map((label, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  width: "48%",
                  borderWidth: 1,
                  borderColor:
                    formData.itemsRequest.vehicleTypeId === index
                      ? "#0E1E3F"
                      : "#ccc",
                  borderRadius: 10,
                  paddingVertical: 16,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 12,
                  backgroundColor:
                    formData.itemsRequest.vehicleTypeId === index
                      ? "#e6f0ff"
                      : "#fff",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: 2,
                }}
                onPress={() =>
                  setFormData((prev) => ({
                    ...prev,
                    itemsRequest: {
                      ...prev.itemsRequest,
                      vehicleTypeId: index,
                    },
                  }))
                }
              >
                <Ionicons
                  name={vehicleIcons[index]}
                  size={30}
                  color={
                    formData.itemsRequest.vehicleTypeId === index
                      ? "#0E1E3F"
                      : "#555"
                  }
                  style={{ marginBottom: 6 }}
                />
                <Text style={{ fontSize: 13 }}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={globalStyles.label}>Item Category</Text>
          <Picker
            selectedValue={formData.itemsRequest.itemCategoryId}
            onValueChange={(value) => {
              setFormData((prev) => ({
                ...prev,
                itemsRequest: {
                  ...prev.itemsRequest,
                  itemCategoryId: value,
                  itemTypeId: value,
                },
              }));
              getItemTypes(value);
            }}
          >
            <Picker.Item label="Select a category" value="" />
            {iCategories.map((item) => (
              <Picker.Item key={item.id} label={item.name} value={item.id} />
            ))}
          </Picker>
          <Text style={globalStyles.label}>Item Type</Text>
          <Picker
            selectedValue={formData.itemsRequest.itemTypeId}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                itemsRequest: { ...prev.itemsRequest, itemTypeId: value },
              }))
            }
          >
            <Picker.Item label="Select type of item" value="" />
            {iTypes.map((item) => (
              <Picker.Item key={item.id} label={item.name} value={item.id} />
            ))}
          </Picker>

          {/* Next Button */}
          <TouchableOpacity style={globalStyles.button} onPress={handleNext}>
            <Text style={globalStyles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentStep === 2 && (
        <View>
          <Text style={globalStyles.header}>Step 2: Delivery Details</Text>

          {/* Pickup Address */}
          <Text style={globalStyles.label}>Pickup Address</Text>
          <InputField
            placeholder="Enter pickup address"
            value={formData.deliveryPickupRequest.pickUpAddress}
            onChangeText={(text) =>
              setFormData((prev) => ({
                ...prev,
                deliveryPickupRequest: {
                  ...prev.deliveryPickupRequest,
                  pickUpAddress: text,
                },
              }))
            }
            label=""
            iconName={"map"}
          />

          {/* Delivery Address */}
          <Text style={globalStyles.label}>Delivery Address</Text>
          <InputField
            placeholder="Enter delivery address"
            value={formData.deliveryPickupRequest.deliveryAddress}
            onChangeText={(text) =>
              setFormData((prev) => ({
                ...prev,
                deliveryPickupRequest: {
                  ...prev.deliveryPickupRequest,
                  deliveryAddress: text,
                },
              }))
            }
            label=""
            iconName={"map"}
          />
          {/* Delivery Address */}
          <Text style={globalStyles.label}>Note To Driver</Text>
          <InputField
            placeholder="Note To Drive"
            value={formData.itemsRequest.instructions}
            onChangeText={(text) =>
              setFormData((prev) => ({
                ...prev,
                itemsRequest: {
                  ...prev.itemsRequest,
                  instructions: text,
                },
              }))
            }
            label=""
            iconName={"note"}
          />

          {/* Pickup Date */}
          <Text style={globalStyles.label}>Pickup Date</Text>
          <TouchableOpacity
            onPress={() => setShowPickupDatePicker(true)}
            style={[
              globalStyles.input,
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              },
            ]}
          >
            <Text>
              {formData.deliveryPickupRequest.pickupDate
                ? new Date(
                    formData.deliveryPickupRequest.pickupDate
                  ).toDateString()
                : "Select pickup date"}
            </Text>
            <Ionicons name="calendar" size={20} color="#333" />
          </TouchableOpacity>

          {showPickupDatePicker && (
            <DateTimePicker
              value={pickupDateObj}
              mode="date"
              display="default"
              minimumDate={new Date()} // Prevent past dates
              onChange={handlePickupDateChange}
            />
          )}
          {/* Delivery Date */}
          <Text style={globalStyles.label}>Delivery Date</Text>
          <TouchableOpacity
            onPress={() => setShowDeliveryDatePicker(true)}
            style={[
              globalStyles.input,
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              },
            ]}
          >
            <Text>
              {formData.deliveryPickupRequest.deliveryDate
                ? new Date(
                    formData.deliveryPickupRequest.deliveryDate
                  ).toDateString()
                : "Select delivery date"}
            </Text>
            <Ionicons name="calendar" size={20} color="#333" />
          </TouchableOpacity>

          {showDeliveryDatePicker && (
            <DateTimePicker
              value={deliveryDateObj}
              mode="date"
              display="default"
              minimumDate={pickupDateObj} // Must be after pickup
              onChange={handleDeliveryDateChange}
            />
          )}
          <TouchableOpacity
            onPress={pickImage}
            style={[
              globalStyles.button,
              { marginTop: 12, alignSelf: "center", paddingVertical: 10 },
            ]}
          >
            <Text style={globalStyles.buttonText}>Upload Item Image</Text>
          </TouchableOpacity>

          {formData.itemsRequest.imageUrl && (
            <View
              style={{
                alignSelf: "center",
                marginTop: 10,
                borderRadius: 8,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: "#ccc",
              }}
            >
              <Image
                source={{ uri: formData.itemsRequest.imageUrl.uri }}
                style={{ width: 200, height: 200, borderRadius: 8 }}
                resizeMode="cover"
              />
            </View>
          )}

          {/* Navigation Buttons */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 16,
            }}
          >
            <TouchableOpacity
              style={globalStyles.buttonOutline}
              onPress={handleBack}
            >
              <Text style={globalStyles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={globalStyles.button} onPress={handleNext}>
              <Text style={globalStyles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {currentStep === 3 && (
        <View>
          <Text style={globalStyles.header}>Step 3: Review & Confirm</Text>

          <Text>Pickup State: {formData.itemsRequest.regionState}</Text>
          <Text>Pickup LGA: {formData.itemsRequest.regionLgaId}</Text>
          <Text>
            Pickup Address: {formData.deliveryPickupRequest.pickUpAddress}
          </Text>
          <Text>
            Delivery Address: {formData.deliveryPickupRequest.deliveryAddress}
          </Text>
          <Text>
            Pickup Date:{" "}
            {formData.deliveryPickupRequest.pickupDate
              ? new Date(
                  formData.deliveryPickupRequest.pickupDate
                ).toDateString()
              : ""}
          </Text>
          <Text>
            Delivery Date:{" "}
            {formData.deliveryPickupRequest.deliveryDate
              ? new Date(
                  formData.deliveryPickupRequest.deliveryDate
                ).toDateString()
              : ""}
          </Text>

          {/* Navigation Buttons */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 16,
            }}
          >
            <TouchableOpacity
              style={globalStyles.buttonOutline}
              onPress={handleBack}
            >
              <Text style={globalStyles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={globalStyles.button}
              onPress={() => {
                console.log("Submit:", formData);
                handleSubmit();
              }}
            >
              <Text style={globalStyles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

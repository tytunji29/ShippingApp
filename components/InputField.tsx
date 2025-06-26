// components/InputField.tsx
import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TextInputProps,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface InputFieldProps extends TextInputProps {
  label: string;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  iconName,
  ...rest
}) => {
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name={iconName} size={20} color="#666" />
        <TextInput
          style={styles.input}
          placeholderTextColor="#888"
          {...rest}
        />
      </View>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
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
});

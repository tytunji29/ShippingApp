// /styles/globalStyles.ts

import { StyleSheet, Platform, Dimensions } from "react-native";

const globalStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  minHeight: Platform.OS === 'ios' ? Dimensions.get('window').height : '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 16,
    overflow: "hidden",
  },
  uploadButton: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    flex: 1,
    alignItems: "center",
  },header: {
  fontSize: 20,
  fontWeight: '600',
  marginBottom: 16,
  color: '#0E1E3F', // or your primary color
},

  buttonOutline: {
  backgroundColor: 'transparent',
  borderWidth: 1,
  borderColor: '#0E1E3F', // or your primary/navy color
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
},

  buttonText: { color: "#fff", fontWeight: "bold" },
  imagePreview: { width: 100, height: 100, borderRadius: 8, marginTop: 8 },
  stepTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 8,
  },
  row: { flexDirection: "row", gap: 8 },
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
   rightIcon: {
    marginLeft: 10,
  },
 input: {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  paddingVertical: 8, // reduced from 12
  paddingHorizontal: 12,
  fontSize: 14, // smaller text size
  marginBottom: 12,
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

export default globalStyles;

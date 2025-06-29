// /styles/globalStyles.ts

import { StyleSheet, Platform, Dimensions } from "react-native";

const colors = {
  primaryDarkGreen: "#14532D",
  primaryLightGreen: "#22C55E",
  background: "#F9FAFB",
  textPrimary: "#0F172A",
  textSecondary: "#475569",
  white: "#FFFFFF",
  border: "#D1D5DB", // neutral gray
  lightBackground: "#F0FDF4", // subtle green tint
};

const globalStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: colors.background,
    minHeight: Platform.OS === "ios" ? Dimensions.get("window").height : "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
    color: colors.textPrimary,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    marginBottom: 16,
    overflow: "hidden",
  },
  uploadButton: {
    backgroundColor: colors.lightBackground,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 8,
  },
  button: {
    backgroundColor: colors.primaryDarkGreen,
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    flex: 1,
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    color: colors.primaryDarkGreen,
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.primaryDarkGreen,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 8,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 8,
    color: colors.textPrimary,
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 25,
    color: colors.primaryDarkGreen,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  toggleBox: {
    width: "48%",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  toggleBoxActive: {
    borderColor: colors.primaryDarkGreen,
    backgroundColor: colors.lightBackground,
  },
  toggleTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginTop: 10,
    color: colors.textPrimary,
  },
  toggleDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 4,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
  },
  rightIcon: {
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    marginBottom: 12,
    color: colors.textPrimary,
    backgroundColor: colors.white,
  },
  signupButton: {
    backgroundColor: colors.primaryLightGreen,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  signupText: {
    color: colors.white,
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
    borderColor: colors.border,
    marginTop: 15,
    backgroundColor: colors.white,
  },
  googleText: {
    fontSize: 14,
    marginLeft: 10,
    color: colors.textPrimary,
  },
  bottomText: {
    textAlign: "center",
    fontSize: 13,
    color: colors.textSecondary,
  },
  link: {
    color: colors.primaryDarkGreen,
    textDecorationLine: "underline",
  },
});

export default globalStyles;

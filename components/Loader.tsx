import React from "react";
import { ActivityIndicator, View } from "react-native";

const Loader = () => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="small" color="#fff" />
    </View>
  );
};

export default Loader;

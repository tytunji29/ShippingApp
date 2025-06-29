import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { useAppContext } from "../context/AppContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Profiles">;

//const photo = await AsyncStorage.getItem("photo");
const ProfileAvatar = () => {
  const navigation = useNavigation<NavigationProp>();
  const { state } = useAppContext();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Profiles")}>
      <Image
        source={{ uri: state?.user?.photo || "https://i.pravatar.cc/100" }}
        style={styles.avatar}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
  },
});

export default ProfileAvatar;

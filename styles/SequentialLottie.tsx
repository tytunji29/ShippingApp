import React, { useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

const SequentialLottie = () => {
  const shipRef = useRef(null);
  const carRef = useRef(null);
  const truckRef = useRef(null);
  const newbikeRef = useRef(null);

  const [current, setCurrent] = useState("ship");

  const onShipFinish = () => setCurrent("car");
  const onCarFinish = () => setCurrent("truck");
  const onTruckFinish = () => setCurrent("ship");
  const onnewbikeFinish = () => setCurrent("newbike");

  return (
    <View style={styles.container}>
      {current === "ship" && (
        <LottieView
          ref={shipRef}
          source={require("../assets/animations/ship.json")}
          autoPlay
          loop={false}
          onAnimationFinish={onShipFinish}
          style={styles.lottie}
        />
      )}
      {current === "car" && (
        <LottieView
          ref={carRef}
          source={require("../assets/animations/car.json")}
          autoPlay
          loop={false}
          onAnimationFinish={onCarFinish}
          style={styles.lottie}
        />
      )}
      {current === "newbike" && (
        <LottieView
          ref={carRef}
          source={require("../assets/animations/newbike.json")}
          autoPlay
          loop={false}
          onAnimationFinish={onnewbikeFinish}
          style={styles.lottie}
        />
      )}
      {current === "truck" && (
        <LottieView
          ref={truckRef}
          source={require("../assets/animations/truck.json")}
          autoPlay
          loop={false}
          onAnimationFinish={onTruckFinish}
          style={styles.lottie}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width,
    height,
  },
});

export default SequentialLottie;

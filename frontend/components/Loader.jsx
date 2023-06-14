import { View, Text } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { Colors } from "../styles/styles";

const Loader = () => {
  return (
    <ActivityIndicator
      style={{
        top: "50%",
        position: "absolute",
        alignSelf: "center",
      }}
      size={100}
      color={Colors.gray500}
    ></ActivityIndicator>
  );
};

export default Loader;

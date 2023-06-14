import { View, Text, Pressable } from "react-native";
import React from "react";
import { Colors } from "../styles/styles";
import { Avatar } from "react-native-paper";

const ButtonBox = ({
  icon,
  text,
  handler,
  reverse = false,
  loading = false,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: reverse ? Colors.primary500 : Colors.gray500,
          height: 80,
          width: 80,
          borderRadius: 20,
          alignItems: "center",
        },
      ]}
      onPress={() => handler(text)}
      disabled={loading}
    >
      <Avatar.Icon
        size={50}
        color={Colors.white}
        style={{
          backgroundColor: reverse ? Colors.primary500 : Colors.gray500,
        }}
        icon={icon}
      ></Avatar.Icon>
      <Text style={{ color: Colors.white, textAlign: "center" }}>{text}</Text>
    </Pressable>
  );
};

export default ButtonBox;

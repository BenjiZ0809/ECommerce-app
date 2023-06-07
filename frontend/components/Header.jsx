import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { Colors } from "../styles/styles";
import { useNavigation } from "@react-navigation/native";

const Header = ({ back }) => {
  const navigation = useNavigation();

  return (
    <>
      {back && (
        <TouchableOpacity
          style={{
            position: "absolute",
          }}
          onPress={() => navigation.goBack()}
        >
          <Avatar.Icon
            icon={"arrow-left"}
            color={Colors.gray500}
            style={{ backgroundColor: Colors.transparent }}
          ></Avatar.Icon>
        </TouchableOpacity>
      )}

      <Pressable
        style={{
          position: "absolute",
          right: 20,
          top: 40,
          zIndex: 10,
        }}
        onPress={() => navigation.navigate("cart")}
      >
        <Avatar.Icon
          icon={"cart-outline"}
          color={Colors.gray500}
          style={{ backgroundColor: Colors.white }}
        ></Avatar.Icon>
      </Pressable>
    </>
  );
};

export default Header;

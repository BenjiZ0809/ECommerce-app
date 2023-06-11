import { Pressable, Platform } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { Colors } from "../styles/styles";
import { useNavigation, useRoute } from "@react-navigation/native";

const Header = ({ back, emptyCart = false }) => {
  const navigation = useNavigation();
  const route = useRoute();

  const emptyCartHandler = () => {
    console.log("empty cart");
  };

  return (
    <>
      {back && (
        <Pressable
          style={({ pressed }) => [
            {
              position: "absolute",
              left: 20,
              top: Platform.OS === "android" ? 30 : 0,
              zIndex: 10,
            },
            pressed ? { opacity: 0.7 } : null,
          ]}
          onPress={() => navigation.goBack()}
        >
          <Avatar.Icon
            icon={"arrow-left"}
            color={
              route.name === "productDetails" ? Colors.white : Colors.gray500
            }
            style={{ backgroundColor: Colors.transparent }}
          ></Avatar.Icon>
        </Pressable>
      )}

      <Pressable
        style={({ pressed }) => [
          {
            position: "absolute",
            right: 20,
            top: Platform.OS === "android" ? 30 : 0,
            zIndex: 10,
          },
          pressed ? { opacity: 0.7 } : null,
        ]}
        onPress={
          emptyCart ? emptyCartHandler : () => navigation.navigate("cart")
        }
      >
        <Avatar.Icon
          icon={emptyCart ? "delete-outline" : "cart-outline"}
          color={
            route.name === "productDetails" ? Colors.white : Colors.gray500
          }
          style={{ backgroundColor: Colors.transparent }}
        ></Avatar.Icon>
      </Pressable>
    </>
  );
};

export default Header;

import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../styles/styles";
import { Avatar } from "react-native-paper";

const Footer = ({ activeRoute = "home" }) => {
  const navigation = useNavigation();
  const isAuthenticated = true;
  const loading = false;

  const NavigationHandler = (key) => {
    switch (key) {
      case 0:
        navigation.navigate("home");
        break;
      case 1:
        navigation.navigate("cart");
        break;
      case 2:
        if (isAuthenticated) navigation.navigate("profile");
        else navigation.navigate("login");
        break;
      default:
        navigation.navigate("home");
        break;
    }
  };

  return (
    <View
      style={{
        backgroundColor: Colors.primary500,
        borderTopRightRadius: 120,
        borderTopLeftRadius: 120,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Pressable onPress={() => NavigationHandler(1)}>
          <Avatar.Icon
            icon={activeRoute === "cart" ? "shopping" : "shopping-outline"}
            {...avatarOptions}
          ></Avatar.Icon>
        </Pressable>

        <Pressable onPress={() => NavigationHandler(2)}>
          <Avatar.Icon
            icon={
              isAuthenticated === false
                ? activeRoute === "profile"
                  ? "login"
                  : "login-variant"
                : activeRoute === "profile"
                ? "account"
                : "account-outline"
            }
            {...avatarOptions}
          ></Avatar.Icon>
        </Pressable>
      </View>

      <View
        style={{
          position: "absolute",
          width: 80,
          height: 80,
          backgroundColor: Colors.white,
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
          top: -50,
          alignSelf: "center",
        }}
      >
        <View
          style={{
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable onPress={() => NavigationHandler(0)}>
            <Avatar.Icon
              icon={activeRoute === "home" ? "home" : "home-outline"}
              {...avatarOptions}
            ></Avatar.Icon>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Footer;

const avatarOptions = {
  color: Colors.white,
  size: 50,
  style: {
    backgroundColor: Colors.primary500,
  },
};

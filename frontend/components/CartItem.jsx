import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../styles/styles";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const CartItem = ({
  name,
  amount,
  qty,
  stock,
  index,
  imgSrc,
  id,
  incrementHandler,
  decrementHandler,
}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        height: 100,
        marginVertical: 20,
      }}
    >
      <View
        style={{
          width: "40%",
          backgroundColor: index % 2 === 0 ? Colors.primary500 : Colors.gray500,
          borderTopRightRadius: 100,
          borderBottomRightRadius: 100,
        }}
      >
        <Image
          source={{
            uri: imgSrc,
          }}
          style={styles.img}
        ></Image>
      </View>
      <View
        style={{
          width: "40%",
          paddingHorizontal: 25,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            fontSize: 17,
          }}
          onPress={() => navigation.navigate("productDetails", { id })}
        >
          {name}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 17,
            fontWeight: 800,
          }}
        >
          ${amount}
        </Text>
      </View>
      <View style={styles.qtyContainer}>
        <Pressable
          style={({ pressed }) => [pressed && { opacity: 0.5 }]}
          onPress={() => decrementHandler(id, name, amount, imgSrc, stock, qty)}
        >
          <Avatar.Icon icon="minus" {...iconOptions}></Avatar.Icon>
        </Pressable>
        <Text style={styles.qtyText}>{qty}</Text>
        <Pressable
          style={({ pressed }) => [pressed && { opacity: 0.5 }]}
          onPress={() => incrementHandler(id, name, amount, imgSrc, stock, qty)}
        >
          <Avatar.Icon icon="plus" {...iconOptions}></Avatar.Icon>
        </Pressable>
      </View>
    </View>
  );
};

export default CartItem;

const iconOptions = {
  size: 20,
  style: {
    borderRadius: 5,
    backgroundColor: Colors.white500,
    height: 25,
    width: 25,
  },
};

const styles = StyleSheet.create({
  qtyText: {
    backgroundColor: Colors.transparent,
    height: 25,
    width: 25,
    textAlignVertical: "center",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.white500,
  },
  qtyContainer: {
    alignItems: "center",
    width: "20%",
    height: 80,
    justifyContent: "space-between",
    alignSelf: "center",
  },
  img: {
    width: 200,
    height: "100%",
    resizeMode: "contain",
    top: "-20%",
    left: "10%",
  },
});

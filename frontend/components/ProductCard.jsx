import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { Colors } from "../styles/styles";
import { Button } from "react-native-paper";

const ProductCard = ({
  stock,
  name,
  price,
  image,
  id,
  addToCartHandler,
  i,
  navigation,
}) => {
  return (
    <Pressable onPress={() => navigation.navigate("productDetails", { id })}>
      <View
        style={{
          elevation: 5,
          shadowColor: Colors.gray500,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 2,
          shadowOpacity: 0.5,
          width: 220,
          alignItems: "center",
          justifyContent: "space-between",
          margin: 20,
          borderRadius: 20,
          height: 400,
          backgroundColor: i % 2 === 0 ? Colors.primary500 : Colors.white,
        }}
      >
        <Image
          source={{ uri: image }}
          style={{
            width: "100%",
            height: 200,
            resizeMode: "contain",
            position: "absolute",
            left: 50,
            top: 105,
          }}
        ></Image>
        <View
          style={{
            flexDirection: "row",
            padding: 20,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text
            numberOfLines={2}
            style={{
              color: i % 2 === 0 ? Colors.white : Colors.gray500,
              fontSize: 25,
              fontWeight: 300,
            }}
          >
            {name}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              color: i % 2 === 0 ? Colors.white : Colors.gray500,
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            ${price}
          </Text>
        </View>

        <Pressable
          style={{
            backgroundColor: i % 2 === 0 ? Colors.white : Colors.gray500,
            borderRadius: 0,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            width: "100%",
          }}
        >
          <Button
            textColor={i % 2 === 0 ? Colors.primary500 : Colors.white}
            onPress={() => addToCartHandler(id, stock)}
          >
            {" "}
            Add To Cart
          </Button>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default ProductCard;

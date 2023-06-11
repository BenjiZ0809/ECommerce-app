import { View, Text, ScrollView, Pressable, SafeAreaView } from "react-native";
import React from "react";
import { cartItems } from "./Cart";
import { defaultStyles } from "../styles/styles";
import Header from "../components/Header";
import Heading from "../components/Heading";
import ConfirmOrderItem from "../components/ConfirmOrderItem";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { Colors } from "../styles/styles";

const ConfirmOrder = () => {
  const navigation = useNavigation();

  const itemsPrice = 500;
  const shipping = 10;
  const tax = 0.0875 * itemsPrice;
  const total = itemsPrice + shipping + tax;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}
    >
      <View style={defaultStyles}>
        <Header back={true}></Header>
        <Heading
          text1="Confirm"
          text2="Order"
          containerStyle={{
            paddingTop: 70,
          }}
        ></Heading>
        <View
          style={{
            paddingVertical: 20,
            flex: 1,
          }}
        >
          <ScrollView>
            {cartItems.map((item) => (
              <ConfirmOrderItem
                key={item.product}
                image={item.imgSrc}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
              ></ConfirmOrderItem>
            ))}
          </ScrollView>
        </View>
        <PriceTag heading={"Subtotal"} value={itemsPrice}></PriceTag>
        <PriceTag heading={"Shipping"} value={shipping}></PriceTag>
        <PriceTag heading={"Tax"} value={tax}></PriceTag>
        <PriceTag heading={"Total"} value={total}></PriceTag>

        <Pressable
          onPress={() =>
            navigation.navigate("payment", itemsPrice, shipping, tax, total)
          }
        >
          <Button
            style={{
              backgroundColor: Colors.gray500,
              borderRadius: 100,
              padding: 5,
              margin: 10,
            }}
            textColor={Colors.white}
            icon="chevron-right"
          >
            Payment
          </Button>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const PriceTag = ({ heading, value }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5,
      }}
    >
      <Text
        style={{
          fontWeight: 800,
        }}
      >
        {heading}
      </Text>
      <Text>${value}</Text>
    </View>
  );
};

export default ConfirmOrder;

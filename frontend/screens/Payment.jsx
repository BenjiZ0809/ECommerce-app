import { View, Text, SafeAreaView, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { defaultStyles } from "../styles/styles";
import Header from "../components/Header";
import Heading from "../components/Heading";
import { Colors } from "../styles/styles";
import { RadioButton, Button } from "react-native-paper";

const Payment = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [paymentMethod, setPaymentMethod] = React.useState("COD");

  const isAuthenticated = false;

  const redirectToLogin = () => {
    navigation.navigate("login");
  };
  const codHandler = () => {};
  const onlineHandler = () => {};

  console.log(paymentMethod);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={defaultStyles}>
        <Header back={true}></Header>
        <Heading
          text1="Payment"
          text2="Method"
          containerStyle={{ paddingTop: 70 }}
        ></Heading>
        <View style={styles.container}>
          <RadioButton.Group
            value={paymentMethod}
            onValueChange={setPaymentMethod}
          >
            <View style={styles.radioStyle}>
              <Text style={styles.radioStyleText}>Cash On Delivery</Text>
              <RadioButton
                color={Colors.primary300}
                value={"COD"}
              ></RadioButton>
            </View>
            <View style={styles.radioStyle}>
              <Text style={styles.radioStyleText}>Online</Text>
              <RadioButton
                color={Colors.primary300}
                value={"ONLINE"}
              ></RadioButton>
            </View>
          </RadioButton.Group>
        </View>

        <Pressable
          style={({ pressed }) => [pressed && { opacity: 0.5 }]}
          onPress={
            !isAuthenticated
              ? redirectToLogin
              : paymentMethod === "COD"
              ? codHandler
              : onlineHandler
          }
        >
          <Button
            style={styles.btn}
            textColor={Colors.white}
            icon={
              paymentMethod === "COD"
                ? "check-circle"
                : "circle-multiple-outline"
            }
          >
            {paymentMethod === "COD" ? "Place Order" : "Pay Now"}
          </Button>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray500,
    padding: 30,
    borderRadius: 10,
    marginVertical: 20,
    flex: 1,
    justifyContent: "center",
  },
  radioStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  radioStyleText: {
    fontWeight: 600,
    fontSize: 18,
    textTransform: "uppercase",
    color: Colors.white,
  },
  btn: {
    backgroundColor: Colors.gray500,
    borderRadius: 100,
    padding: 5,
    margin: 10,
  },
});

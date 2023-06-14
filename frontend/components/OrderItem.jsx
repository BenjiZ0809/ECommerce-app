import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../styles/styles";
import { Button } from "react-native-paper";

const OrderItem = ({
  id,
  price,
  address,
  orderOn,
  status,
  paymentMethod,
  updateHandler,
  admin = false,
  loading,
  i = 0,
}) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: i % 2 === 0 ? Colors.white : Colors.gray500 },
      ]}
    >
      <Text
        style={[
          styles.text,
          { backgroundColor: i % 2 === 0 ? Colors.gray500 : Colors.primary500 },
        ]}
      >
        ID - #{id}
      </Text>
      <TextBox title="Address" value={address} i={i}></TextBox>
      <TextBox title="Ordered On" value={orderOn} i={i}></TextBox>
      <TextBox title="Price" value={price} i={i}></TextBox>
      <TextBox title="Status" value={status} i={i}></TextBox>
      <TextBox title="Payment Method" value={paymentMethod} i={i}></TextBox>

      {admin && (
        <Button
          icon="update"
          mode="contained"
          textColor={i % 2 === 0 ? Colors.white : Colors.gray500}
          style={{
            width: 120,
            alignSelf: "center",
            marginTop: 20,
            backgroundColor: i % 2 === 0 ? Colors.gray500 : Colors.white,
          }}
          onPress={() => updateHandler(id)}
          loading={loading}
          disabled={loading}
        >
          Update
        </Button>
      )}
    </View>
  );
};

const TextBox = ({ title, value, i }) => {
  return (
    <Text
      style={{
        marginVertical: 6,
        color: i % 2 === 0 ? Colors.gray500 : Colors.white,
      }}
    >
      <Text style={{ fontWeight: 900 }}>{title} - </Text>
      {title === "Price" ? "$" : ""}
      {value}
    </Text>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 5,
    shadowColor: Colors.gray500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 900,
    marginHorizontal: -20,
    marginTop: -20,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});

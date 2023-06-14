import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../styles/styles";

const ProductListHeading = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Image</Text>
      <Text style={styles.text}>Price</Text>
      <Text style={[styles.text, { width: null, maxWidth: 120 }]}>Name</Text>
      <Text style={[styles.text, { width: 60 }]}>Category</Text>
      <Text style={styles.text}>Stock</Text>
    </View>
  );
};

export default ProductListHeading;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray500,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
  },
  text: {
    width: 40,
    color: Colors.white,
    fontWeight: 900,
  },
});

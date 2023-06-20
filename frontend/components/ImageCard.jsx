import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { Colors } from "../styles/styles";
import { Avatar, Button } from "react-native-paper";

const ImageCard = ({ src, id, deleteHandler }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: src }}
        style={{
          width: "100%",
          height: "80%",
          resizeMode: "contain",
        }}
      ></Image>
      <Pressable
        style={({ pressed }) => [pressed && { opacity: 0.5 }]}
        onPress={() => deleteHandler(id)}
      >
        <Avatar.Icon
          icon="delete"
          size={30}
          style={{
            backgroundColor: Colors.primary500,
          }}
        ></Avatar.Icon>
      </Pressable>
    </View>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    elevation: 5,
    shadowColor: Colors.gray500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    margin: 10,
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
    height: 300,
  },
});

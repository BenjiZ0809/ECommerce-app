import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Colors } from "../styles/styles";
import { Avatar, Button } from "react-native-paper";

const MyModal = ({ id, deleteHandler, navigation, setOpenModal }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          {
            position: "absolute",
            top: 10,
            right: 10,
          },
          pressed && { opacity: 0.5 },
        ]}
        onPress={() => setOpenModal(false)}
      >
        <Avatar.Icon
          icon="close"
          size={25}
          style={{
            backgroundColor: Colors.primary500,
          }}
        ></Avatar.Icon>
      </Pressable>
      <Text
        style={styles.text}
        onPress={() => navigation.navigate("updateProduct", { id })}
      >
        Edit
      </Text>

      <Button textColor={Colors.gray500} onPress={() => deleteHandler(id)}>
        Delete
      </Button>
    </View>
  );
};

export default MyModal;

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 100,
    alignSelf: "center",
    justifyContent: "center",
    zIndex: 100,
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    // elevation: 5,
    // shadowColor: Colors.gray500,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
  },
  text: {
    fontWeight: 900,
    textAlign: "center",
    textTransform: "uppercase",
  },
});

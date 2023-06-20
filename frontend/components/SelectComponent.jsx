import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";
import { Avatar, Headline } from "react-native-paper";
import { Colors } from "../styles/styles";

const SelectComponent = ({
  visible,
  setVisible,
  setCategory,
  setCategoryId,
  categories = [],
}) => {
  const selectCategoryHandler = (item) => {
    setCategory(item.category);
    setCategoryId(item._id);
    setVisible(false);
  };

  return (
    visible && (
      <View style={styles.container}>
        <Pressable
          style={({ pressed }) => [pressed && { opacity: 0.5 }]}
          onPress={() => setVisible(false)}
        >
          <Avatar.Icon
            size={30}
            icon="close"
            style={{
              alignSelf: "flex-end",
              backgroundColor: Colors.primary500,
            }}
          ></Avatar.Icon>
        </Pressable>
        <Headline style={styles.heading}>Select a Category</Headline>
        <ScrollView>
          {categories.map((i) => {
            return (
              <Text
                key={i._id}
                style={styles.text}
                onPress={() => selectCategoryHandler(i)}
              >
                {i.category}
              </Text>
            );
          })}
        </ScrollView>
      </View>
    )
  );
};

export default SelectComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    position: "absolute",
    padding: 35,
    borderRadius: 20,
    width: "90%",
    height: "90%",
    alignSelf: "center",
    elevation: 5,
    shadowColor: Colors.gray500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    top: Platform.OS === "ios" ? 60 : 45,
  },
  heading: {
    textAlign: "center",
    marginVertical: 10,
    backgroundColor: Colors.gray500,
    borderRadius: 5,
    padding: 3,
    color: Colors.white,
  },
  text: {
    fontSize: 17,
    fontWeight: 200,
    textTransform: "uppercase",
    marginVertical: 10,
  },
});

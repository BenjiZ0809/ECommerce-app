import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { Colors } from "../styles/styles";
import MyModal from "./MyModal";

const ProductListItem = ({
  navigation,
  deleteHandler,
  i,
  id,
  price,
  stock,
  name,
  category,
  imgSrc,
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => navigation.navigate("productDetails", { id })}
        onLongPress={() => setOpenModal((prev) => !prev)}
        style={({ pressed }) => [pressed && { opacity: 0.8 }]}
      >
        <View
          style={[
            styles.container,
            {
              backgroundColor: i % 2 === 0 ? Colors.primary500 : Colors.gray500,
            },
          ]}
        >
          <Image
            source={{ uri: imgSrc }}
            style={{
              width: 40,
              height: 40,
              resizeMode: "contain",
            }}
          ></Image>
          <Text
            numberOfLines={1}
            style={{
              width: 60,
              color: Colors.white,
            }}
          >
            ${price}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              maxWidth: 120,
              color: Colors.white,
            }}
          >
            {name}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              width: 60,
              color: Colors.white,
            }}
          >
            {category}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              width: 40,
              color: Colors.white,
            }}
          >
            {stock}
          </Text>
        </View>
      </Pressable>

      {openModal && (
        <MyModal
          id={id}
          deleteHandler={deleteHandler}
          navigation={navigation}
          setOpenModal={setOpenModal}
        ></MyModal>
      )}
    </>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
});

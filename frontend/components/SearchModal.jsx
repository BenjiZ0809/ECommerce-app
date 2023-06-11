import {
  View,
  Text,
  Platform,
  SafeAreaView,
  ScrollView,
  Image,
  BackHandler,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../styles/styles";
import { StatusBar } from "expo-status-bar";
import { Searchbar, Headline } from "react-native-paper";

const SearchModal = ({
  searchQuery,
  setSearchQuery,
  setActiveSearch,
  products = [],
}) => {
  const navigation = useNavigation();

  const backAction = () => {
    setSearchQuery("");
    setActiveSearch(false);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  }, []);

  return (
    <View
      style={{
        width: "100%",
        height: "103%",
        top: 0,
        zIndex: 100,
        backgroundColor: Colors.white,
        padding: 35,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <SafeAreaView>
        <Searchbar
          placeholder="Search..."
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
          style={{
            marginTop: 20,
          }}
        ></Searchbar>

        <ScrollView>
          <View
            style={{
              paddingVertical: 40,
              paddingHorizontal: 10,
            }}
          >
            {products.map((product) => (
              <SearchItem
                key={product._id}
                imgSrc={product.images[0]?.url}
                name={product.name}
                price={product.price}
                handler={() =>
                  navigation.navigate("productDetails", { id: product._id })
                }
              ></SearchItem>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const SearchItem = ({ price, name, imgSrc, handler }) => {
  return (
    <Pressable onPress={handler}>
      <View
        style={{
          padding: 20,
          borderRadius: 10,
          backgroundColor: Colors.white,
          elevation: 5,
          shadowColor: Colors.gray500,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-end",
          fiexDirection: "row",
          marginVertical: 30,
        }}
      >
        <Image
          source={{ uri: imgSrc }}
          style={{
            width: 80,
            height: 80,
            position: "absolute",
            resizeMode: "contain",
            top: -15,
            left: 10,
            borderTopLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        ></Image>
        <View
          style={{
            width: "80%",
            paddingHorizontal: 30,
          }}
        >
          <Text numberOfLines={1}>{name}</Text>
          <Headline
            numberOfLines={1}
            style={{
              fontWeight: 900,
            }}
          >
            ${price}
          </Headline>
        </View>
      </View>
    </Pressable>
  );
};

export default SearchModal;

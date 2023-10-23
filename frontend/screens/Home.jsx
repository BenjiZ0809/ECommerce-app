import { View, Text, SafeAreaView, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { defaultStyles } from "../styles/styles";
import Header from "../components/Header";
import { Avatar, Button } from "react-native-paper";
import { Colors } from "../styles/styles";
import SearchModal from "../components/SearchModal";
import ProductCard from "../components/ProductCard";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/productAction";
import { useSetCategories } from "../utils/hooks";

// const categories = [
//   { category: "Nice", _id: "adasd" },
//   { category: "Nice2", _id: "adaasd" },
//   { category: "Nice3", _id: "adasfgd" },
//   { category: "Nice4", _id: "adaas6d" },
//   { category: "Nice5", _id: "ada2sfgd" },
// ];

// export const products = [
//   {
//     _id: "asdasd",
//     price: 100,
//     stock: 10,
//     name: "Sample",
//     category: "IDK",
//     images: [
//       {
//         url: "data:image/jpeg;base64,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",
//       },
//     ],
//   },
//   {
//     _id: "ssdasdasdasd",
//     price: 100,
//     stock: 10,
//     name: "asd2",
//     category: "Laptop",
//     images: [
//       {
//         url: "data:image/jpeg;base64,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",
//       },
//     ],
//   },
//   {
//     _id: "asda6576sd",
//     price: 100,
//     stock: 10,
//     name: "2424534sdf",
//     category: "IDK",
//     images: [
//       {
//         url: "data:image/jpeg;base64,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",
//       },
//     ],
//   },
//   {
//     _id: "ssdasdas232dasd",
//     price: 100,
//     stock: 10,
//     name: "Sample2",
//     category: "Laptop",
//     images: [
//       {
//         url: "data:image/jpeg;base64,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",
//       },
//     ],
//   },
// ];

const Home = () => {
  const [category, setCategory] = useState("");
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { products } = useSelector((state) => state.product);

  const categoryButtonHandler = (id) => {
    setCategory(id);
  };

  const addToCartHandler = (id) => {
    console.log("Added to cart", id);
  };

  useSetCategories(setCategories, isFocused);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      dispatch(getAllProducts(searchQuery, category));
    }, 500);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [dispatch, searchQuery, category, isFocused]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {activeSearch && (
        <SearchModal
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setActiveSearch={setActiveSearch}
          products={products}
        ></SearchModal>
      )}
      <View style={{ ...defaultStyles, flex: 1 }}>
        {/* Header */}
        <Header></Header>

        {/* Heading Row */}
        <View
          style={{
            paddingTop: 70,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Heading */}
          <Heading text1="Our" text2="Products"></Heading>

          {/* Search Bar */}
          <View>
            <Pressable
              style={({ pressed }) => [pressed ? { opacity: 0.7 } : null]}
              onPress={() => setActiveSearch((prev) => !prev)}
            >
              <Avatar.Icon
                icon={"magnify"}
                size={50}
                color="gray"
                style={{
                  backgroundColor: Colors.white,
                  elevation: 12,
                  shadowColor: Colors.gray500,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                }}
              ></Avatar.Icon>
            </Pressable>
          </View>
        </View>

        {/* Category */}
        <View
          style={{
            flexDirection: "row",
            height: 80,
          }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ alignItems: "center" }}
          >
            {categories.map((item, index) => (
              <Button
                key={item._id}
                style={{
                  backgroundColor:
                    category === item._id ? Colors.primary500 : Colors.white500,
                  borderRadius: 100,
                  margin: 5,
                }}
                onPress={() => categoryButtonHandler(item._id)}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: category === item._id ? Colors.white : "gray",
                  }}
                >
                  {item.category}
                </Text>
              </Button>
            ))}
          </ScrollView>
        </View>

        {/* Products */}
        <View style={{ flex: 1 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {products.map((item, index) => (
              <ProductCard
                key={item._id}
                stock={item.stock}
                name={item.name}
                price={item.price}
                image={item.images[0]?.url}
                addToCartHandler={addToCartHandler}
                id={item._id}
                i={index}
                navigation={navigation}
              ></ProductCard>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Footer */}
      <Footer activeRoute="home"></Footer>
    </SafeAreaView>
  );
};

export default Home;

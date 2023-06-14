import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { defaultStyles, Colors, formHeading } from "../styles/styles";
import Header from "../components/Header";
import Heading from "../components/Heading";
import Loader from "../components/Loader";
import ButtonBox from "../components/ButtonBox";
import ProductListHeading from "../components/ProductListHeading";
import { products } from "./Home";
import ProductListItem from "../components/ProductListItem";

const AdminPanel = ({ navigation }) => {
  const loading = false;
  const navigationHandler = () => {};
  const deleteProductHandler = (id) => {
    console.log(`delete ${id}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={defaultStyles}>
        <Header back={true}></Header>
        {/* Heading */}

        <View style={{ paddingTop: 70, marginBottom: 20 }}>
          <Text style={{ ...formHeading }}>Admin Panel</Text>
        </View>

        {loading ? (
          <Loader></Loader>
        ) : (
          <>
            <View
              style={{
                backgroundColor: Colors.gray500,
                borderRadius: 20,
                alignItems: "center",
              }}
            ></View>
            <View
              style={{
                flexDirection: "row",
                margin: 10,
                justifyContent: "space-between",
              }}
            >
              <ButtonBox
                icon="plus"
                text="Product"
                handler={navigationHandler}
              ></ButtonBox>

              <ButtonBox
                icon="format-list-bulleted-square"
                text="All Orders"
                handler={navigationHandler}
                reverse={true}
              ></ButtonBox>

              <ButtonBox
                icon="plus"
                text="Category"
                handler={navigationHandler}
              ></ButtonBox>
            </View>

            <ProductListHeading></ProductListHeading>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                {products.map((item, index) => {
                  return (
                    <ProductListItem
                      navigation={navigation}
                      deleteHandler={deleteProductHandler}
                      key={item._id}
                      i={index}
                      price={item.price}
                      stock={item.stock}
                      name={item.name}
                      category={item.category}
                      imgSrc={item.images[0].url}
                    ></ProductListItem>
                  );
                })}
              </View>
            </ScrollView>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AdminPanel;

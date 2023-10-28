import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { defaultStyles, Colors, formHeading } from "../../styles/styles";
import Header from "../../components/Header";
import Heading from "../../components/Heading";
import Loader from "../../components/Loader";
import ButtonBox from "../../components/ButtonBox";
import ProductListHeading from "../../components/ProductListHeading";
import ProductListItem from "../../components/ProductListItem";
import Chart from "../../components/Chart";
import { useAdminProducts, useMessageAndErrorOther } from "../../utils/hooks";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { deleteProduct } from "../../redux/actions/otherAction";
import { getAdminProducts } from "../../redux/actions/productAction";

const AdminPanel = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { loading, products, inStock, outOfStock } = useAdminProducts(
    dispatch,
    isFocused
  );

  const navigationHandler = (text) => {
    switch (text) {
      case "Category":
        navigation.navigate("categories");
        break;
      case "All Orders":
        navigation.navigate("adminOrders");
        break;
      case "Product":
        navigation.navigate("newProduct");
        break;
      default:
        navigation.navigate("adminOrders");
        break;
    }
  };

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const loadingDelete = useMessageAndErrorOther(
    dispatch,
    null,
    null,
    getAdminProducts
  );

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
            >
              <Chart inStock={inStock} outOfStock={outOfStock}></Chart>
            </View>
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
                {!loadingDelete &&
                  products.map((item, index) => {
                    return (
                      <ProductListItem
                        navigation={navigation}
                        deleteHandler={deleteProductHandler}
                        key={item._id}
                        id={item._id}
                        i={index}
                        price={item.price}
                        stock={item.stock}
                        name={item.name}
                        category={item.category?.category}
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

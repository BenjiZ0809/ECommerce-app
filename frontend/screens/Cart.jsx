import { View, Text, SafeAreaView, Pressable, ScrollView } from "react-native";
import React from "react";
import { Colors, defaultStyles } from "../styles/styles";
import Header from "../components/Header";
import Heading from "../components/Heading";
import { Button } from "react-native-paper";
import CartItem from "../components/CartItem";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "react-native-toast-message/lib/src/Toast";

// export const cartItems = [
//   {
//     name: "Nike Air Max 270 React ENG",
//     imgSrc:
//       "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/5bf8e7f4-18c7-4826-9bab-7b9532a5e3b6/air-jordan-1-mid-mens-shoes-b3js2D.png",
//     product: "adgweasdw",
//     stock: 5,
//     price: 100,
//     quantity: 2,
//   },
//   {
//     name: "Macbook",
//     imgSrc:
//       "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MK0U3_FV404?wid=1420&hei=930&fmt=png-alpha&.v=1645143356602",
//     product: "adgwegrhasdefasdw",
//     stock: 25,
//     price: 1200,
//     quantity: 12,
//   },
//   {
//     name: "Macbook",
//     imgSrc:
//       "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MK0U3_FV404?wid=1420&hei=930&fmt=png-alpha&.v=1645143356602",
//     product: "adgwegrhasdeafasdsw",
//     stock: 25,
//     price: 1200,
//     quantity: 12,
//   },
//   {
//     name: "Macbook",
//     imgSrc:
//       "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MK0U3_FV404?wid=1420&hei=930&fmt=png-alpha&.v=1645143356602",
//     product: "adgwegrhasd2efasdw",
//     stock: 25,
//     price: 1200,
//     quantity: 12,
//   },
//   {
//     name: "Macbook",
//     imgSrc:
//       "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MK0U3_FV404?wid=1420&hei=930&fmt=png-alpha&.v=1645143356602",
//     product: "adgwegrhasdegfasdw",
//     stock: 25,
//     price: 1200,
//     quantity: 12,
//   },
// ];

const Cart = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const incrementHandler = (id, name, price, image, stock, quantity) => {
    const newQty = quantity + 1;
    if (stock <= quantity)
      return Toast.show({
        type: "error",
        text1: "Maximum value added",
      });
    dispatch({
      type: "addToCart",
      payload: {
        product: id,
        name,
        price,
        image,
        stock,
        quantity: newQty,
      },
    });
  };
  const decrementHandler = (id, name, price, image, stock, quantity) => {
    const newQty = quantity - 1;

    if (1 >= quantity) return dispatch({ type: "removeFromCart", payload: id });

    dispatch({
      type: "addToCart",
      payload: {
        product: id,
        name,
        price,
        image,
        stock,
        quantity: newQty,
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={{ ...defaultStyles, padding: 0 }}>
        {/* Header */}
        <Header back={true} emptyCart={true}></Header>

        {/* Heading */}
        <Heading
          text1="Shopping"
          text2="Cart"
          containerStyle={{ paddingTop: 70, marginLeft: 35 }}
        ></Heading>

        <View
          style={{
            paddingVertical: 20,
            flex1: 1,
          }}
        ></View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => {
              return (
                <CartItem
                  key={item.product}
                  id={item.product}
                  name={item.name}
                  stock={item.stock}
                  amount={item.price}
                  imgSrc={item.image}
                  index={index}
                  qty={item.quantity}
                  incrementHandler={incrementHandler}
                  decrementHandler={decrementHandler}
                ></CartItem>
              );
            })
          ) : (
            <Text style={{ textAlign: "center", fontSize: 18 }}>
              No Items Yet
            </Text>
          )}
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 35,
          }}
        >
          <Text>{cartItems.length} ITEMS</Text>
          <Text>
            $
            {cartItems.reduce(
              (prev, curr) => prev + curr.quantity * curr.price,
              0
            )}
          </Text>
        </View>

        <Pressable
          onPress={
            cartItems.length > 0
              ? () => navigation.navigate("confirmOrder")
              : null
          }
        >
          <Button
            style={{
              backgroundColor: Colors.gray500,
              borderRadius: 100,
              padding: 5,
              margin: 30,
            }}
            icon={"cart"}
            textColor={Colors.white}
          >
            Checkout
          </Button>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Cart;

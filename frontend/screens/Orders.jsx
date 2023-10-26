import { View, Text, SafeAreaView, Pressable, ScrollView } from "react-native";
import React from "react";
import { Colors, defaultStyles, formHeading } from "../styles/styles";
import Header from "../components/Header";
import Heading from "../components/Heading";
import Loader from "../components/Loader";
import { Headline } from "react-native-paper";
import OrderItem from "../components/OrderItem";
import { useGetOrders } from "../utils/hooks";
import { useIsFocused } from "@react-navigation/native";

// export const orders = [
//   {
//     _id: "adsasd",
//     shippingInfo: {
//       address: "8523 32Ave",
//       City: "New York",
//       Country: "USA",
//       zipCode: "10001",
//     },
//     createdAt: "12-2-2022",
//     orderStatus: "Processing",
//     paymentMethod: "COD",
//     totalAmount: 2344,
//   },
//   {
//     _id: "adsa123123sd",
//     shippingInfo: {
//       address: "4813 009Ave",
//       City: "New York",
//       Country: "USA",
//       zipCode: "1002301",
//     },
//     createdAt: "5-2-2022",
//     orderStatus: "Delivered",
//     paymentMethod: "ONLINE",
//     totalAmount: 100,
//   },
//   {
//     _id: "ad2sfdgsa123123sd",
//     shippingInfo: {
//       address: "4813 009Ave",
//       City: "New York",
//       Country: "USA",
//       zipCode: "1002301",
//     },
//     createdAt: "5-2-2022",
//     orderStatus: "Delivered",
//     paymentMethod: "ONLINE",
//     totalAmount: 100,
//   },
// ];

const Orders = () => {
  const isFocused = useIsFocused();
  const { loading, orders } = useGetOrders(isFocused);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={[defaultStyles, { backgroundColor: Colors.white500 }]}>
        <Header back={true}></Header>
        {/* Heading */}
        <View style={{ marginBottom: 20, paddingTop: 70 }}>
          <Text style={{ ...formHeading }}>Orders</Text>
        </View>

        {loading ? (
          <Loader></Loader>
        ) : (
          <View
            style={{
              padding: 10,
              flex: 1,
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {orders.length > 0 ? (
                orders.map((item, index) => {
                  return (
                    <OrderItem
                      key={item._id}
                      id={item._id}
                      i={index}
                      price={item.totalAmount}
                      status={item.orderStatus}
                      paymentMethod={item.paymentMethod}
                      orderOn={item.createdAt.split("T")[0]}
                      address={`${item.shippingInfo.address},${item.shippingInfo.City},${item.shippingInfo.Country},${item.shippingInfo.zipCode}}`}
                      admin={true}
                    ></OrderItem>
                  );
                })
              ) : (
                <Headline style={{ textAlign: "center" }}>
                  No Orders Yet
                </Headline>
              )}
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Orders;

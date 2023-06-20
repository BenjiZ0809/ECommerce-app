import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { Colors, defaultStyles, formHeading } from "../../styles/styles";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { orders } from "../Orders";
import OrderItem from "../../components/OrderItem";

const AdminOrders = () => {
  const loading = false;
  const processOrderLoading = false;

  const updateHandler = (id, status) => {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white500 }}>
      <View style={[defaultStyles, { backgroundColor: Colors.white500 }]}>
        <Header back={true}></Header>
        {/* Heading */}

        <View style={{ paddingTop: 70, marginBottom: 20 }}>
          <Text style={{ ...formHeading }}>All Orders</Text>
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
                      updateHandler={updateHandler}
                      loading={processOrderLoading}
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

export default AdminOrders;

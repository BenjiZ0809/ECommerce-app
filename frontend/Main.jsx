import { View, Text, SafeAreaView, StatusBar, Platform } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import ProductDetails from "./screens/ProductDetails";
import Toast from "react-native-toast-message";
import Cart from "./screens/Cart";
import ConfirmOrder from "./screens/ConfirmOrder";
import Payment from "./screens/Payment";
import Login from "./screens/Login";
import ForgetPassword from "./screens/ForgetPassword";
import Verify from "./screens/Verify";
import SignUp from "./screens/SignUp";

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Group>
          <Stack.Screen name="home" component={Home}></Stack.Screen>
          <Stack.Screen
            name="productDetails"
            component={ProductDetails}
          ></Stack.Screen>
          <Stack.Screen name="cart" component={Cart}></Stack.Screen>
          <Stack.Screen
            name="confirmOrder"
            component={ConfirmOrder}
          ></Stack.Screen>
          <Stack.Screen name="payment" component={Payment}></Stack.Screen>
          <Stack.Screen name="login" component={Login}></Stack.Screen>
          <Stack.Screen
            name="forgetPassword"
            component={ForgetPassword}
          ></Stack.Screen>
          <Stack.Screen name="verify" component={Verify}></Stack.Screen>
          <Stack.Screen name="signUp" component={SignUp}></Stack.Screen>
        </Stack.Group>
      </Stack.Navigator>
      <Toast position="top"></Toast>
    </NavigationContainer>
  );
};

export default Main;

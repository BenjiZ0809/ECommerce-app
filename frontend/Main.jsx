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
import Profile from "./screens/Profile";
import UpdateProfile from "./screens/UpdateProfile";
import ChangePassword from "./screens/ChangePassword";
import Orders from "./screens/Orders";
import AdminPanel from "./screens/AdminPanel";

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
          <Stack.Screen name="profile" component={Profile}></Stack.Screen>
          <Stack.Screen
            name="updateProfile"
            component={UpdateProfile}
          ></Stack.Screen>
          <Stack.Screen
            name="changePassword"
            component={ChangePassword}
          ></Stack.Screen>
          <Stack.Screen name="orders" component={Orders}></Stack.Screen>
          <Stack.Screen name="adminPanel" component={AdminPanel}></Stack.Screen>
        </Stack.Group>
      </Stack.Navigator>
      <Toast position="top"></Toast>
    </NavigationContainer>
  );
};

export default Main;

import { View, Text, SafeAreaView, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { defaultStyles } from "../styles/styles";
import Header from "../components/Header";
import Heading from "../components/Heading";
import { Colors } from "../styles/styles";
import { RadioButton, Button } from "react-native-paper";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux";
import { placeOrder } from "../redux/actions/otherAction";
import { useMessageAndErrorOther } from "../utils/hooks";
import { useStripe } from "@stripe/stripe-react-native";
import Toast from "react-native-toast-message";
import axios from "axios";
import { server } from "../redux/store";
import { load } from "mime";
import Loader from "../components/Loader";

const Payment = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const stripe = useStripe();

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const [paymentMethod, setPaymentMethod] = React.useState("COD");
  const [loaderLoading, setLoaderLoading] = useState(false);

  const redirectToLogin = () => {
    navigation.navigate("login");
  };
  const codHandler = (paymentInfo) => {
    const shippingInfo = {
      address: user.address,
      city: user.city,
      country: user.country,
      zipCode: user.zipCode,
    };
    console.log(route);
    const itemsPrice = route.params.itemsPrice;
    const shippingCharges = route.params.shipping;
    const taxPrice = route.params.tax;
    const totalAmount = route.params.total;

    dispatch(
      placeOrder(
        cartItems,
        shippingInfo,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalAmount,
        paymentInfo
      )
    );
  };

  const onlineHandler = async () => {
    try {
      const {
        data: { client_secret },
      } = await axios.post(
        `${server}/order/payment`,
        {
          totalAmount: route.params.total,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const init = await stripe.initPaymentSheet({
        paymentIntentClientSecret: client_secret,
        merchantDisplayName: "Benjamin",
      });

      if (init.error)
        return Toast.show({ type: "error", text1: init.error.message });

      const presentSheet = await stripe.presentPaymentSheet();
      setLoaderLoading(true);

      if (presentSheet.error) {
        setLoaderLoading(false);
        return Toast.show({ type: "error", text1: presentSheet.error.message });
      }

      const { paymentIntent } = await stripe.retrievePaymentIntent(
        client_secret
      );

      if (paymentIntent.status === "Succeeded") {
        codHandler({ id: paymentIntent.id, status: paymentIntent.status });
      }
    } catch (error) {
      return Toast.show({
        type: "error",
        text1: "Some Error",
        text2: error,
      });
    }
  };

  const loading = useMessageAndErrorOther(
    dispatch,
    navigation,
    "profile",
    () => ({
      type: "clearCart",
    })
  );

  console.log(paymentMethod);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      {loaderLoading ? (
        <Loader></Loader>
      ) : (
        <View style={defaultStyles}>
          <Header back={true}></Header>
          <Heading
            text1="Payment"
            text2="Method"
            containerStyle={{ paddingTop: 70 }}
          ></Heading>
          <View style={styles.container}>
            <RadioButton.Group
              value={paymentMethod}
              onValueChange={setPaymentMethod}
            >
              <View style={styles.radioStyle}>
                <Text style={styles.radioStyleText}>Cash On Delivery</Text>
                <RadioButton
                  color={Colors.primary300}
                  value={"COD"}
                ></RadioButton>
              </View>
              <View style={styles.radioStyle}>
                <Text style={styles.radioStyleText}>Online</Text>
                <RadioButton
                  color={Colors.primary300}
                  value={"ONLINE"}
                ></RadioButton>
              </View>
            </RadioButton.Group>
          </View>

          <Pressable
            disabled={loading}
            style={({ pressed }) => [pressed && { opacity: 0.5 }]}
            onPress={
              !isAuthenticated
                ? redirectToLogin
                : paymentMethod === "COD"
                ? () => codHandler()
                : onlineHandler
            }
          >
            <Button
              loading={loading}
              disabled={loading}
              style={styles.btn}
              textColor={Colors.white}
              icon={
                paymentMethod === "COD"
                  ? "check-circle"
                  : "circle-multiple-outline"
              }
            >
              {paymentMethod === "COD" ? "Place Order" : "Pay Now"}
            </Button>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray500,
    padding: 30,
    borderRadius: 10,
    marginVertical: 20,
    flex: 1,
    justifyContent: "center",
  },
  radioStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  radioStyleText: {
    fontWeight: 600,
    fontSize: 18,
    textTransform: "uppercase",
    color: Colors.white,
  },
  btn: {
    backgroundColor: Colors.gray500,
    borderRadius: 100,
    padding: 5,
    margin: 10,
  },
});

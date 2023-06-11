import { View, Text, SafeAreaView, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import {
  Colors,
  defaultStyles,
  inputStyles,
  formHeading,
  inputOptions,
  formStyles,
} from "../styles/styles";
import { TextInput, Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import Footer from "../components/Footer";

const ForgetPassword = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loading = false;

  const submitHandler = () => {
    alert("Login");
    navigation.navigate("verify");
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
        <View style={defaultStyles}>
          {/* Heading */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ ...formHeading }}>Forget Password</Text>
          </View>

          <View style={formStyles.container}>
            <TextInput
              style={inputStyles}
              {...inputOptions}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            ></TextInput>

            <Button
              loading={loading}
              style={formStyles.btn}
              textColor={Colors.white}
              icon={"login"}
              disabled={email === ""}
              onPress={submitHandler}
            >
              Send Code
            </Button>

            <Text style={formStyles.or}>OR</Text>
            <Pressable
              style={({ pressed }) => [pressed && { opacity: 0.5 }]}
              onPress={() => navigation.navigate("login")}
            >
              <Text style={formStyles.link}>Log In</Text>
            </Pressable>
          </View>
        </View>
        <Footer activeRoute="profile"></Footer>
      </SafeAreaView>
    </>
  );
};

export default ForgetPassword;

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
import { useMessageAndErrorOther } from "../utils/hooks";
import { useDispatch } from "react-redux";
import { resetPassword } from "../redux/actions/otherAction";

const Verify = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const loading = useMessageAndErrorOther(dispatch, navigation, "login");

  const submitHandler = () => {
    dispatch(resetPassword(code, password));
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
        <View style={defaultStyles}>
          {/* Heading */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ ...formHeading }}>Reset Password</Text>
          </View>

          <View style={formStyles.container}>
            <TextInput
              style={inputStyles}
              {...inputOptions}
              placeholder="Code"
              keyboardType="number-pad"
              value={code}
              onChangeText={setCode}
            ></TextInput>

            <TextInput
              style={inputStyles}
              {...inputOptions}
              placeholder="New Password"
              secureTextEntry={true}
              keyboardType="number-pad"
              value={password}
              onChangeText={setPassword}
            ></TextInput>

            <Button
              loading={loading}
              style={formStyles.btn}
              textColor={Colors.white}
              disabled={code === "" || password === ""}
              onPress={submitHandler}
            >
              Reset
            </Button>

            <Text style={formStyles.or}>OR</Text>
            <Pressable
              style={({ pressed }) => [pressed && { opacity: 0.5 }]}
              onPress={() => navigation.navigate("forgetPassword")}
            >
              <Text style={formStyles.link}>Resend Code</Text>
            </Pressable>
          </View>
        </View>
        <Footer activeRoute="profile"></Footer>
      </SafeAreaView>
    </>
  );
};

export default Verify;

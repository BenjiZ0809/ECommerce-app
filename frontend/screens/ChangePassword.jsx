import { View, Text, SafeAreaView, Pressable } from "react-native";
import React, { useState } from "react";
import {
  Colors,
  defaultStyles,
  inputStyles,
  inputOptions,
  formStyles,
} from "../styles/styles";
import { TextInput, Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { formHeading } from "../styles/styles";
import Header from "../components/Header";

const ChangePassword = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [oldPassword, setOdPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const loading = false;

  const submitHandler = () => {
    alert("changes");
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
        <View style={defaultStyles}>
          <Header back={true}></Header>
          {/* Heading */}
          <View style={{ marginBottom: 20, paddingTop: 70 }}>
            <Text style={formHeading}>Change Password</Text>
          </View>

          <View style={formStyles.container}>
            <TextInput
              style={inputStyles}
              {...inputOptions}
              placeholder="Old Password"
              keyboardType="email-address"
              value={oldPassword}
              onChangeText={setOdPassword}
            ></TextInput>
            <TextInput
              style={inputStyles}
              {...inputOptions}
              placeholder="New Password"
              secureTextEntry={true}
              value={newPassword}
              onChangeText={setNewPassword}
            ></TextInput>

            <Pressable
              style={({ pressed }) => [pressed && { opacity: 0.5 }]}
              onPress={() => navigation.navigate("forgetPassword")}
            >
              <Text style={formStyles.forgetText}>Forget Password?</Text>
            </Pressable>

            <Button
              loading={loading}
              style={formStyles.btn}
              textColor={Colors.white}
              icon={"lock"}
              disabled={oldPassword === "" || newPassword === ""}
              onPress={submitHandler}
            >
              Change Password
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ChangePassword;

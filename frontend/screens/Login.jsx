import { View, Text, SafeAreaView, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import {
    Colors,
    defaultStyles,
    inputStyles,
    inputOptions,
    formStyles,
} from "../styles/styles";
import { TextInput, Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import Footer from "../components/Footer";
import { formHeading } from "../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/userActions";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useMessageAndErrorFromUser } from "../utils/hooks";

const Login = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const loading = useMessageAndErrorFromUser(navigation, dispatch, "profile");

    const submitHandler = () => {
        dispatch(login(email, password));
    };

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <View style={defaultStyles}>
                    {/* Heading */}
                    <View style={{ marginBottom: 20 }}>
                        <Text style={formHeading}>Login</Text>
                    </View>

                    <View style={formStyles.container}>
                        <TextInput
                            style={inputStyles}
                            {...inputOptions}
                            placeholder="Email"
                            keyboardType="default"
                            value={email}
                            onChangeText={setEmail}
                        ></TextInput>
                        <TextInput
                            style={inputStyles}
                            {...inputOptions}
                            placeholder="Password"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        ></TextInput>

                        <Pressable
                            style={({ pressed }) => [
                                pressed && { opacity: 0.5 },
                            ]}
                            onPress={() =>
                                navigation.navigate("forgetPassword")
                            }
                        >
                            <Text style={formStyles.forgetText}>
                                Forget Password?
                            </Text>
                        </Pressable>

                        <Button
                            loading={loading}
                            style={formStyles.btn}
                            textColor={Colors.white}
                            icon={"login"}
                            disabled={email === "" || password === ""}
                            onPress={submitHandler}
                        >
                            Log In
                        </Button>

                        <Text style={formStyles.or}>OR</Text>
                        <Pressable
                            style={({ pressed }) => [
                                pressed && { opacity: 0.5 },
                            ]}
                            onPress={() => navigation.navigate("signUp")}
                        >
                            <Text style={formStyles.link}>Sign Up</Text>
                        </Pressable>
                    </View>
                </View>
                <Footer activeRoute="profile"></Footer>
            </SafeAreaView>
        </>
    );
};

export default Login;

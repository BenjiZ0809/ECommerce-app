import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Pressable,
    ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
    Colors,
    defaultStyles,
    inputStyles,
    formHeading,
    inputOptions,
    formStyles,
    defaultImg,
} from "../styles/styles";
import { TextInput, Button, Avatar } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import Footer from "../components/Footer";
import mime from "mime";
import { useDispatch } from "react-redux";
import { useMessageAndErrorFromUser } from "../utils/hooks";
import { register } from "../redux/actions/userActions";

const SignUp = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");

    const dispatch = useDispatch();

    const loading = useMessageAndErrorFromUser(navigation, dispatch, "profile");

    const disableBtn =
        !name ||
        !email ||
        !password ||
        !address ||
        !city ||
        !country ||
        !zipCode;

    const submitHandler = () => {
        const myForm = new FormData();
        myForm.append("name", name);
        myForm.append("email", email);
        myForm.append("password", password);
        myForm.append("address", address);
        myForm.append("city", city);
        myForm.append("country", country);
        myForm.append("zipCode", zipCode);
        if (avatar !== "") {
            myForm.append("file", {
                uri: avatar,
                type: mime.getType(avatar),
                name: avatar.split("/").pop(),
            });
        }
        dispatch(register(myForm));
    };

    useEffect(() => {
        if (route.params?.image) {
            setAvatar(route.params.image);
        }
    }, [route.params]);

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <View style={defaultStyles}>
                    {/* Heading */}
                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ ...formHeading }}>Sign Up</Text>
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{
                            padding: 20,
                            elevation: 10,
                            shadowColor: Colors.gray500,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.5,
                            shadowRadius: 10,
                            borderRadius: 10,
                            backgroundColor: Colors.gray500,
                        }}
                    >
                        <View style={{ minHeight: 900 }}>
                            <Avatar.Image
                                style={{
                                    alignSelf: "center",
                                    backgroundColor: Colors.primary500,
                                }}
                                size={80}
                                source={{ uri: avatar ? avatar : defaultImg }}
                            ></Avatar.Image>

                            <Pressable
                                onPress={() => navigation.navigate("camera")}
                            >
                                <Button textColor={Colors.white}>
                                    Change Photo
                                </Button>
                            </Pressable>

                            <TextInput
                                style={inputStyles}
                                {...inputOptions}
                                placeholder="Name"
                                value={name}
                                onChangeText={setName}
                            ></TextInput>

                            <TextInput
                                style={inputStyles}
                                {...inputOptions}
                                placeholder="Email"
                                keyboardType="email-address"
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

                            <TextInput
                                style={inputStyles}
                                {...inputOptions}
                                placeholder="Address"
                                value={address}
                                onChangeText={setAddress}
                            ></TextInput>

                            <TextInput
                                style={inputStyles}
                                {...inputOptions}
                                placeholder="City"
                                value={city}
                                onChangeText={setCity}
                            ></TextInput>

                            <TextInput
                                style={inputStyles}
                                {...inputOptions}
                                placeholder="Country"
                                value={country}
                                onChangeText={setCountry}
                            ></TextInput>

                            <TextInput
                                style={inputStyles}
                                {...inputOptions}
                                placeholder="Zip Code"
                                value={zipCode}
                                onChangeText={setZipCode}
                            ></TextInput>

                            <Button
                                loading={loading}
                                style={formStyles.btn}
                                textColor={Colors.white}
                                icon={"account-plus"}
                                disabled={disableBtn}
                                onPress={submitHandler}
                            >
                                Sign Up
                            </Button>

                            <Text style={formStyles.or}>OR</Text>
                            <Pressable
                                style={({ pressed }) => [
                                    pressed && { opacity: 0.5 },
                                ]}
                                onPress={() => navigation.navigate("login")}
                            >
                                <Text style={formStyles.link}>Log In</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </View>
                <Footer activeRoute="profile"></Footer>
            </SafeAreaView>
        </>
    );
};

export default SignUp;

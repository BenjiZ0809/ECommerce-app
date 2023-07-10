import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Pressable,
    ScrollView,
} from "react-native";
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
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/actions/otherAction";
import { useMessageAndErrorOther } from "../utils/hooks";

const UpdateProfile = () => {
    const { user } = useSelector((state) => state.user);
    const navigation = useNavigation();
    const route = useRoute();
    const [name, setName] = useState(user?.name);
    const [city, setCity] = useState(user?.city);
    const [country, setCountry] = useState(user?.country);
    const [zipCode, setZipCode] = useState(user?.zipCode.toString());
    const [address, setAddress] = useState(user?.address);
    const [email, setEmail] = useState(user?.email);
    const dispatch = useDispatch();

    const loading = useMessageAndErrorOther(dispatch, navigation, "profile");

    const submitHandler = () => {
        dispatch(updateProfile(name, email, address, city, country, zipCode));
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <View style={defaultStyles}>
                <Header back={true}></Header>
                {/* Heading */}
                <View style={{ marginBottom: 20, paddingTop: 70 }}>
                    <Text style={{ ...formHeading }}>Edit Profile</Text>
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
                    <View style={{}}>
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
                            onPress={submitHandler}
                        >
                            Update
                        </Button>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default UpdateProfile;

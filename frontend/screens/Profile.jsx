import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { defaultStyles, formHeading, Colors } from "../styles/styles";
import { Avatar, Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import ButtonBox from "../components/ButtonBox";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const user = {
  name: "John Doe",
  email: "sampl@gmail.com",
};

const loading = false;

const Profile = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [avatar, setAvatar] = useState(null);

  const logoutHandler = () => {
    console.log("Logout");
  };

  const navigationHandler = (text) => {
    switch (text) {
      case "Admin":
        navigation.navigate("adminPanel");
        break;
      case "Orders":
        navigation.navigate("orders");
        break;
      case "Profile":
        navigation.navigate("updateProfile");
        break;
      case "Password":
        navigation.navigate("changePassword");
        break;
      case "Sign Out":
        logoutHandler();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (route.params?.image) {
      setAvatar(route.params.image);
      //dispatch update picture action
    }
  }, [route.params]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={defaultStyles}>
        {/* Heading */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ ...formHeading }}>Profile</Text>
        </View>

        {/* Loading */}

        {loading ? (
          <Loader></Loader>
        ) : (
          <>
            <View style={styles.container}>
              <Avatar.Image
                source={{ uri: avatar }}
                size={100}
                style={{ backgroundColor: Colors.primary500 }}
              ></Avatar.Image>

              <Pressable
                onPress={() =>
                  navigation.navigate("camera", { updateProfile: true })
                }
              >
                <Button textColor={Colors.primary500}>Change Photo</Button>
              </Pressable>
              <Text style={styles.name}>{user?.name}</Text>
              <Text
                style={{
                  fontWeight: 300,
                  color: Colors.white,
                }}
              >
                {user?.email}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                margin: 10,
                justifyContent: "space-between",
              }}
            >
              <ButtonBox
                text="Orders"
                icon="format-list-bulleted-square"
                handler={navigationHandler}
              ></ButtonBox>
              <ButtonBox
                icon="view-dashboard"
                text="Admin"
                reverse={true}
                handler={navigationHandler}
              ></ButtonBox>
              <ButtonBox
                text="Profile"
                icon="pencil"
                handler={navigationHandler}
              ></ButtonBox>
            </View>
            <View
              style={{
                flexDirection: "row",
                margin: 10,
                justifyContent: "space-evenly",
              }}
            >
              <ButtonBox
                text="Password"
                icon="format-list-bulleted-square"
                handler={navigationHandler}
              ></ButtonBox>
              <ButtonBox
                text="Sign Out"
                icon="exit-to-app"
                handler={navigationHandler}
              ></ButtonBox>
            </View>
          </>
        )}
      </View>
      <Footer></Footer>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    elevation: 7,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: Colors.gray500,
    shadowOpacity: 0.2,
    backgroundColor: Colors.gray500,
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: 500,
    marginTop: 10,
    color: Colors.white,
  },
});

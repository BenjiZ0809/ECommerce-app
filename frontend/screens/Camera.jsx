import { View, Text, Pressable, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { Avatar } from "react-native-paper";
import { Colors, defaultStyles } from "../styles/styles";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRoute } from "@react-navigation/native";

const CameraComponent = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);

  const openImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult === false) {
      return alert("Permission to access gallery is required!");
    }
    const data = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (route.params?.newProduct) {
      return navigation.navigate("newProduct", { image: data.assets[0].uri });
    }
    if (route.params?.updateProduct) {
      return navigation.navigate("productImages", {
        image: data.assets[0].uri,
      });
    }
    if (route.params?.updateProfile) {
      return navigation.navigate("profile", { image: data.assets[0].uri });
    } else {
      return navigation.navigate("signUp", { image: data.assets[0].uri });
    }
  };

  const clickPicture = async () => {
    const data = await camera.takePictureAsync();

    if (route.params?.newProduct) {
      return navigation.navigate("newProduct", { image: data.uri });
    }
    if (route.params?.updateProduct) {
      return navigation.navigate("productImages", {
        image: data.uri,
      });
    }
    if (route.params?.updateProfile) {
      return navigation.navigate("profile", { image: data.uri });
    } else {
      return navigation.navigate("signUp", { image: data.uri });
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) return <View></View>;
  if (hasPermission === false)
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
        <Text style={defaultStyles}>No access to camera</Text>
      </SafeAreaView>
    );

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Camera
        type={type}
        style={{
          flex: 1,
          aspectRatio: 1,
        }}
        ratio="1:1"
        ref={(e) => setCamera(e)}
      ></Camera>
      <View
        style={{
          flexDirection: "row",
          bottom: 10,
          width: "100%",
          justifyContent: "space-evenly",
          position: "absolute",
        }}
      >
        <MyIcon icon="image" handler={openImagePicker}></MyIcon>
        <MyIcon icon="camera" handler={clickPicture}></MyIcon>
        <MyIcon
          icon="camera-flip"
          handler={() => {
            setType((prevType) =>
              prevType === CameraType.back ? CameraType.front : CameraType.back
            );
          }}
        ></MyIcon>
      </View>
    </View>
  );
};

const MyIcon = ({ icon, handler }) => {
  return (
    <Pressable
      onPress={handler}
      style={({ pressed }) => [pressed && { opacity: 0.5 }]}
    >
      <Avatar.Icon
        icon={icon}
        size={40}
        color={Colors.white}
        style={{
          backgroundColor: Colors.primary500,
        }}
      ></Avatar.Icon>
    </Pressable>
  );
};

export default CameraComponent;

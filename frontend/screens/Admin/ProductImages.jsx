import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, defaultStyles, formHeading } from "../../styles/styles";
import Header from "../../components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import ImageCard from "../../components/ImageCard";
import { Avatar, Button } from "react-native-paper";
import { useMessageAndErrorOther } from "../../utils/hooks";
import { useDispatch } from "react-redux";
import mime from "mime";
import {
  deleteProductImage,
  updateProductImage,
} from "../../redux/actions/otherAction";

const ProductImages = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [images] = useState(route.params.images);
  const [productId] = useState(route.params.id);
  const [image, setImage] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);

  const loading = useMessageAndErrorOther(dispatch, navigation, "adminPanel");

  const submitHandler = () => {
    const myForm = new FormData();

    myForm.append("file", {
      uri: image,
      type: mime.getType(image),
      name: image.split("/").pop(),
    });

    dispatch(updateProductImage(productId, myForm));
  };

  const deleteHandler = (imageId) => {
    console.log(imageId);
    dispatch(deleteProductImage(productId, imageId));
  };

  useEffect(() => {
    if (route.params?.image) {
      setImage(route.params.image);
      setImageChanged(true);
    }
  }, [route.params]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white500 }}>
      <View style={[defaultStyles, { backgroundColor: Colors.white500 }]}>
        <Header back={true}></Header>

        {/* Heading */}
        <View style={{ paddingTop: 70, marginBottom: 20 }}>
          <Text style={{ ...formHeading }}>Images</Text>
        </View>
        <ScrollView
          style={{
            marginBottom: 20,
          }}
        >
          <View
            style={{
              backgroundColor: Colors.white,
              padding: 40,
              minHeight: 400,
            }}
          >
            {images.map((i) => (
              <ImageCard
                key={i._id}
                src={i.url}
                id={i._id}
                deleteHandler={deleteHandler}
              ></ImageCard>
            ))}
          </View>
        </ScrollView>
        <View
          style={{
            padding: 20,
            borderRadius: 10,
            backgroundColor: Colors.gray500,
          }}
        >
          <Image
            style={{
              backgroundColor: Colors.white,
              width: 100,
              height: 100,
              alignSelf: "center",
              resizeMode: "contain",
            }}
            source={{ uri: image }}
          ></Image>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Pressable
              style={({ pressed }) => [pressed && { opacity: 0.5 }]}
              onPress={() =>
                navigation.navigate("camera", { updateProduct: true })
              }
            >
              <Avatar.Icon
                icon="camera"
                size={30}
                color={Colors.gray500}
                style={{
                  backgroundColor: Colors.white,
                  margin: 10,
                }}
              ></Avatar.Icon>
            </Pressable>
          </View>
          <Button
            style={{
              backgroundColor: Colors.primary500,
              padding: 6,
            }}
            textColor={Colors.white}
            loading={loading}
            onPress={submitHandler}
            disable={!imageChanged}
          >
            Add
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductImages;

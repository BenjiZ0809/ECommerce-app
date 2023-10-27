import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Platform,
  Pressable,
} from "react-native";
import React, { useEffect, useReducer, useState } from "react";
import Header from "../../components/Header";
import {
  defaultStyles,
  formHeading,
  Colors,
  inputOptions,
  inputStyles,
} from "../../styles/styles";
import Loader from "../../components/Loader";
import { Button, TextInput, Avatar } from "react-native-paper";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import SelectComponent from "../../components/SelectComponent";
import { useMessageAndErrorOther, useSetCategories } from "../../utils/hooks";
import { useDispatch } from "react-redux";
import mime from "mime";
import { createProduct } from "../../redux/actions/otherAction";

const NewProduct = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();

  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Select Category");
  const [categoryId, setCategoryId] = useState(undefined);
  const [categories, setCategories] = useState([]);

  useSetCategories(setCategories, isFocused);

  const disableBtnCondition =
    !name || !description || !price || !stock || !image;

  const submitHandler = () => {
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("description", description);
    myForm.append("price", price);
    myForm.append("stock", stock);
    myForm.append("file", {
      uri: image,
      type: mime.getType(image),
      name: image.split("/").pop,
    });

    if (categoryId) {
      myForm.append("category", categoryId);
    }

    dispatch(createProduct(myForm));
  };

  const loading = useMessageAndErrorOther(dispatch, navigation, "adminPanel");

  useEffect(() => {
    if (route.params?.image) {
      setImage(route.params.image);
    }
  }, [route.params]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white500 }}>
      <View style={[defaultStyles, { backgroundColor: Colors.white500 }]}>
        <Header back={true}></Header>
        {/* Heading */}

        <View style={{ paddingTop: 70, marginBottom: 20 }}>
          <Text style={{ ...formHeading }}>New Product</Text>
        </View>

        <ScrollView
          style={{
            padding: 20,
            elevation: 10,
            shadowColor: Colors.gray500,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            backgroundColor: Colors.gray500,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              height: 650,
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                alignSelf: "center",
                marginBottom: 20,
              }}
            >
              <Avatar.Image
                size={80}
                style={{
                  backgroundColor: Colors.primary500,
                }}
                source={{ uri: image ? image : null }}
              ></Avatar.Image>
              <Pressable
                onPress={() =>
                  navigation.navigate("camera", { newProduct: true })
                }
                style={({ pressed }) => [pressed && { opacity: 0.5 }]}
              >
                <Avatar.Icon
                  icon="camera"
                  size={30}
                  color={Colors.gray500}
                  style={{
                    backgroundColor: Colors.white500,
                    position: "absolute",
                    bottom: 0,
                    right: -5,
                  }}
                ></Avatar.Icon>
              </Pressable>
            </View>

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
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
            ></TextInput>

            <TextInput
              style={inputStyles}
              {...inputOptions}
              placeholder="Price"
              keyboardType="number-pad"
              value={price}
              onChangeText={setPrice}
            ></TextInput>

            <TextInput
              style={inputStyles}
              {...inputOptions}
              placeholder="Stock"
              keyboardType="number-pad"
              value={stock}
              onChangeText={setStock}
            ></TextInput>

            <Text
              style={{
                ...inputStyles,
                textAlignVertical: "center",
                textAlign: "center",
                borderRadius: 3,
                paddingTop: Platform.OS === "ios" ? 15 : 0,
              }}
              onPress={() => setVisible(true)}
            >
              {category}
            </Text>

            <Button
              textColor={Colors.white}
              style={{
                backgroundColor: Colors.primary500,
                margin: 20,
                padding: 6,
              }}
              onPress={submitHandler}
              loading={loading}
              disabled={disableBtnCondition || loading}
            >
              Create
            </Button>
          </View>
        </ScrollView>
      </View>
      <SelectComponent
        visible={visible}
        setVisible={setVisible}
        setCategory={setCategory}
        setCategoryId={setCategoryId}
        categories={categories}
      ></SelectComponent>
    </SafeAreaView>
  );
};

export default NewProduct;

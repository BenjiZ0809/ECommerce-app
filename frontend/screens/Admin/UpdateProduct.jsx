import { View, Text, SafeAreaView, ScrollView, Platform } from "react-native";
import React, { useReducer, useState, useEffect } from "react";
import Header from "../../components/Header";
import {
  defaultStyles,
  formHeading,
  Colors,
  inputOptions,
  inputStyles,
} from "../../styles/styles";
import Loader from "../../components/Loader";
import { Button, TextInput } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import SelectComponent from "../../components/SelectComponent";

const UpdateProduct = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();

  const loading = false;
  const loadingOther = false;

  const images = [
    {
      url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MK0U3_FV404?wid=1420&hei=930&fmt=png-alpha&.v=1645143356602",
      _id: "adgweasdw",
    },
    {
      url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MK0U3_FV404?wid=1420&hei=930&fmt=png-alpha&.v=1645143356602",
      _id: "adgwe22asdw",
    },
  ];

  const [id] = useState(route.params.id);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Laptop");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([
    { _id: "adwdw", category: "Laptop" },
    { _id: "ad123wdw", category: "Footwear" },
    { _id: "1235asdfdwdw", category: "Cloth" },
  ]);
  const [visible, setVisible] = useState(false);

  const submitHandler = () => {
    console.log(name, price, description, stock, category, categoryId);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white500 }}>
      <View style={[defaultStyles, { backgroundColor: Colors.white500 }]}>
        <Header back={true}></Header>
        {/* Heading */}

        <View style={{ paddingTop: 70, marginBottom: 20 }}>
          <Text style={{ ...formHeading }}>Update Product</Text>
        </View>

        {loading ? (
          <Loader></Loader>
        ) : (
          <>
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
                <Button
                  textColor={Colors.primary500}
                  onPress={() =>
                    navigation.navigate("productImages", { id, images: images })
                  }
                >
                  Manage Images
                </Button>
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
                  loading={loadingOther}
                  disabled={loadingOther}
                >
                  Update
                </Button>
              </View>
            </ScrollView>
          </>
        )}
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

export default UpdateProduct;

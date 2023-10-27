import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import {
  Colors,
  defaultStyles,
  formHeading,
  inputOptions,
} from "../../styles/styles";
import Header from "../../components/Header";
import { Avatar, TextInput, Button } from "react-native-paper";
import { useMessageAndErrorOther, useSetCategories } from "../../utils/hooks";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addCategory, deleteCategory } from "../../redux/actions/otherAction";

const Categories = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useSetCategories(setCategories, isFocused);

  const loading = useMessageAndErrorOther(dispatch, navigation, "adminPanel");

  const deleteHandler = (id) => {
    dispatch(deleteCategory(id));
  };

  const submitHandler = () => {
    dispatch(addCategory(category));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white500 }}>
      <View style={[defaultStyles, { backgroundColor: Colors.white500 }]}>
        <Header back={true}></Header>
        {/* Heading */}
        <View style={{ marginBottom: 20, paddingTop: 70 }}>
          <Text style={{ ...formHeading }}>Edit Categories</Text>
        </View>

        <ScrollView
          style={{
            marginBottom: 20,
          }}
        >
          <View
            Style={{
              backgroundColor: Colors.white,
              padding: 20,
              minHeight: 400,
            }}
          >
            {categories.map((i) => (
              <CategoryCard
                name={i.category}
                id={i._id}
                key={i._id}
                deleteHandler={deleteHandler}
              ></CategoryCard>
            ))}
          </View>
        </ScrollView>
        <View style={styles.container}>
          <TextInput
            {...inputOptions}
            placeholder="Category"
            value={category}
            onChangeText={setCategory}
          ></TextInput>
          <Button
            textColor={Colors.white}
            style={{
              backgroundColor: Colors.primary500,
              margin: 20,
              padding: 6,
            }}
            disabled={!category}
            onPress={submitHandler}
            loading={loading}
          >
            Add
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const CategoryCard = ({ name, id, deleteHandler }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardText}>{name}</Text>
      <Pressable
        onPress={() => deleteHandler(id)}
        style={({ pressed }) => [pressed && { opacity: 0.5 }]}
      >
        <Avatar.Icon
          icon="delete"
          size={30}
          style={{
            backgroundColor: Colors.primary500,
          }}
        ></Avatar.Icon>
      </Pressable>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    elevation: 5,
    shadowColor: Colors.gray500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    borderRadius: 10,
    backgroundColor: Colors.gray500,
  },
  cardContainer: {
    backgroundColor: Colors.white,
    elevation: 5,
    shadowColor: Colors.gray500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    margin: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
  },
  cardText: {
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

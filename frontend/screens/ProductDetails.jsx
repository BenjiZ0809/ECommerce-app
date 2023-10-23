import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { defaultStyles } from "../styles/styles";
import { Colors } from "../styles/styles";
import Header from "../components/Header";
import Carousel from "react-native-snap-carousel";
import { Avatar, Button } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { getProductDetails } from "../redux/actions/productAction";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = SLIDER_WIDTH;

const ProductDetails = ({ route: { params } }) => {
  const {
    product: { name, price, stock, description, images },
  } = useSelector((state) => state.product);
  console.log(params.id);
  const [quantity, setQuantity] = useState(1);
  const isCarousel = React.useRef(null);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  // const name = "Mac";
  // const price = 1000;
  // const stock = 19;
  // const description =
  //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia fugiat illo dolorem odit in. Modi impedit esse tempora laboriosam, eaque voluptate soluta aliquid quis voluptates, quam corrupti, provident adipisci quae?";

  // const images = [
  //   {
  //     id: "adasd",
  //     url: "https://m.media-amazon.com/images/I/51MD06eYJvL._MCnd_AC_.jpg",
  //   },
  //   {
  //     id: "1wreth",
  //     url: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2023/MISC/STANLEY/CategoryCard_1x_d_Stanley._SY304_CB588619800_.jpg",
  //   },
  // ];

  const incrementQty = () => {
    if (quantity >= stock) return;
    setQuantity((prev) => prev + 1);
  };
  const decrementQty = () => {
    if (quantity <= 1) return;
    setQuantity((prev) => prev - 1);
  };
  const addToCartHandler = () => {
    if (stock <= 0)
      return Toast.show({
        type: "error",
        text1: "Out of stock",
      });
    Toast.show({
      type: "success",
      text1: "Added to cart",
    });
  };

  useEffect(() => {
    dispatch(getProductDetails(params.id));
  }, [dispatch, isFocused, params.id]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary500 }}>
      <View
        style={{
          ...defaultStyles,
          padding: 0,
          backgroundColor: Colors.primary500,
        }}
      >
        <Header back={true}></Header>

        {/* Carousel */}
        <Carousel
          layout="default"
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          ref={isCarousel}
          data={images}
          renderItem={CarouselCardItem}
        ></Carousel>
        <View
          style={{
            backgroundColor: Colors.white,
            padding: 35,
            marginTop: -380,
            flex: 1,
            borderTopLeftRadius: 55,
            borderTopRightRadius: 55,
          }}
        >
          <Text
            numberOfLines={2}
            style={{
              fontSize: 25,
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 900,
            }}
          >
            ${price}
          </Text>
          <Text
            numberOfLines={8}
            style={{
              letterSpacing: 1,
              lineHeight: 20,
              marginVertical: 15,
            }}
          >
            {description}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 5,
            }}
          >
            <Text
              style={{
                color: Colors.gray500,
                fontWeight: 200,
              }}
            >
              Quantity
            </Text>
            <View
              style={{
                width: 80,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Pressable
                style={({ pressed }) => [pressed && { opacity: 0.5 }]}
                onPress={decrementQty}
              >
                <Avatar.Icon icon="minus" {...iconOptions}></Avatar.Icon>
              </Pressable>
              <Text style={styles.quantity}>{quantity}</Text>
              <Pressable
                style={({ pressed }) => [pressed && { opacity: 0.5 }]}
                onPress={incrementQty}
              >
                <Avatar.Icon icon="plus" {...iconOptions}></Avatar.Icon>
              </Pressable>
            </View>
          </View>
          <Pressable
            style={({ pressed }) => [pressed && { opacity: 0.5 }]}
            onPress={addToCartHandler}
          >
            <Button icon="cart" style={styles.btn} textColor={Colors.white}>
              Add To Cart
            </Button>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Image source={{ uri: item.url }} style={styles.image}></Image>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary500,
    width: ITEM_WIDTH,
    paddingVertical: 40,
    height: 380,
  },
  image: {
    width: ITEM_WIDTH,
    height: 250,
    resizeMode: "contain",
  },
  quantity: {
    backgroundColor: Colors.transparent,
    height: 25,
    width: 25,
    textAlignVertical: "center",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.white500,
  },
  btn: {
    backgroundColor: Colors.gray500,
    borderRadius: 100,
    padding: 5,
    marginVertical: 35,
  },
});

const iconOptions = {
  size: 20,
  style: {
    borderRadius: 5,
    backgroundColor: Colors.white500,
    height: 25,
    width: 25,
  },
};

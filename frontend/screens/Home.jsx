import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { defaultStyles } from "../styles/styles";
import Header from "../components/Header";

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={defaultStyles}>
        {/* Header */}
        <Header></Header>
        <View>
          <Text style={{ fontSize: 25 }}>Our</Text>
          <Text style={{ fontSize: 25, fontWeight: 900 }}>Products</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

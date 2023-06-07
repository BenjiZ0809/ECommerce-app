import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { defaultStyles } from "../styles/styles";
import Header from "../components/Header";

const Home = () => {
  return (
    <View style={defaultStyles}>
      <SafeAreaView>
        {/* Header */}
        <Header back={true}></Header>
        <View>
          <Text style={{ fontSize: 25 }}>Our</Text>
          <Text style={{ fontSize: 25, fontWeight: 900 }}>Products</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;

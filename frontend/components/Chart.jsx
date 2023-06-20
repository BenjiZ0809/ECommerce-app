import { View, Text, Dimensions } from "react-native";
import React from "react";
import { PieChart } from "react-native-chart-kit";
import { Colors } from "../styles/styles";

const screenWidth = Dimensions.get("screen").width - 100;

const Chart = ({ inStock = 0, outOfStock = 0 }) => {
  const data = [
    {
      name: "Out of Stock",
      population: outOfStock,
      color: Colors.primary400,
      legendFontColor: Colors.white,
    },
    {
      name: "In Stock",
      population: inStock,
      color: Colors.primary300,
      legendFontColor: Colors.white,
    },
  ];

  const chartConfig = {
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };

  return (
    <View>
      <PieChart
        data={data}
        width={screenWidth}
        height={150}
        chartConfig={chartConfig}
        accessor={"population"}
        backgroundColor={Colors.gray500}
        paddingLeft={"15"}
        center={[0, 0]}
        absolute
      ></PieChart>
    </View>
  );
};

export default Chart;

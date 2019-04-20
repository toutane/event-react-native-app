import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from "../components/views/HomeScreen";

const HomeStackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    }
  },
  {
    navigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#000"
      }
    }
  }
);

export default createAppContainer(HomeStackNavigator);

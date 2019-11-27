import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import EditView from "../components/profile/EditView";

const ProfileScreenNavigator = createStackNavigator(
  {
    EditView: { screen: EditView }
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

export default createAppContainer(ProfileScreenNavigator);

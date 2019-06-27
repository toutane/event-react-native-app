import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

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

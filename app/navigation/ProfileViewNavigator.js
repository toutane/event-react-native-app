import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import ProfileView from "../components/profile/ProfileView";

const ProfileViewNavigator = createStackNavigator(
  {
    ProfileView: { screen: ProfileView }
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

export default createAppContainer(ProfileViewNavigator);

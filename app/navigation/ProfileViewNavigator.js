import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

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

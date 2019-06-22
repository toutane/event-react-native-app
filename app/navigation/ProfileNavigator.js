import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import ProfileView from "../components/profile/ProfileView";
import FriendsList from "../components/profile/FriendsList";

const ProfileNavigator = createStackNavigator(
  {
    ProfileView: { screen: ProfileView },
    FriendsList: { screen: FriendsList }
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

export default createAppContainer(ProfileNavigator);

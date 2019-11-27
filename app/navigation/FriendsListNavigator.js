import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import FriendsList from "../components/profile/FriendsList";

const FriendsListNavigator = createStackNavigator(
  {
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

export default createAppContainer(FriendsListNavigator);

import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import FollowRequestScreen from "../components/notifications/FollowRequest/FollowRequestScreen";

const NotificationNavigator = createStackNavigator(
  {
    FollowRequestScreen: { screen: FollowRequestScreen }
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

export default createAppContainer(NotificationNavigator);

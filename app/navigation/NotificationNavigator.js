import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import NotificationsScreen from "../components/views/NotificationsScreen";

const NotificationNavigator = createStackNavigator(
  {
    NotificationsScreen: { screen: NotificationsScreen }
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

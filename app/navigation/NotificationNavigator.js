import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import NotificationsView from "../components/notifications/NotificationsView";

const NotificationNavigator = createStackNavigator(
  {
    NotificationsView: { screen: NotificationsView }
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

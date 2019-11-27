import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import EventView from "../components/Events/EventView/EventView";

const EventViewNavigator = createStackNavigator(
  {
    EventView: { screen: EventView }
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

export default createAppContainer(EventViewNavigator);

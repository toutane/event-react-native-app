import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import EventView from "../components/Events/EventView/EventView";

const EventNavigator = createStackNavigator(
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

export default createAppContainer(EventNavigator);

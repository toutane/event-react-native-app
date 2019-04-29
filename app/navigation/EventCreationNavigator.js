import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import EventCreationView from "../components/Events/EventCreation/EventCreationView";

const EventCreationNavigator = createStackNavigator(
  {
    EventCreationView: { screen: EventCreationView }
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

export default createAppContainer(EventCreationNavigator);

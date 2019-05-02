import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import EventCreationView from "../components/Events/EventCreation/EventCreationView";
import LocationPicker from "../components/Events/EventCreation/LocationPicker";
import ECUsersList from "../components/Events/EventCreation/ECUsersList";
const EventCreationNavigator = createStackNavigator(
  {
    EventCreationView: { screen: EventCreationView },
    LocationPicker: { screen: LocationPicker },
    EventCreation_UsersList: { screen: ECUsersList }
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

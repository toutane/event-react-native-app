import React from "react";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";

import { theme } from "../themes";

import TabBar from "../components/TabBar";
import TabIcon from "../components/TabBar/TabIcon";

import EventViewNavigator from "./EventViewNavigator";
import EventCreationNavigator from "./EventCreationNavigator";
import NotificationNavigator from "./NotificationNavigator";

import HomeScreen from "../components/views/HomeScreen";
import MessageScreen from "../components/views/MessageScreen";
import NotificationsScreen from "../components/views/NotificationsScreen";
import ProfileScreen from "../components/views/ProfileScreen";

const tabBar = {
  Chat: {
    screen: MessageScreen,
    navigationOptions: {
      tabBarLabel: "Chat",
      tabBarIcon: props => <TabIcon iconName="message-circle" {...props} />
    }
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: props => <TabIcon iconName="grid" {...props} />
    }
  },
  Notification: {
    screen: NotificationsScreen,
    navigationOptions: {
      tabBarLabel: "Bell",
      tabBarIcon: props => <TabIcon iconName="bell" {...props} />
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: "Profile",
      tabBarIcon: props => <TabIcon iconName="user" {...props} />
    }
  }
};

const tabBarConfig = {
  tabBarComponent: props => (
    <TabBar
      tabColors={[
        theme.tabColors.home,
        theme.tabColors.message,
        theme.tabColors.profile,
        theme.tabColors.settings
      ]}
      {...props}
    />
  ),
  // initialRouteName: "Home",
  // initialRouteName: "Notification",
  initialRouteName: "Profile",

  tabBarOptions: {
    inactiveTintColor: theme.colors.inactiveColor
  }
};

const TabBarNavigator = createBottomTabNavigator(tabBar, tabBarConfig);

const AppNavigator = createStackNavigator(
  {
    TabBar: TabBarNavigator,
    EventView: EventViewNavigator,
    EventCreation: EventCreationNavigator,
    NotificationNavigator: NotificationNavigator
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
export default createAppContainer(AppNavigator);

import React from "react";
import { createAppContainer, createBottomTabNavigator } from "react-navigation";

import { theme } from "../themes";

import TabBar from "../components/TabBar";
import TabIcon from "../components/TabBar/TabIcon";

import HomeScreen from "../components/views/HomeScreen";
import MessageScreen from "../components/views/MessageScreen";
import ProfileScreen from "../components/views/ProfileScreen";
import SettingsScreen from "../components/views/MessageScreen";

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
      tabBarIcon: props => <TabIcon iconName="home" {...props} />
    }
  },
  // Settings: {
  //   screen: SettingsScreen,
  //   navigationOptions: {
  //     tabBarLabel: "Settings",
  //     tabBarIcon: props => <TabIcon iconName="bell" {...props} />
  //   }
  // },
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
  initialRouteName: "Home",
  tabBarOptions: {
    inactiveTintColor: theme.colors.inactiveColor
  }
};

export default createAppContainer(
  createBottomTabNavigator(tabBar, tabBarConfig)
);

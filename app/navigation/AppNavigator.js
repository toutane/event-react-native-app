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
import ProfileViewNavigator from "./ProfileViewNavigator";
import ProfileScreenNavigator from "./ProfileScreenNavigator";
import FriendsListNavigator from "./FriendsListNavigator";

import HomeScreen from "../components/views/HomeScreen";
import ExploreScreen from "../components/views/ExploreScreen";
import NotificationsScreen from "../components/views/NotificationsScreen";
import ProfileScreen from "../components/views/ProfileScreen";

const tabBar = {
  Explore: {
    screen: ExploreScreen,
    navigationOptions: {
      tabBarLabel: "Explore",
      tabBarIcon: props => <TabIcon iconName="search" {...props} />
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
  // initialRouteName: "Explore",
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
    NotificationNavigator: NotificationNavigator,
    ProfileScreenNavigator: ProfileScreenNavigator,
    ProfileViewNavigator: ProfileViewNavigator,
    FriendsListNavigator: FriendsListNavigator
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
export default createAppContainer(AppNavigator);

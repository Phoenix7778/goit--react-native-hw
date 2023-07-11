import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Icon from "react-native-vector-icons/AntDesign";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import PostsScreen from "./Screens/PostsScreen";
import CreatePostsScreen from "./Screens/CreatePostsScreen";
import ProfileScreen from "./Screens/ProfileScreen";

const AuthStack = createStackNavigator(
  {
    Registration: {
      screen: RegistrationScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: "Registration",
  }
);

const AppStack = createBottomTabNavigator(
  {
    Posts: {
      screen: PostsScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            name={focused ? "home" : "home"}
            size={24}
            color={focused ? "#FF6C00" : "#C4C4C4"}
          />
        ),
      },
    },
    CreatePost: {
      screen: CreatePostsScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            name={focused ? "plus" : "plus"}
            size={24}
            color={focused ? "#FF6C00" : "#C4C4C4"}
          />
        ),
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            name={focused ? "user" : "user"}
            size={24}
            color={focused ? "#FF6C00" : "#C4C4C4"}
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: "#FF6C00",
      inactiveTintColor: "#C4C4C4",
      style: {
        backgroundColor: "#FFFFFF",
      },
    },
  }
);

const AppNavigator = createStackNavigator(
  {
    Auth: AuthStack,
    Home: AppStack,
  },
  {
    initialRouteName: "Auth",
    headerMode: "none",
  }
);

export default createAppContainer(AppNavigator);

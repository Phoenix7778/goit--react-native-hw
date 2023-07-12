import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SvgArrowLeft from "../assets/svg/SvgArrowLeft";
import SvgLogOut from "../assets/svg/SvgLogOut";
import SvgGrid from "../assets/svg/SvgGrid";
import SvgPlus from "../assets/svg/SvgPlus";
import SvgUser from "../assets/svg/SvgUser";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

const BottomTabs = createBottomTabNavigator();

const Home = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 64,
          paddingTop: 10,
          paddingBottom: 20,
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarOptions: {
          showLabel: false,
          activeTintColor: "#ff6c00",
          inactiveTintColor: "#212121",
        },
      }}
    >
      <BottomTabs.Screen
        name="Posts"
        component={PostsScreen}
        options={({ navigation }) => ({
          title: "Публікації",
          headerStyle: styles.headerStyle,
          headerTintColor: "#212121",
          headerTitleStyle: styles.headerTitleStyle,
          headerRight: () => (
            <SvgLogOut
              onPress={() => navigation.navigate("Login")}
              title="Return back"
              color="#fff"
              style={styles.logOut}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity {...props} style={styles.btnTab} />
          ),
          tabBarIcon: ({ color }) => <SvgGrid stroke={color} />,
        })}
      />
      <BottomTabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          title: "Створити публікацію",
          headerStyle: styles.headerStyle,
          headerTintColor: "#212121",
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <SvgArrowLeft
              onPress={() => navigation.navigate("Posts")}
              title="Return back"
              color="#fff"
              style={styles.arrowLeft}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={{ ...styles.btnTab, backgroundColor: "#ff6c00" }}
            />
          ),
          tabBarIcon: () => <SvgPlus fill={"#ffffff"} />,
        })}
      />
      <BottomTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: "Профіль",
          headerStyle: styles.headerStyle,
          headerTintColor: "#212121",
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <SvgArrowLeft
              onPress={() => navigation.navigate("Posts")}
              title="Return back"
              color="#fff"
              style={styles.arrowLeft}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={{ ...styles.btnTab, marginRight: 0 }}
            />
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <SvgUser size={size} fill={color} />
          ),
        })}
      />
    </BottomTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    boxShadow: "0px 0.5px 0px rgba(0, 0, 0, 0.3)",
  },
  headerTitleStyle: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 17,
    lineHeight: 22,
    textAlign: "center",
    marginLeft: 120,
  },
  arrowLeft: {
    marginLeft: 16,
    marginRight: 42,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  logOut: {
    width: 24,
    height: 24,
    marginRight: 16,
    paddingVertical: 10,
  },
  btnTab: {
    alignSelf: "center",
    marginRight: 30,
    width: 40,
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: "#ffffff",
    borderRadius: 20,
  },
});

export default Home;

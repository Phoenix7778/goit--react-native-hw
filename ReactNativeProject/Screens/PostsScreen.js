import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";

import DefaultScreenPosts from "./DefaultScreenPosts";
import MapScreen from "./MapScreen";
import CommentsScreen from "./CommentsScreen";
import { logout } from "../redux/auth/operations";

const Stack = createStackNavigator();

const PostsScreen = () => {
  const dispatch = useDispatch();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerRight: () => (
          <TouchableOpacity onPress={() => dispatch(logout())}>
            <Feather
              name="log-out"
              size={24}
              color="#BDBDBD"
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        ),
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
      }}
    >
      <Stack.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{
          title: "Posts",
        }}
      />
      <Stack.Screen name="Comments" component={CommentsScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#FFFFFF",
  },
  headerTitleStyle: {
    fontWeight: "bold",
  },
});

export default PostsScreen;

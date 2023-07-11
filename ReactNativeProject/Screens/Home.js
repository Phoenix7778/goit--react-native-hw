import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PostsScreen from "./PostsScreen";
import MapScreen from "./MapScreen";
import CommentsScreen from "./CommentsScreen";

import { Feather } from "@expo/vector-icons";

const Stack = createStackNavigator();

const Home = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PostsScreen" component={PostsScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen
        name="Коментарі"
        component={CommentsScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Feather
              name="arrow-left"
              size={24}
              color="#212121"
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default Home;

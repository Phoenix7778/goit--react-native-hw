import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";

import PostsScreen from "../Screens/PostsScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import CreatePostsScreen from "../Screens/CreatePostsScreen";

const MainTab = createBottomTabNavigator();

const CreateTabNav = () => {
  const navigation = useNavigation();

  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerTitleAlign: "center",
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather
              name="grid"
              size={focused ? 13 : 24}
              color={focused ? "#ffffff" : "#212121"}
              backgroundColor={focused ? "#FF6C00" : "transparent"}
              style={{
                paddingHorizontal: focused ? 25 : undefined,
                paddingVertical: focused ? 13 : undefined,
                borderRadius: 100,
              }}
            />
          ),
          headerShown: false,
        }}
      />
      <MainTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather
              name="plus"
              size={focused ? 13 : 24}
              color={focused ? "#ffffff" : "#212121"}
              backgroundColor={focused ? "#FF6C00" : "transparent"}
              style={{
                paddingHorizontal: focused ? 30 : undefined,
                paddingVertical: focused ? 13 : undefined,
                borderRadius: 100,
              }}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
              <Feather
                name="arrow-left"
                size={24}
                color="#BDBDBD"
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          ),
          unmountOnBlur: true,
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather
              name="user"
              size={focused ? 13 : 24}
              color={focused ? "#ffffff" : "#212121"}
              backgroundColor={focused ? "#FF6C00" : "transparent"}
              style={{
                paddingHorizontal: focused ? 30 : undefined,
                paddingVertical: focused ? 13 : undefined,
                borderRadius: 100,
              }}
            />
          ),
          headerShown: false,
        }}
      />
    </MainTab.Navigator>
  );
};

export default CreateTabNav;

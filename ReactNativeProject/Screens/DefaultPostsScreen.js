import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import PostsItem from "../components/PostsItem";
import ImgAvatar from "../assets/img/avatar.png";

const DefaultPostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([
    {
      id: "123qwe",
      postImg: "../assets/img/forest.png",
      postName: "Ліс",
      postAddress: "Ivano-Frankivs'k Region, Ukraine",
      postLocation: {
        latitude: 48.93398618586138,
        longitude: 24.596278724618724,
      },
    },
  ]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevPosts) => [...prevPosts, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image source={ImgAvatar} style={styles.avatarImg} />
        <View>
          <Text style={styles.avatarName}>Natali Romanova</Text>
          <Text style={styles.avatarEmail}>email@example.com</Text>
        </View>
      </View>
      <FlatList
        style={styles.postsWrapper}
        data={posts}
        renderItem={({ item }) => (
          <PostsItem
            postName={item.postName}
            postImg="../assets/img/avatar.png"
            postAddress={item.postAddress}
            postLocation={item.postLocation}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.navTabs} />
    </View>
  );
};

export default DefaultPostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#fff",
  },
  avatarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  avatarImg: {
    width: 60,
    height: 60,
    marginRight: 8,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  avatarName: {
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  avatarEmail: {
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
  postsWrapper: {
    flex: 1,
  },
});

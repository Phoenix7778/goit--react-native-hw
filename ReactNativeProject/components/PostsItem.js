import React from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import SvgLocation from "../assets/svg/SvgLocation";
import SvgComment from "../assets/svg/SvgComment";
import ImgForest from "../assets/img/forest.png";

const PostsItem = ({ postImg, postName, postAddress, postLocation }) => {
  const navigation = useNavigation();

  const handleCommentsPress = () => {
    navigation.navigate("Comments", { postImg });
  };

  const handleLocationPress = () => {
    navigation.navigate("Map", { postLocation });
  };

  return (
    <View style={styles.postItem}>
      <Image style={styles.postImg} source={ImgForest} />
      <Text style={styles.postTitle}>{postName}</Text>
      <View style={styles.postsAdditionWrapper}>
        <TouchableOpacity style={styles.comment} onPress={handleCommentsPress}>
          <SvgComment />
          <Text style={styles.commentText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.location} onPress={handleLocationPress}>
          <SvgLocation />
          <Text style={styles.locationText}>{postAddress}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostsItem;

const styles = StyleSheet.create({
  postItem: {
    marginBottom: 32,
  },
  postImg: {
    height: 240,
    maxWidth: 343,
    marginBottom: 8,
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
  },
  postTitle: {
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 8,
    color: "#212121",
  },
  postsAdditionWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  commentText: {
    fontFamily: "Roboto",
    fontSize: 16,
    marginLeft: 6,
    color: "#bdbdbd",
  },
  locationText: {
    fontFamily: "Roboto",
    fontSize: 16,
    textDecorationLine: "underline",
    marginLeft: 4,
    color: "#212121",
  },
});

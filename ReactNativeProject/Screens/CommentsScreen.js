import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

const CommentsScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.userName}>{item.userName}</Text>
      <Text>{item.comment}</Text>
    </View>
  );

  const [comment, setComment] = React.useState("");

  return (
    <View style={styles.container}>
      <View style={styles.postWrapper}>
        <Image source={{ uri: photo }} style={styles.post} />
        <SafeAreaView style={styles.wrapper}>
          <FlatList renderItem={renderItem} />
        </SafeAreaView>
      </View>

      <TextInput
        placeholderTextColor="#BDBDBD"
        placeholder="Написати коментарій..."
        style={styles.input}
        value={comment}
        onChangeText={setComment}
      />

      <TouchableOpacity style={styles.button}>
        <AntDesign name="arrowup" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  wrapper: {
    height: 280,
  },
  commentContainer: {
    padding: 16,
    marginBottom: 24,
    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderColor: "rgba(0, 0, 0, 0.03)",
    borderWidth: 1,
  },
  post: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
    padding: 16,
    height: 50,
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 18,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  userName: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 13,
    lineHeight: 18,
    color: "#BDBDBD",
  },
  button: {
    position: "absolute",
    left: "84%",
    top: "85.5%",
    marginHorizontal: 25,
    marginTop: 32,
    marginBottom: 30,
    backgroundColor: "#FF6C00",
    height: 35,
    width: 35,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CommentsScreen;

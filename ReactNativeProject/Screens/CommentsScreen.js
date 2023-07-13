import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  Platform,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import SvgArrowLeft from "../assets/svg/SvgArrowLeft";
import CommentItem from "../components/CommentItem";

const CommentsScreen = ({ navigation, route: { params } }) => {
  const isFocused = useIsFocused();

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    {
      autorAvatar: "",
      comment: "Comment 1sknnn",
      date: "09 червня, 2020 | 08:40",
    },
    {
      autorAvatar: "",
      comment: "Comment 2sknnn",
      date: "09 червня, 2020 | 08:40",
    },
    {
      autorAvatar: "",
      comment: "Comment 3sknnn",
      date: "09 червня, 2020 | 08:40",
    },
  ]);

  useEffect(() => {
    if (isFocused) {
      navigation?.getParent()?.setOptions({
        tabBarStyle: { display: "none" },
        headerShown: false,
      });
    }
  }, []);

  const handleAddComment = () => {
    if (!commentText.trim()) {
      return console.warn("Будь ласка напишіть коментар");
    }
    const data = {
      autorAvatar: "",
      comment: commentText,
      date: "09 червня, 2020 | 08:40",
    };

    setComments((prevComments) => [...prevComments, data]);
    handleKeyboardHide();
    setCommentText("");
  };

  const handleKeyboardHide = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboardHide}>
      <View style={styles.container}>
        <Image style={styles.postImg} source={{ uri: params.postImg }} />
        <FlatList
          style={styles.commentList}
          data={comments}
          renderItem={({ item }) => (
            <CommentItem
              comment={item.comment}
              date={item.date}
              autorAvatar={item.autorAvatar}
            />
          )}
          keyExtractor={(item, idx) => idx.toString()}
          contentContainerStyle={{ paddingBottom: 28 }}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <View style={styles.inputCommentWrapper}>
            <TextInput
              style={styles.commentInput}
              placeholder="Коментувати..."
              placeholderTextColor="#bdbdbd"
              autoCompleteType="off"
              value={commentText}
              onChangeText={setCommentText}
            />
            <TouchableOpacity
              style={styles.commentBtn}
              onPress={handleAddComment}
            >
              <SvgArrowLeft style={styles.svgArrow} stroke="#ffffff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#fff",
  },
  postImg: {
    height: 240,
    width: "100%",
    marginBottom: 28,
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
  },
  commentList: {
    maxHeight: 312,
    marginBottom: 28,
  },
  inputCommentWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 16,
    backgroundColor: "#f6f6f6",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRadius: 100,
  },
  commentBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#ff600c",
    borderRadius: 100,
    marginLeft: 8,
  },
  svgArrow: {
    height: 10,
    width: 10,
    transform: [{ rotate: "90deg" }],
  },
});

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";

const CreatePostsScreen = () => {
  const [comment, setComment] = React.useState("");
  const [locationName, setLocationName] = React.useState("");

  const sendPhoto = () => {
    // Function
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Загрузити фото</Text>

      <TextInput
        placeholderTextColor="#BDBDBD"
        placeholder="Назва..."
        style={styles.input}
        value={comment}
        onChangeText={setComment}
      />

      <TextInput
        placeholderTextColor="#BDBDBD"
        placeholder="Місцевість..."
        style={styles.inputLocation}
        value={locationName}
        onChangeText={setLocationName}
      />

      <TouchableOpacity style={styles.buttonActive} onPress={sendPhoto}>
        <Text style={styles.buttonTextActive}>Опубліковати</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteBtn} activeOpacity={0.8}>
        <Feather name="trash-2" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  text: {
    marginTop: 8,
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginBottom: 32,
  },
  input: {
    borderBottomWidth: 1,
    fontSize: 16,
    borderBottomColor: "#E8E8E8",
    paddingTop: 15,
    paddingBottom: 16,
    fontFamily: "RobotoMedium",
    color: "#212121",
  },
  inputLocation: {
    marginTop: 16,
    borderBottomWidth: 1,
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    borderBottomColor: "#E8E8E8",
    paddingTop: 15,
    paddingBottom: 16,
    paddingLeft: 26,
  },
  buttonActive: {
    marginTop: 32,
    backgroundColor: "#FF6C00",
    height: 61,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextActive: {
    color: "#fff",
  },
  deleteBtn: {
    marginTop: 120,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: 70,
    height: 40,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
  },
};

export default CreatePostsScreen;

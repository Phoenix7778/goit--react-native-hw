import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/photo-BG-2x.jpg")}
        style={styles.image}
      >
        <View style={styles.wrapper}>
          <View style={styles.userInfo}>
            <View style={styles.imgBox}>
              <Image
                style={styles.avatar}
                source={require("../../assets/avatar.png")}
              />
            </View>
            <Text style={styles.name}>userName</Text>
          </View>
          <View style={styles.postsList}>
            <FlatList
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View>
                  <Image source={{ uri: item.photo }} style={styles.post} />
                  <Text style={styles.title}>{item.comment}</Text>
                </View>
              )}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  wrapper: {
    marginTop: 250,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  userInfo: {
    flexDirection: "row",
    marginTop: 32,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  imgBox: {
    position: "absolute",
    left: "35%",
    top: "-100%",
    width: 120,
    height: 120,
    backgroundColor: "#E8E8E8",
    marginRight: 8,
    borderRadius: 16,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontFamily: "RobotoMedium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
  },
  postsList: {
    marginBottom: 120,
  },
  post: {
    height: 240,
    width: "100%",
    borderRadius: 8,
  },
  title: {
    marginTop: 8,
    marginBottom: 8,
    fontFamily: "RobotoMedium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
});

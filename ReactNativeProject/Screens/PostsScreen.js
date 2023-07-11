import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

const PostsScreen = ({ navigation }) => {
  const handleLogout = () => {
    // logout();
  };

  const renderItem = ({ item }) => (
    <View>
      <Image source={{ uri: item.photo }} style={styles.post} />
      <View>
        <Text style={styles.title}>{item.comment}</Text>
      </View>
      <View style={styles.box}>
        <View style={styles.commentWrapper}>
          <TouchableOpacity>
            <Feather name="message-circle" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={styles.commentsCount}>
            {commentsCount[item.id] || 0}
          </Text>
        </View>
        <View style={styles.wrapperLocation}>
          <TouchableOpacity>
            <Ionicons name="location-outline" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.locationName}>{item.locationName}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Posts</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#FF6C00" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={postsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#212121",
  },
  post: {
    height: 240,
    width: "100%",
    borderRadius: 8,
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    marginTop: 8,
    marginBottom: 8,
    fontFamily: "RobotoMedium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  commentWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentsCount: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginLeft: 9,
  },
  wrapperLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationName: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },
});

export default PostsScreen;

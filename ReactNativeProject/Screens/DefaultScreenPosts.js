import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";

import db from "../firebase/config";
import { selectUser } from "../redux/auth/selectors";

const DefaultScreenPosts = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const { avatar, login, email } = useSelector(selectUser);

  useEffect(() => {
    const unsubscribe = db
      .firestore()
      .collection("posts")
      .onSnapshot((snapshot) => {
        const updatedPosts = snapshot.docs.map((doc) => {
          const post = doc.data();
          post.id = doc.id;
          post.comments = [];
          return post;
        });

        setPosts(updatedPosts);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLike = async (postId) => {
    const currentUser = db.auth().currentUser;

    const postRef = db.firestore().collection("posts").doc(postId);
    const post = posts.find((item) => item.id === postId);
    const hasLiked = post.likes && post.likes[currentUser.uid];

    try {
      if (hasLiked) {
        await postRef.update({
          [`likes.${currentUser.uid}`]: db.firestore.FieldValue.delete(),
        });
      } else {
        await postRef.update({
          [`likes.${currentUser.uid}`]: true,
        });
      }
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  console.log("posts ---->", posts);

  return (
    <View style={styles.container}>
      <View style={styles.profileBox}>
        <Image source={{ uri: avatar }} style={styles.loadPhoto} />
        <View style={styles.profileInfo}>
          <Text style={styles.login}>{login}</Text>
          <Text>{email}</Text>
        </View>
      </View>
      <SafeAreaView style={styles.flatListContainer}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("Comments", { item })}
            >
              <Image style={styles.image} source={{ uri: item.photo }} />
              <Text style={styles.title}>{item.name}</Text>
              <View style={styles.actionContainer}>
                <View style={styles.commentContainer}>
                  <Feather
                    name="message-circle"
                    size={24}
                    color={item.comments.length === 0 ? "#BDBDBD" : "#FF6C00"}
                    style={styles.commentIcon}
                  />
                  <Text style={styles.commentCount}>
                    {item.comments.length}
                  </Text>
                </View>
                <View style={styles.likeContainer}>
                  <Feather
                    name="thumbs-up"
                    size={24}
                    color={
                      item.likes && Object.keys(item.likes).length
                        ? "#FF6C00"
                        : "#BDBDBD"
                    }
                    onPress={() => handleLike(item.id)}
                  />
                  <Text style={styles.likeCount}>
                    {item.likes ? Object.keys(item.likes).length : 0}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.locationContainer}
                  onPress={() => navigation.navigate("Map", { item })}
                >
                  <Feather name="map-pin" size={24} color="#BDBDBD" />
                  <Text style={styles.locationText}>
                    {`${item.location.region}, ${item.location.country}`}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  profileBox: {
    flexDirection: "row",
    marginTop: 32,
    marginHorizontal: 16,
  },
  loadPhoto: {
    width: 60,
    height: 60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  profileInfo: {
    marginLeft: 8,
    marginTop: 8,
  },
  login: {
    color: "#212121",
    fontSize: 13,
    fontWeight: "bold",
  },
  flatListContainer: {
    marginTop: 32,
    marginBottom: 80,
  },
  card: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 34,
  },
  image: {
    height: 400,
    borderRadius: 8,
  },
  title: {
    color: "#212121",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 5,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  commentIcon: {
    transform: [{ rotate: "-90deg" }],
  },
  commentCount: {
    color: "#BDBDBD",
    fontSize: 16,
  },
  likeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  likeCount: {
    color: "#BDBDBD",
    fontSize: 16,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#1B4371",
    color: "#212121",
    marginLeft: 8,
  },
});

export default DefaultScreenPosts;

import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import db from "../firebase/config";
import { selectUser } from "../redux/auth/selectors";

const CommentsScreen = ({ route }) => {
  const postId = route.params.item.id;

  const [picture, setPicture] = useState(null);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const date = new Date().toLocaleString("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const { login, avatar } = useSelector(selectUser);

  const createComment = async () => {
    await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ comment, login, date, avatar });

    setComment("");
  };

  const getAllComments = async () => {
    await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot((snapshot) => {
        const comments = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllComments(comments);
      });
  };

  useEffect(() => {
    getAllComments();
  }, []);

  useEffect(() => {
    if (route.params && route.params.item) {
      setPicture(route.params.item.photo);
    }
  }, [route.params]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Image style={styles.image} source={{ uri: picture }} />
        </View>
        <View style={styles.contentContainer}>
          <SafeAreaView style={{ flex: 1 }}>
            <FlatList
              data={allComments}
              renderItem={({ item }) => (
                <View style={styles.commentContainer}>
                  <Image
                    source={{ uri: item.avatar }}
                    style={styles.loadPhoto}
                  />
                  <View style={styles.commentBox}>
                    <Text style={styles.commentText}>{item.comment}</Text>
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>

          <View style={{ ...styles.button, bottom: isShowKeyboard ? 50 : 10 }}>
            <TextInput
              onFocus={() => setIsShowKeyboard(true)}
              onBlur={() => setIsShowKeyboard(false)}
              value={comment}
              onChangeText={setComment}
              placeholder="Коментувати..."
              style={{ width: "100%" }}
            />
            <TouchableOpacity
              style={styles.buttonIconBox}
              onPress={createComment}
            >
              <AntDesign name="arrowup" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  card: {
    height: 250,
  },
  loadPhoto: {
    width: 28,
    height: 28,
    backgroundColor: "#F6F6F6",
    borderRadius: 50,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  button: {
    position: "absolute",
    width: "100%",
    padding: 16,
    borderRadius: 100,
    backgroundColor: "#BDBDBD",
  },
  buttonIconBox: {
    position: "absolute",
    bottom: 13,
    right: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    borderRadius: 50,
  },
  commentContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 16,
  },
  commentBox: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
    paddingVertical: 16,
    marginBottom: 10,
  },
  commentText: {
    color: "#212121",
    fontSize: 13,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  dateText: {
    fontSize: 10,
    color: "#BDBDBD",
    marginLeft: "auto",
    marginRight: 60,
    paddingBottom: 20,
  },
});

export default CommentsScreen;

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from "react-native";
import { Camera } from "expo-camera";
import { Fontisto, Feather, Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { selectUser } from "../redux/auth/selectors";
import { db, storage } from "../firebase/config";

const CreatePostsScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState(null);
  const [geolocation, setGeolocation] = useState(null);

  const { userId, login } = useSelector(selectUser);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      } else {
        const location = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setGeolocation(coords);

        const detailAddress = await Location.reverseGeocodeAsync(coords);
        const { region, country } = detailAddress[0];
        setLocation({ region, country });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const addImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const closeImage = () => {
    setImage(null);
  };

  const takePhoto = async () => {
    try {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.saveToLibraryAsync(uri);
      setPhoto(uri);
    } catch (error) {
      console.log(error.message);
    }
  };

  const sendPost = async () => {
    await uploadPostToServer();

    navigation.navigate("DefaultScreen");

    setName("");
    setLocation("");
  };

  const deletePost = () => {
    setName("");
    setLocation("");
    setImage(null);
  };

  const uploadPostToServer = async () => {
    const photoUrl = await uploadPhotoToServer();

    await db.collection("posts").add({
      photo: photoUrl,
      name,
      location,
      geolocation,
      userId,
      login,
    });
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo || image);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();
    const uploadTask = storage.ref(`postImage/${uniquePostId}`).put(file);
    await uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.log(error.message);
      },
      async () => {
        const processedPhoto = await storage
          .ref("postImage")
          .child(uniquePostId)
          .getDownloadURL();
        return processedPhoto;
      }
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.containerCamera}>
          <Camera style={styles.camera} ref={setCameraRef} type={type}>
            <View style={styles.containerImage}>
              {photo && (
                <Image
                  source={{ uri: photo }}
                  style={{ width: 100, height: 100, borderRadius: 10 }}
                />
              )}
            </View>

            {!image && (
              <TouchableOpacity
                style={{
                  ...styles.containerSnap,
                  backgroundColor: photo
                    ? "rgba(255, 255, 255, 0.30)"
                    : "#FFFFFF",
                }}
                onPress={takePhoto}
              >
                <Fontisto
                  name="camera"
                  size={24}
                  color={photo ? "#FFFFFF" : "#BDBDBD"}
                />
              </TouchableOpacity>
            )}

            {!image && (
              <TouchableOpacity
                style={styles.containerToggleTypeCamera}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Ionicons name="md-camera-reverse" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </Camera>
          {image && (
            <ImageBackground
              source={{ uri: image }}
              style={{
                width: "100%",
                height: "66%",
                position: "absolute",
              }}
            />
          )}
          <View style={styles.containerLoadImage}>
            <TouchableOpacity onPress={!image ? addImage : closeImage}>
              <Text style={{ color: "#BDBDBD", marginBottom: 20 }}>
                {photo || image ? "Редагувати фото" : "Завантажте фото"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.form}>
            <View style={styles.input}>
              <TextInput
                placeholder="Назва..."
                value={name}
                onChangeText={setName}
                style={{ width: "100%" }}
              />
            </View>
            <View style={styles.input}>
              <Feather
                name="map-pin"
                size={24}
                color="#BDBDBD"
                style={{ paddingRight: 4 }}
              />
              <TextInput
                value={
                  location ? `${location.region}, ${location.country}` : ""
                }
                placeholder="Місцевість..."
                style={{ width: "100%" }}
              />
            </View>
            <TouchableOpacity
              style={{
                ...styles.button,
                backgroundColor:
                  (photo || image) && name && location && geolocation
                    ? "#FF6C00"
                    : "#BDBDBD",
              }}
              onPress={sendPost}
              disabled={!(photo || image) || !name || !location || !geolocation}
            >
              <Text style={styles.textButton}>Опублікувати</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.bgIcon} onPress={deletePost}>
            <Feather name="trash-2" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  containerCamera: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 8,
    overflow: "hidden",
  },
  camera: {
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  containerSnap: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "transparent",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  containerToggleTypeCamera: {
    position: "absolute",
    bottom: 8,
    right: 8,
  },
  containerImage: {
    position: "absolute",
    top: 3,
    left: 3,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 10,
  },
  containerLoadImage: {
    marginTop: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
    borderStyle: "solid",
    marginVertical: 10,
    paddingVertical: 15,
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    padding: 16,
    borderRadius: 100,
    marginTop: 23,
  },
  textButton: {
    color: "#ffffff",
  },
  bgIcon: {
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#BDBDBD",
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    marginBottom: 34,
  },
});

export default CreatePostsScreen;

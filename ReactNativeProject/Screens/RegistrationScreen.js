import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const RegistrationScreen = ({ onLogin }) => {
  const [hidePass, setHidePass] = useState(true);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    onLogin();
  };

  const signIn = () => {
    console.debug("Welcome!");
  };

  const addImage = async () => {
    console.debug("add image");
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      let filename = result?.assets[0].uri.split("/").pop();

      delete result.cancelled;
      result = {
        ...result,
        name: filename,
      };
    }
  };

  const handleKeyboardBehavior = () =>
    Platform.select({ ios: "padding", android: "height" });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          resizeMode="cover"
          source={require("../assets/PhotoBG.jpg")}
          style={styles.imageBg}
        >
          <View style={styles.containerRegisterForm}>
            <View style={styles.inputBox}>
              <View></View>
              <Text style={styles.title}>Реєстрація</Text>
              <KeyboardAvoidingView behavior={handleKeyboardBehavior()}>
                <TextInput
                  style={styles.input}
                  placeholder="Логін"
                  value={login}
                  onChangeText={setLogin}
                />
              </KeyboardAvoidingView>
              <KeyboardAvoidingView behavior={handleKeyboardBehavior()}>
                <TextInput
                  style={styles.input}
                  placeholder="Адреса електронної пошти"
                  autoCompleteType="email"
                  value={email}
                  onChangeText={setEmail}
                />
              </KeyboardAvoidingView>
              <View>
                <KeyboardAvoidingView behavior={handleKeyboardBehavior()}>
                  <TextInput
                    style={styles.input}
                    placeholder="Пароль"
                    autoCompleteType="password"
                    secureTextEntry={hidePass}
                    value={password}
                    onChangeText={setPassword}
                  />
                </KeyboardAvoidingView>
                <Text
                  style={styles.textLookPassword}
                  onPress={() => setHidePass(!hidePass)}
                >
                  Показати
                </Text>
              </View>

              <TouchableOpacity style={styles.button} onPress={signIn}>
                <Text style={styles.textButton} onPress={handleLogin}>
                  Зареєструватися
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.text}>Уже є аккаунт? Увійти</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.loadPhoto}>
            <TouchableOpacity style={styles.addIcon} onPress={addImage}>
              <Icon name="plus" color="#FF6C00" size={20} />
            </TouchableOpacity>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 120, height: 120 }}
              />
            )}
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBg: {
    flex: 1,
    justifyContent: "flex-end",
  },
  containerRegisterForm: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: "#212121",
    marginBottom: 22,
  },
  inputBox: {
    padding: 16,
    paddingTop: 92,
    paddingBottom: 66,
    width: "100%",
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  text: {
    textAlign: "center",
    marginTop: 16,
  },
  loadPhoto: {
    position: "absolute",
    top: 150,
    right: 140,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addIcon: {
    position: "absolute",
    right: -10,
    bottom: 20,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "#FF6C00",
    borderWidth: 1,
    backgroundColor: "#ffffff",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    marginTop: 23,
  },
  textButton: {
    color: "#ffffff",
  },
  textLookPassword: {
    position: "absolute",
    right: 15,
    top: 20,
    color: "#1B4371",
  },
});

export default RegistrationScreen;

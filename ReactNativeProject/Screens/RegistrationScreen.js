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
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";

import { register } from "../redux/auth/operations";

const RegistrationScreen = ({ navigation }) => {
  const [hidePass, setHidePass] = useState(true);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const dispatch = useDispatch();

  const handleInputFocus = (input) => {
    setIsShowKeyboard(true);
    setFocusedInput(input);
  };

  const handleInputBlur = () => {
    setIsShowKeyboard(false);
    setFocusedInput(null);
  };

  const addImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const closeImage = () => {
    setImage(null);
  };

  const signIn = () => {
    dispatch(register({ image, login, email, password }));
    setIsLogin(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        resizeMode="cover"
        source={require("../assets/PhotoBG.jpg")}
        style={{
          ...styles.imageBg,
          justifyContent: isShowKeyboard ? "center" : "flex-end",
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.containerRegisterForm}>
            <ImageBackground
              source={{ uri: image }}
              style={styles.loadPhoto}
              imageStyle={{ borderRadius: 16 }}
            >
              <TouchableOpacity style={styles.addIcon} onPress={addImage}>
                {image ? (
                  <Icon
                    name="close"
                    color="#FF6C00"
                    size={20}
                    onPress={closeImage}
                  />
                ) : (
                  <Icon name="plus" color="#FF6C00" size={20} />
                )}
              </TouchableOpacity>
            </ImageBackground>
            <Text style={styles.title}>Реєстрація</Text>
            <TextInput
              onFocus={() => handleInputFocus("login")}
              onBlur={handleInputBlur}
              style={[
                styles.input,
                focusedInput === "login" && styles.focusedFormInput,
              ]}
              placeholder="Логін"
              value={login}
              onChangeText={setLogin}
              required
            />
            <TextInput
              onFocus={() => handleInputFocus("email")}
              onBlur={handleInputBlur}
              style={[
                styles.input,
                focusedInput === "email" && styles.focusedFormInput,
              ]}
              placeholder="Адреса електронної пошти"
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
              required
            />
            <View>
              <TextInput
                onFocus={() => handleInputFocus("password")}
                onBlur={handleInputBlur}
                style={[
                  styles.input,
                  focusedInput === "password" && styles.focusedFormInput,
                ]}
                placeholder="Пароль"
                autoComplete="password"
                secureTextEntry={hidePass ? true : false}
                value={password}
                onChangeText={setPassword}
                required
              />

              <Text
                style={styles.textLookPassword}
                onPress={() => setHidePass(!hidePass)}
              >
                {hidePass ? "Показати" : "Заховати"}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={signIn}
              disabled={email && login && password ? false : true}
            >
              <Text style={styles.textButton}>Зареєструватися</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.text}>Уже є аккаунт? Увійти</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
  },
  containerRegisterForm: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#ffffff",
    paddingBottom: 66,
    paddingHorizontal: 16,
    paddingTop: 92,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginBottom: 22,
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    paddingTop: 16,
    paddingBottom: 15,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  focusedFormInput: {
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    borderColor: "#FF6C00",
    backgroundColor: "#FFFFFF",
  },
  text: {
    textAlign: "center",
    marginTop: 16,
    color: "#1B4371",
    fontWeight: "bold",
  },
  loadPhoto: {
    position: "absolute",
    top: -60,
    right: 140,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    elevation: 5,
  },
  addIcon: {
    position: "absolute",
    right: -10,
    bottom: 20,
    width: 25,
    height: 25,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "#FF6C00",
    borderWidth: 1,
    backgroundColor: "#ffffff",
    elevation: 3,
  },
  button: {
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

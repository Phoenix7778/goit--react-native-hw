import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";

import { login } from "../redux/auth/operations";

const LoginScreen = ({ navigation }) => {
  const [hidePass, setHidePass] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
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

  const onLogin = () => {
    dispatch(login({ email, password }));

    Alert.alert("You are welcome!");

    setEmail("");
    setPassword("");
  };

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
              <Text style={styles.title}>Увійти</Text>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <TextInput
                  onFocus={() => handleInputFocus("email")}
                  onBlur={handleInputBlur}
                  style={[
                    styles.input,
                    focusedInput === "email" && styles.focusedFormInput,
                  ]}
                  placeholder="Адреса електронної пошти"
                  autoCompleteType="email"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </KeyboardAvoidingView>
              <View>
                <KeyboardAvoidingView
                  behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                  <TextInput
                    onFocus={() => handleInputFocus("password")}
                    onBlur={handleInputBlur}
                    style={[
                      styles.input,
                      focusedInput === "password" && styles.focusedFormInput,
                    ]}
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
                  {hidePass ? "Показати" : "Заховати"}
                </Text>
              </View>

              <TouchableOpacity style={styles.button} onPress={onLogin}>
                <Text style={styles.textButton}>Увійти</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={styles.text}>
                  Немає акаунту?{" "}
                  <Text style={styles.textButtonToRegister}>
                    Зареєструватися
                  </Text>{" "}
                </Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingBottom: 111,
  },
  inputBox: {
    paddingTop: 32,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginBottom: 33,
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    paddingTop: 16,
    paddingBottom: 15,
    paddingLeft: 16,
    marginBottom: 16,
  },
  focusedFormInput: {
    borderWidth: 1,
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
  textButtonToRegister: {
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#1B4371",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    marginTop: 43,
  },
  textButton: {
    color: "#FFFFFF",
  },
  textLookPassword: {
    position: "absolute",
    right: 15,
    top: 20,
    color: "#1B4371",
  },
});

export default LoginScreen;

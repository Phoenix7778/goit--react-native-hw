import React, { useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
  TextInput,
  Text,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import backgroundImg from "../assets/img/background.jpg";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSecureText, setIsSecureText] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [currentFocused, setCurrentFocused] = useState("");
  const [emailError, setEmailError] = useState("");

  const clearUserForm = () => {
    setEmail("");
    setPassword("");
  };

  const validateEmail = (input) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!input) {
      setEmailError("Поле електронної пошти не може бути порожнім");
    } else if (!emailRegex.test(input)) {
      setEmailError("Введіть дійсну адресу електронної пошти");
    } else {
      setEmailError("");
    }
  };

  const onSubmitUserRegister = () => {
    if (!email.trim() || !password.trim()) {
      console.warn("Будь ласка, заповніть усі поля");
      return;
    }

    validateEmail(email);

    if (emailError) {
      console.warn(emailError);
      return;
    }

    console.log({ email, password });

    handleKeyboardHide();
    navigation.navigate("Home", { user: { email, password } });
    clearUserForm();
  };

  const handleFocus = (currentFocusInput = "") => {
    setIsShowKeyboard(true);
    setCurrentFocused(currentFocusInput);
  };

  const handleKeyboardHide = () => {
    setIsShowKeyboard(false);
    setCurrentFocused("");
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={handleKeyboardHide}>
        <ImageBackground source={backgroundImg} style={styles.bgContainer}>
          <View style={styles.contentWrapper}>
            <Text style={styles.title}>Увійти</Text>
            <TextInput
              style={[
                styles.input,
                currentFocused === "email" && styles.inputFocused,
                emailError && styles.inputError,
              ]}
              placeholder="Адреса електронної пошти"
              placeholderTextColor="#bdbdbd"
              autoCompleteType="email"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                validateEmail(text);
              }}
              onFocus={() => handleFocus("email")}
            />
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}
            <View
              style={[
                styles.passWrapper,
                { marginBottom: isShowKeyboard ? 92 : 43 },
              ]}
            >
              <TextInput
                style={[
                  styles.input,
                  styles.inputLast,
                  currentFocused === "password" && styles.inputFocused,
                ]}
                placeholder="Пароль"
                placeholderTextColor="#bdbdbd"
                autoCompleteType="password"
                autoCapitalize="none"
                secureTextEntry={isSecureText}
                value={password}
                onChangeText={setPassword}
                onFocus={() => handleFocus("password")}
              />
              <TouchableOpacity
                style={styles.btnPassShow}
                onPress={() =>
                  password !== "" && setIsSecureText((prevState) => !prevState)
                }
              >
                <Text style={styles.btnPassShowText}>
                  {isSecureText ? "Показати" : "Сховати"}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.btn} onPress={onSubmitUserRegister}>
              <Text style={styles.btnText}>Увійти</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.link}
              onPress={() => navigation.navigate("Registration")}
            >
              <Text style={styles.linkText}>
                Немає акаунту?{" "}
                <Text style={styles.linkTextUnderline}>Зареєструватися</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgContainer: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  contentWrapper: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    marginTop: 32,
    marginBottom: 32,
    color: "#212121",
  },
  input: {
    height: 50,
    fontSize: 16,
    padding: 16,
    marginBottom: 16,
    color: "#212121",
    backgroundColor: "#f6f6f6",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRadius: 8,
  },
  inputFocused: {
    backgroundColor: "#ffffff",
    borderColor: "#ff6c00",
  },
  inputError: {
    borderColor: "#ff0000",
  },
  inputLast: {
    marginBottom: 0,
  },
  passWrapper: {
    marginBottom: 43,
  },
  btnPassShow: {
    position: "absolute",
    right: 0,
    top: 0,
    alignSelf: "center",
    padding: 16,
    backgroundColor: "transparent",
  },
  btnPassShowText: {
    color: "#1B4371",
  },
  btn: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ff6c00",
    borderRadius: 100,
  },
  btnText: {
    color: "#ffffff",
  },
  link: {
    alignItems: "center",
    marginTop: 16,
  },
  linkText: {
    color: "#1B4371",
  },
  linkTextUnderline: {
    textDecorationLine: "underline",
  },
  errorText: {
    color: "#ff0000",
    marginBottom: 16,
  },
});

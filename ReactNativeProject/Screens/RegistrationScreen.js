import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useNavigation } from "@react-navigation/native";

import backgroundImg from "../assets/img/background.jpg";
import SvgAddButton from "../assets/svg/SvgAddButton";

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [avatar, setAvatar] = useState(null);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSecureText, setIsSecureText] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [currentFocused, setCurrentFocused] = useState("");
  const [emailError, setEmailError] = useState("");

  const clearUserForm = () => {
    setLogin("");
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
    if (!login.trim() || !email.trim() || !password.trim()) {
      console.warn("Будь ласка, заповніть усі поля");
      return;
    }

    validateEmail(email);

    if (emailError) {
      console.warn(emailError);
      return;
    }

    console.log({ login, email, password, avatar });

    handleKeyboardHide();
    navigation.navigate("Home", { user: { login, email, password } });
    clearUserForm();
  };

  const onLoadAvatar = async () => {
    const avatarImg = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });

    if (avatarImg.type === "cancel") return setAvatar(null);

    setAvatar(avatarImg);
  };

  const handleFocus = (inputField) => {
    setCurrentFocused(inputField);
  };

  const handleKeyboardHide = () => {
    setCurrentFocused("");
    Keyboard.dismiss();
  };

  const togglePasswordVisibility = () => {
    setIsSecureText((prevValue) => !prevValue);
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboardHide}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ImageBackground source={backgroundImg} style={styles.bgContainer}>
          <View style={styles.contentWrapper}>
            <TouchableOpacity
              style={styles.avatarButton}
              onPress={onLoadAvatar}
            >
              <View style={styles.avatarWrapper}>
                {avatar ? (
                  <ImageBackground
                    style={styles.avatar}
                    source={avatar}
                    resizeMode="cover"
                  >
                    <View style={styles.addAvatarButton}>
                      <SvgAddButton style={styles.addAvatarSvg} />
                    </View>
                  </ImageBackground>
                ) : (
                  <View style={styles.emptyAvatar}>
                    <SvgAddButton style={styles.addAvatarSvg} />
                  </View>
                )}
              </View>
            </TouchableOpacity>
            <Text style={styles.title}>Реєстрація</Text>
            <TextInput
              style={[
                styles.input,
                currentFocused === "login" && styles.inputFocused,
              ]}
              placeholder="Логін"
              placeholderTextColor="#bdbdbd"
              autoCompleteType="username"
              autoCapitalize="none"
              value={login}
              onChangeText={setLogin}
              onFocus={() => handleFocus("login")}
            />
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
                isKeyboardVisible && styles.passWrapperKeyboardVisible,
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
                style={styles.showPasswordButton}
                onPress={togglePasswordVisibility}
              >
                <Text style={styles.showPasswordButtonText}>
                  {isSecureText ? "Показати" : "Сховати"}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.btn} onPress={onSubmitUserRegister}>
              <Text style={styles.btnText}>Зареєструватися</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.link}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.linkText}>
                Вже є акаунт?{" "}
                <Text style={styles.linkTextUnderline}>Увійти</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;

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
    paddingVertical: 32,
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
  passWrapperKeyboardVisible: {
    marginBottom: 159,
  },
  showPasswordButton: {
    position: "absolute",
    right: 0,
    top: 0,
    alignSelf: "center",
    padding: 16,
    backgroundColor: "transparent",
  },
  showPasswordButtonText: {
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
  avatarWrapper: {
    width: 120,
    height: 120,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
    overflow: "hidden",
    alignSelf: "center",
    marginTop: -60,
  },
  avatarButton: {
    flex: 1,
  },
  avatar: {
    flex: 1,
    borderRadius: 16,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  emptyAvatar: {
    flex: 1,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  addAvatarButton: {
    padding: 8,
    backgroundColor: "#ffffff",
    borderRadius: 50,
  },
  addAvatarSvg: {
    fill: "#ff6c00",
    stroke: "#ff6c00",
  },
  errorText: {
    color: "#ff0000",
    marginBottom: 16,
  },
});

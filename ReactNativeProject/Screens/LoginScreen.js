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
} from "react-native";

const LoginScreen = ({ onRegister }) => {
  const [hidePass, setHidePass] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    Alert.alert("You are welcome!");
  };

  const handleRegister = () => {
    onRegister();
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
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Адреса електронної пошти"
                  autoCompleteType="email"
                  value={email}
                  onChangeText={setEmail}
                />
              </KeyboardAvoidingView>
              <View>
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
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

              <TouchableOpacity style={styles.button} onPress={onLogin}>
                <Text style={styles.textButton}>Увійти</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleRegister}>
                <Text style={styles.text}>Немає акаунту? Зареєструватися</Text>
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
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginBottom: 33,
  },
  inputBox: {
    padding: 16,
    paddingTop: 32,
    paddingBottom: 111,
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
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    marginTop: 43,
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

export default LoginScreen;

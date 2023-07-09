import React, { useState } from "react";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import PostsScreen from "./Screens/PostsScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("registration");

  const handleLogin = () => {
    setCurrentScreen("login");
  };

  const handleRegister = () => {
    setCurrentScreen("registration");
  };

  return (
    <>
      {currentScreen === "registration" ? (
        <RegistrationScreen onLogin={handleLogin} />
      ) : (
        <LoginScreen onRegister={handleRegister} />
      )}
      {/* <PostsScreen /> */}
    </>
  );
}

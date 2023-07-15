import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "../Screens/RegistrationScreen";
import LoginScreen from "../Screens/LoginScreen";
import Home from "../Screens/Home";

const MainStack = createStackNavigator();

const CreateAuthNav = () => {
  return (
    <MainStack.Navigator
      initialRouteName="Registration"
      screenOptions={{ headerShown: false }}
    >
      <MainStack.Screen name="Registration" component={RegistrationScreen} />
      <MainStack.Screen name="Login" component={LoginScreen} />
      <MainStack.Screen name="Home" component={Home} />
    </MainStack.Navigator>
  );
};

export default CreateAuthNav;

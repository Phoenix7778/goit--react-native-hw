import { View } from "react-native";
import { Provider } from "react-redux";
import "react-native-gesture-handler";
import "react-native-url-polyfill/auto";
import "react-native-get-random-values";

import { store } from "./redux/store";
import Main from "./components/Main";

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <Main />
      </View>
    </Provider>
  );
}

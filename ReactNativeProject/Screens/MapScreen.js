import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useIsFocused } from "@react-navigation/native";

const MapScreen = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (isFocused) {
      const homeTab = navigation?.getParent("home");
      if (homeTab) {
        homeTab.setOptions({
          tabBarStyle: { display: "none" },
          headerShown: false,
        });
      }
    }

    if (route.params && route.params.postLocation) {
      setLocation(route.params.postLocation);
    }
  }, [isFocused, navigation, route.params]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.93398618586138,
          longitude: 24.596278724618724,
          latitudeDelta: 0.006,
          longitudeDelta: 0.006,
        }}
      >
        {location && <Marker title="It's here" coordinate={location} />}
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

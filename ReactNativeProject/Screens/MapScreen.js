import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if (route.params && route.params.item.location) {
      const { latitude, longitude } = route.params.item.location;
      setLatitude(latitude);
      setLongitude(longitude);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      {latitude && longitude ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <Marker coordinate={{ latitude, longitude }} />
        </MapView>
      ) : (
        <Text>Sorry, location didn't work...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    flex: 1,
    width: "100%",
  },
});

export default MapScreen;

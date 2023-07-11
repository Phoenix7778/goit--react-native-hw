import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";

const MapScreen = () => {
  return (
    <MapView style={styles.mapStyle} mapType="standard" minZoomLevel={15}>
      <Marker title="Ви тут" />
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1,
  },
});

export default MapScreen;

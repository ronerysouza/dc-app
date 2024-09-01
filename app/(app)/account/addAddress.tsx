import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const AddAdress = () => {
  const [mapRegion, setMapRegion] = useState({
    latitude: -13.150986835477926,
    longitude: -41.775671906334054,
    latitudeDelta: 0.0099,
    longitudeDelta: 0.02,
  });
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFill}
        region={mapRegion}
        // provider={PROVIDER_GOOGLE}
      >
        <Marker coordinate={mapRegion} title="Delivery Chapada" />
      </MapView>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: "100%",
//     height: "100%",
//   },
// });

export default AddAdress;

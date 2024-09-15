import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { globalStyles } from "@/assets/styles/styles";
import { useRouter } from "expo-router";
import { useLoggedAuth } from "@/context/authContextLogged";

const AddAdress = () => {
  const { onSaveAddress } = useLoggedAuth();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [address, setAddress] = useState<any>(null);

  const [mapRegion, setMapRegion] = useState<any>(null);

  const saveAddress = async () => {
    const newAddress = {
      title: address?.street,
      zipCode: address?.postalCode,
      street: address?.street,
      number: address?.streetNumber,
      neighborhood: address?.district,
      city: address?.city,
      state: address?.region,
      coords: {
        latitude: latitude,
        latitudeDelta: 0.0001,
        longitude: longitude,
        longitudeDelta: 0.0009,
      },
      mainAddress: true,
    };

    const resultAddress = await onSaveAddress!(newAddress);
    // console.log("UUUUUUUUUU");
    // console.log(resultAddress);
    if (resultAddress) {
      router.back();
      // router.replace("/home");
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permissão de localização negada!");
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync();

      if (coords) {
        const { latitude, longitude } = coords;
        setLatitude(latitude);
        setLongitude(longitude);

        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        let objLocatioin = {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0001,
          longitudeDelta: 0.0009,
        };

        setAddress(response[0]);
        setMapRegion(objLocatioin);
      }
    })();
  }, []);

  return (
    <View style={[globalStyles.screenContainer]}>
      {errorMsg ? (
        <Text style={globalStyles.warning}>
          É importante termos a sua localização para que possamos oferecer um
          melhor serviço.
        </Text>
      ) : null}
      <View style={styles.boxConfirmAddress}>
        <Text style={styles.textBold}>
          Sua localização no mapa está correta?
        </Text>
        <Text style={[globalStyles.textDefault, styles.textAddress]}>
          {address?.street ? address?.street : null}
          {address?.streetNumber ? ", " + address?.streetNumber : null}
          {address?.district ? ", " + address?.district : null}
          {address?.city ? ", " + address?.city : null}
          {address?.region ? ", " + address?.region : null}
          {address?.postalCode ? " - CEP: " + address?.postalCode : null}
        </Text>
        <TouchableOpacity onPress={() => saveAddress()}>
          <View style={globalStyles.buttonSubmit}>
            <Text style={globalStyles.textButtonSubmit}>Confirmar</Text>
          </View>
        </TouchableOpacity>
      </View>

      <MapView style={{ flex: 1 }} region={mapRegion}>
        <Marker coordinate={mapRegion} title="Delivery Chapada" />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  boxConfirmAddress: {
    padding: 16,
  },
  textBold: {
    fontWeight: "bold",
    fontSize: 16,
  },
  textAddress: {
    paddingVertical: 10,
  },
});

export default AddAdress;

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import { globalStyles } from "@/assets/styles/styles";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Link, useRouter } from "expo-router";
import * as Location from "expo-location";
import AddAdress from "@/components/account/AddAddress";

const ListAddresses = () => {
  const router = useRouter();
  const [permission, setPermission] = useState<any>(null);
  const [component, setComponent] = useState("listAddresses");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [mapRegion, setMapRegion] = useState({});

  const addNewAddress = async () => {
    if (permission) {
      setComponent("addAddress");
      return;
    }
    setComponent("addAddressByZipCode");
    return;
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permissão de localização negada!");
        setPermission(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      let { coords } = await Location.getCurrentPositionAsync();

      if (coords) {
        const { latitude, longitude } = coords;
        console.log("Lat e Long: " + latitude, longitude);
        setLatitude(latitude);
        setLongitude(longitude);

        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        console.log("USER ADDRESS: " + JSON.stringify(response));
      }

      const objLocatioin = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0001,
        longitudeDelta: 0.0009,
      };

      setMapRegion(objLocatioin);

      setPermission(true);
    })();
  }, []);

  return (
    <View style={globalStyles.screenContainer}>
      {errorMsg ? (
        <Text>
          É importante termos a sua localização para que possamos oferecer um
          melhor serviço.
        </Text>
      ) : null}
      {component === "listAddresses" ? (
        <ScrollView>
          <View>
            <View style={styles.boxNoOrder}>
              <Ionicons
                name="warning-outline"
                size={42}
                color={Colors.medium}
              />
              <Text style={globalStyles.titleSection}>
                Nenhum endereço cadastrado
              </Text>

              {/* <Link href={"/(app)/account/addAddress"} asChild> */}
              <TouchableOpacity
                style={styles.buttonAddNewAddress}
                onPress={() => addNewAddress()}
              >
                <Text style={styles.textButtonAddNewAddress}>
                  Adicionar novo endereço
                </Text>
                <Ionicons
                  name="add-circle-outline"
                  size={16}
                  color={Colors.white}
                />
              </TouchableOpacity>
              {/* </Link> */}
            </View>
          </View>
        </ScrollView>
      ) : component === "addAddress" ? (
        <AddAdress />
      ) : (
        <View>
          <Text>Inserir endereço via CEP</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  boxNoOrder: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 64,
    alignContent: "center",
    alignItems: "center",
  },
  buttonAddNewAddress: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    marginTop: 24,
  },
  textButtonAddNewAddress: {
    color: Colors.white,
    textAlign: "center",
    fontFamily: "Inter_600SemiBold",
  },
});

export default ListAddresses;

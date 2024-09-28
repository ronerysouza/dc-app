import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component, useEffect, useRef, useState } from "react";
import { globalStyles } from "@/assets/styles/styles";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Link, useNavigation, useRouter } from "expo-router";
import * as Location from "expo-location";
import AddAdress from "@/components/account/AddAddress";
import { useLoggedAuth } from "@/context/authContextLogged";

interface AddAddressProps {
  _id: string;
  coords: {
    latitude: number;
    latitudeDelta: number;
    longitude: number;
    longitudeDelta: number;
  };
  createdAt: string;
  mainAddress: boolean;
  neighborhood: string;
  number: string;
  state: string;
  street: string;
  city: string;
  title: string;
  updatedAt: string;
  user: {
    _id: string;
  };
  zipCode: string;
}

const ListAddresses = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { onGetAddressesByUserId, onSelectedAddress, onChangeAddress } =
    useLoggedAuth();
  const [addresses, setAddresses] = useState<AddAddressProps[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [modalAction, setModalAction] = useState<any>(null);

  const [temporarySelectedAddress, setTemporarySelectedAddress] =
    useState<any>(null);

  const [loading, setLoading] = useState<any>(null);
  const [permission, setPermission] = useState<any>(null);
  const [component, setComponent] = useState("listAddresses");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [mapRegion, setMapRegion] = useState({});

  const actionsModalAddress = (address?: object) => {
    // console.log(address);
    if (address) {
      setModalAction(true);
      setTemporarySelectedAddress(address);
    }
    // getSelectedAddress();
    // router.dismissAll();
    // bottomSheetRef.current?.present();
  };

  const closeModal = (address: object, action?: string) => {
    if (!action) {
      setModalAction(null);
      return;
    }
    if (address && action === "selectAddress") {
      selectAddress(temporarySelectedAddress);
      setModalAction(null);
      return;
    }
    if (address && action === "removeAddress") {
      alert("Remover?");
      // selectAddress(address);
      // setModalAction(null);
      return;
    }
    if (address && action === "setMainAddress") {
      alert("Setar como  principal?");
      // selectAddress(address);
      // setModalAction(null);
      return;
    }
  };

  const selectAddress = async (address: object) => {
    await onChangeAddress!(address);
    router.back();
    router.replace("/home");
  };

  const checkLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permissão de localização negada!");
      setPermission(false);
      return false;
      // return true;
    }
    setPermission(true);
    return true;
    // return true;
    // let location = await Location.getCurrentPositionAsync({});
    // let { coords } = await Location.getCurrentPositionAsync();
    // if (coords) {
    //   const { latitude, longitude } = coords;
    //   // console.log("Lat e Long: " + latitude, longitude);
    //   setLatitude(latitude);
    //   setLongitude(longitude);
    //   let response = await Location.reverseGeocodeAsync({
    //     latitude,
    //     longitude,
    //   });
    // }
    // const objLocatioin = {
    //   latitude: location.coords.latitude,
    //   longitude: location.coords.longitude,
    //   latitudeDelta: 0.0001,
    //   longitudeDelta: 0.0009,
    // };
    // setMapRegion(objLocatioin);
    // setPermission(true);
  };

  useEffect(() => {
    // router.setParams({ name: undefined });
    // (async () => {
    //   let { status } = await Location.requestForegroundPermissionsAsync();
    //   if (status !== "granted") {
    //     setErrorMsg("Permissão de localização negada!");
    //     setPermission(false);
    //     return;
    //   }
    //   let location = await Location.getCurrentPositionAsync({});
    //   let { coords } = await Location.getCurrentPositionAsync();
    //   if (coords) {
    //     const { latitude, longitude } = coords;
    //     // console.log("Lat e Long: " + latitude, longitude);
    //     setLatitude(latitude);
    //     setLongitude(longitude);
    //     let response = await Location.reverseGeocodeAsync({
    //       latitude,
    //       longitude,
    //     });
    //   }
    //   const objLocatioin = {
    //     latitude: location.coords.latitude,
    //     longitude: location.coords.longitude,
    //     latitudeDelta: 0.0001,
    //     longitudeDelta: 0.0009,
    //   };
    //   setMapRegion(objLocatioin);
    //   setPermission(true);
    // })();

    const loadAddresses = async () => {
      const addresses = await onGetAddressesByUserId!();
      setAddresses(addresses);

      const selected = JSON.parse(await onSelectedAddress!());
      if (selected) {
        setLoading(true);
      }
      setSelectedAddress(selected);
    };

    loadAddresses();
    checkLocationPermission();
  }, [onChangeAddress]);

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
          <View style={styles.listAddresses}>
            {addresses && addresses.length > 0 ? (
              <View style={[globalStyles.mBottom12]}>
                <Text
                  style={[globalStyles.textDefault, globalStyles.textCenter]}
                >
                  Clique no endereço para escolher o endereço:
                </Text>
              </View>
            ) : null}
            {addresses.map((address, index) => (
              <TouchableOpacity
                style={
                  selectedAddress?.coords.latitude ===
                    address?.coords.latitude &&
                  selectedAddress?.title === address?.title
                    ? [styles.boxAddress, styles.boxAddressSelected]
                    : [styles.boxAddress]
                }
                onPress={() => actionsModalAddress(address)}
                key={index}
              >
                {selectedAddress?.coords.latitude ===
                  address?.coords.latitude &&
                selectedAddress?.title === address?.title ? (
                  <Ionicons name="checkbox" size={24} color={Colors.green} />
                ) : (
                  <Ionicons
                    name="checkbox-outline"
                    size={24}
                    color={Colors.medium}
                  />
                )}
                <View>
                  <Text
                    style={[
                      globalStyles.textDefaultSemiBold,
                      styles.titleAddress,
                    ]}
                  >
                    {address?.title}
                  </Text>
                  <Text style={[globalStyles.textDefault, styles.textAddress]}>
                    {address?.street ? address?.street : null}
                    {address?.number ? ", " + address?.number : null}
                    {address?.neighborhood
                      ? ", " + address?.neighborhood
                      : null}
                    {address?.city ? ", " + address?.city : null}
                    {address?.state ? ", " + address?.state : null}
                    {address?.zipCode ? " - CEP: " + address?.zipCode : null}
                  </Text>
                </View>

                {address?.mainAddress ? (
                  <View style={styles.mainAddress}>
                    <Text
                      style={[globalStyles.textDefault, styles.textMainAddress]}
                    >
                      Principal
                    </Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            ))}
          </View>

          <View>
            <View style={styles.boxNoOrder}>
              {addresses && addresses.length <= 0 && loading ? (
                <View
                  style={[
                    globalStyles.mBottom12,
                    globalStyles.alignVerticalCenter,
                  ]}
                >
                  <Ionicons
                    name="warning-outline"
                    size={42}
                    color={Colors.medium}
                  />
                  <Text style={globalStyles.titleSection}>
                    Nenhum endereço cadastrado
                  </Text>
                </View>
              ) : !loading ? (
                <View style={globalStyles.mBottom12}>
                  <FontAwesome6
                    name="clock-rotate-left"
                    size={24}
                    color="black"
                  />
                  <Text style={globalStyles.titleSection}>carregando...</Text>
                </View>
              ) : null}

              <Link href={"/(app)/account/addAddress"} asChild>
                <TouchableOpacity style={styles.buttonAddNewAddress}>
                  <Text style={styles.textButtonAddNewAddress}>
                    Adicionar novo endereço
                  </Text>
                  <Ionicons
                    name="add-circle-outline"
                    size={16}
                    color={Colors.white}
                  />
                </TouchableOpacity>
              </Link>
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

      {modalAction ? (
        <View style={styles.modalActions}>
          <View style={styles.modalActionsBox}>
            <View style={styles.modalActionsHeader}>
              <Text
                style={[
                  globalStyles.textDefaultSemiBold,
                  styles.modalActionsHeaderTitle,
                ]}
              >
                O que deseja fazer?
              </Text>
            </View>
            <View style={styles.modalActionsBody}>
              <Text
                style={[globalStyles.textDefaultSemiBold, styles.titleAddress]}
              >
                {temporarySelectedAddress?.title}
              </Text>
              <Text
                style={[
                  globalStyles.textDefault,
                  styles.textAddress,
                  globalStyles.mBottom12,
                ]}
              >
                {temporarySelectedAddress?.street
                  ? temporarySelectedAddress?.street
                  : null}
                {temporarySelectedAddress?.number
                  ? ", " + temporarySelectedAddress?.number
                  : null}
                {temporarySelectedAddress?.neighborhood
                  ? ", " + temporarySelectedAddress?.neighborhood
                  : null}
                {temporarySelectedAddress?.city
                  ? ", " + temporarySelectedAddress?.city
                  : null}
                {temporarySelectedAddress?.state
                  ? ", " + temporarySelectedAddress?.state
                  : null}
                {temporarySelectedAddress?.zipCode
                  ? " - CEP: " + temporarySelectedAddress?.zipCode
                  : null}
              </Text>
              <TouchableOpacity
                style={globalStyles.buttonOutline}
                onPress={() => closeModal(modalAction, "selectAddress")}
              >
                <Text style={globalStyles.textButtonOutline}>
                  Selecionar para entrega
                </Text>
                <Ionicons
                  name="chevron-forward-outline"
                  size={24}
                  color={Colors.medium}
                />
              </TouchableOpacity>
              {!temporarySelectedAddress?.mainAddress ? (
                <TouchableOpacity
                  style={globalStyles.buttonOutline}
                  onPress={() => closeModal(modalAction, "setMainAddress")}
                >
                  <Text style={globalStyles.textButtonOutline}>
                    Selecionar e Salvar como endereço principal;
                  </Text>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={24}
                    color={Colors.medium}
                  />
                </TouchableOpacity>
              ) : null}
              {!temporarySelectedAddress?.mainAddress ? (
                <TouchableOpacity
                  style={globalStyles.buttonOutline}
                  onPress={() => closeModal(modalAction, "setMainAddress")}
                >
                  <Text style={globalStyles.textButtonOutline}>Excluir</Text>
                  <Ionicons
                    name="close-outline"
                    size={24}
                    color={Colors.medium}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={styles.modalActionsFooter}>
              <TouchableOpacity
                style={globalStyles.buttonOutline}
                onPress={() => closeModal(modalAction)}
              >
                <Text style={globalStyles.textButtonOutline}>Cancelar</Text>
                <Ionicons
                  name="close-outline"
                  size={24}
                  color={Colors.medium}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  modalActions: {
    position: "absolute",
    flex: 1,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "flex-start",
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: Colors.medium,
  },
  modalActionsBox: {
    top: 24,
    backgroundColor: Colors.white,
    width: "90%",
    display: "flex",
    borderRadius: 8,
    gap: 8,
  },
  modalActionsHeader: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: Colors.green,
    padding: 12,
  },
  modalActionsHeaderTitle: {
    color: Colors.white,
    fontSize: 16,
    textAlign: "center",
  },
  modalActionsBody: {
    padding: 12,
    display: "flex",
    gap: 12,
  },
  modalActionsFooter: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  boxNoOrder: {
    flex: 1,
    padding: 12,
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
    width: "100%",
  },
  textButtonAddNewAddress: {
    color: Colors.white,
    textAlign: "center",
    fontFamily: "Inter_600SemiBold",
  },
  listAddresses: {
    paddingHorizontal: 12,
    paddingVertical: 24,
    flex: 1,
    gap: 16,
    marginTop: 8,
  },
  boxAddress: {
    flexDirection: "row",
    position: "relative",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: Colors.medium,
    borderRadius: 4,
    gap: 8,
    justifyContent: "space-around",
  },
  boxAddressSelected: {
    borderColor: Colors.green,
    backgroundColor: Colors.grey,
  },
  titleAddress: {
    fontSize: 16,
  },
  textAddress: {},
  mainAddress: {
    position: "absolute",
    top: -12,
    right: -2,
    backgroundColor: Colors.green,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  textMainAddress: {
    color: Colors.white,
    fontSize: 12,
  },
});

export default ListAddresses;

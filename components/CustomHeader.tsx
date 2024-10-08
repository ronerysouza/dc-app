import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Colors from "@/constants/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import BottomSheet from "./BottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useLoggedAuth } from "@/context/authContextLogged";

const SearchBar = () => (
  <View style={styles.searchContainer}>
    <View style={styles.searchSection}>
      <View style={styles.searchField}>
        <Ionicons name="search" size={20} color={Colors.medium} />
        <TextInput
          placeholderTextColor={"grey"}
          placeholder="Restaurante, comida ou bebida"
          style={styles.inputSearch}
        />
      </View>
      {/* <Link replace href={"/home"} asChild>
        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name="options-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </Link> */}
    </View>
  </View>
);

const CustomHeader = () => {
  const [address, setAddress] = useState<any>(null);
  const [locationOn, setLocationOn] = useState(false);
  const {
    onChangeAddress,
    onSelectedAddress,
    onGetCurrentLocation,
    onUnsetMainAddress,
  } = useLoggedAuth();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const getSelectedAddress = async () => {
    setLocationOn(false);
    const selecetedAdd = await onSelectedAddress!();

    if (!selecetedAdd) {
      const location = await onGetCurrentLocation!();

      if (location && location.length > 0) {
        setLocationOn(true);
        setAddress(location[0]);
      }

      return;
    }

    try {
      setAddress(JSON.parse(selecetedAdd));
      return;
    } catch (error) {
      setAddress(selecetedAdd);
    }
    return;
  };

  const openModal = () => {
    getSelectedAddress();
    bottomSheetRef.current?.present();
  };

  useEffect(() => {
    getSelectedAddress();
  }, [onSelectedAddress]);

  return (
    <>
      <BottomSheet ref={bottomSheetRef} />
      <View style={styles.container}>
        <TouchableOpacity style={styles.addressIcon} onPress={openModal}>
          <Ionicons name="bicycle-outline" size={28} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addressBox} onPress={openModal}>
          <Text style={styles.titleAddress}>
            {locationOn ? "Sua localização:" : "Endereço para entrega:"}
          </Text>
          <View style={styles.lineAddress}>
            {address ? (
              <>
                {locationOn ? (
                  <MaterialIcons
                    name="my-location"
                    size={16}
                    color={Colors.green}
                    style={{ marginRight: 4 }}
                  />
                ) : null}

                <Text style={styles.textAddress}>
                  {address?.street},{" "}
                  {address?.number ? address?.number : address?.streetNumber}
                </Text>
              </>
            ) : null}
            <Ionicons name="chevron-down" size={18} color={Colors.primary} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.alertButton} onPress={openModal}>
          <FontAwesome name="bell-o" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <SearchBar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: Colors.white,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
  },
  addressIcon: {},
  addressBox: {
    flex: 1,
  },
  lineAddress: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleAddress: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.medium,
  },
  textAddress: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  alertButton: {
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  searchContainer: {
    backgroundColor: Colors.white,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    shadowColor: "#666666",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchSection: {
    flexDirection: "row",
    gap: 10,
  },
  searchField: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  inputSearch: {
    flex: 1,
    padding: 10,
  },
  optionButton: {
    padding: 10,
    backgroundColor: Colors.lightGrey,
    borderRadius: 50,
  },
});

export default CustomHeader;

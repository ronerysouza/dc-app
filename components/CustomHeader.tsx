import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useRef } from "react";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
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
      <Link replace href={"/home"} asChild>
        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name="options-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </Link>
    </View>
  </View>
);

const CustomHeader = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { onLogout } = useLoggedAuth();

  const openModal = () => {
    bottomSheetRef.current?.present();
  };

  const logout = async () => {
    await onLogout!();
  };
  return (
    <>
      <BottomSheet ref={bottomSheetRef} />
      <View style={styles.container}>
        <TouchableOpacity style={styles.addressIcon} onPress={openModal}>
          <Ionicons name="bicycle-outline" size={28} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addressBox} onPress={openModal}>
          <Text style={styles.titleAddress}>Endereço para entrega:</Text>
          <View style={styles.lineAddress}>
            <Text style={styles.textAddress}>Av. Castro Alves, 182</Text>
            <Ionicons name="chevron-down" size={18} color={Colors.primary} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.userButton} onPress={logout}>
          <Ionicons name="person-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <SearchBar />
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.green },
  container: {
    height: 60,
    backgroundColor: Colors.white,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderBottomColor: Colors.grey,
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
  userButton: {
    backgroundColor: Colors.lightGrey,
    padding: 10,
    borderRadius: 50,
  },
  searchContainer: {
    backgroundColor: Colors.white,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
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

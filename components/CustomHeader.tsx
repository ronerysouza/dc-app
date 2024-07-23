import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

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
      <Link href={"/"} asChild>
        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name="options-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </Link>
    </View>
  </View>
);

const CustomHeader = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.addressIcon}>
          <Ionicons name="bicycle-outline" size={28} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addressBox}>
          <Text style={styles.titleAddress}>Endereço para entrega:</Text>
          <View style={styles.lineAddress}>
            <Text style={styles.textAddress}>Av. Castro Alves, 182</Text>
            <Ionicons name="chevron-down" size={18} color={Colors.primary} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.userButton}>
          <Ionicons name="person-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <SearchBar />
    </SafeAreaView>
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
    fontSize: 12,
    color: Colors.medium,
  },
  textAddress: {
    fontSize: 14,
    fontWeight: "600",
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

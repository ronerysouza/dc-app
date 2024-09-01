import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component } from "react";
import { globalStyles } from "@/assets/styles/styles";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

export class ListAddresses extends Component {
  render() {
    return (
      <View style={globalStyles.screenContainer}>
        <ScrollView>
          <View style={styles.boxNoOrder}>
            <Ionicons name="warning-outline" size={42} color={Colors.medium} />
            <Text style={globalStyles.titleSection}>
              Nenhum endereço cadastrado
            </Text>

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
        </ScrollView>
      </View>
    );
  }
}

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

import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";
import { globalStyles } from "@/assets/styles/styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export class Index extends Component {
  render() {
    return (
      <View style={globalStyles.screenContainer}>
        <ScrollView>
          <View style={styles.boxNoOrder}>
            <Ionicons name="warning-outline" size={42} color={Colors.medium} />
            <Text style={globalStyles.titleSection}>
              Nenhum pedido encontrado
            </Text>
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
  textName: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
  },
  menuBox: {
    paddingHorizontal: 12,
  },
  boxLink: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    paddingVertical: 16,
  },
  textLink: {
    fontSize: 16,
    textAlign: "left",
    flex: 1,
  },
});

export default Index;

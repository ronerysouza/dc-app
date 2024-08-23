import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Categories from "@/components/Categories";
import Colors from "@/constants/Colors";
import { globalStyles } from "@/assets/styles/styles";
import { ScrollView } from "react-native-gesture-handler";

const Page = () => {
  return (
    <View style={globalStyles.screenContainer}>
      <ScrollView>
        <Categories />

        <Text style={globalStyles.titleSection}>Restaurantes:</Text>
        <Text style={globalStyles.titleSection}>Promoções:</Text>
      </ScrollView>
    </View>
  );
};

export default Page;

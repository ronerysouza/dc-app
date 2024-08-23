import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect } from "react";
import Categories from "@/components/Categories";
import Colors from "@/constants/Colors";
import { globalStyles } from "@/assets/styles/styles";

const Page = () => {
  return (
    <View>
      <ScrollView>
        <Categories />

        <Text style={globalStyles.titleSection}>Restaurantes:</Text>
        <Text style={[globalStyles.titleSection]}>Promoções:</Text>
      </ScrollView>
    </View>
  );
};

export default Page;

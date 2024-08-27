import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component } from "react";
import { stores } from "@/assets/data/home";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

var { width } = Dimensions.get("window");
export class LastStores extends Component {
  render() {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 12,
          paddingLeft: 12,
        }}
      >
        {stores.map((store, index) => (
          <Link href={"/home"} asChild style={styles.storeCard} key={index}>
            <TouchableOpacity>
              <Image
                source={{
                  uri: store.logoUrl,
                }}
                style={styles.storeImage}
              />
              <Text style={styles.storeLabel}>{store.title}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  storeCard: {
    padding: 4,
    marginEnd: 4,
    alignItems: "center",
    maxWidth: 120,
  },
  storeLabel: {
    textAlign: "center",
  },
  storeImage: {
    width: 80,
    height: 80,
    borderRadius: 80,
    marginBottom: 4,
    borderStyle: "solid",
    borderWidth: 4,
    borderColor: Colors.white,
  },
});

export default LastStores;

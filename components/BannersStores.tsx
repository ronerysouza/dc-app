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
import { banners } from "@/assets/data/home";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

var { width } = Dimensions.get("window");
export class BannersStores extends Component {
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
        {banners.map((banner, index) => (
          <Link href={"/home"} asChild style={styles.bannerCard} key={index}>
            <TouchableOpacity style={styles.touchCard}>
              <Image
                source={{
                  uri: banner.imageUrl,
                }}
                resizeMode="cover"
                style={styles.bannerImage}
              />
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  bannerCard: {
    flex: 1,
    width: (width * 9) / 10,
    height: 200,
    marginEnd: 12,
    alignItems: "center",
  },
  touchCard: {
    borderRadius: 8,
    overflow: "hidden",
  },
  bannerLabel: {
    textAlign: "center",
  },
  bannerImage: {
    flex: 1,
    overflow: "visible",
    width: width,
  },
});

export default BannersStores;

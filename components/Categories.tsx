import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component } from "react";
import { categories } from "@/assets/data/home";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

export class Categories extends Component {
  render() {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: 12 }}
      >
        {categories.map((category, index) => (
          <Link href={"/home"} asChild style={styles.categoryCard} key={index}>
            <TouchableOpacity>
              <Image
                source={{
                  uri: category.urlImage,
                }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryLabel}>{category.title}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  categoryCard: {
    padding: 4,
    marginEnd: 4,
    alignItems: "center",
  },
  categoryLabel: {
    textAlign: "center",
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 80,
    marginBottom: 4,
    borderStyle: "solid",
    borderWidth: 4,
    borderColor: Colors.white,
  },
});

export default Categories;

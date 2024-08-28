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
import { products } from "@/assets/data/home";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { globalStyles } from "@/assets/styles/styles";

var { width } = Dimensions.get("window");
export class LastPromotionalProducts extends Component {
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
        {products.map((product, index) => (
          <Link href={"/home"} asChild style={styles.productCard} key={index}>
            <TouchableOpacity style={styles.touchCard}>
              <Image
                source={{
                  uri: product.imageUrl,
                }}
                style={styles.productImage}
              />
              <Image
                source={{
                  uri: product.store.logoUrl,
                }}
                style={styles.logo}
              />
              <Text style={[globalStyles.textDefault, styles.productText]}>
                {product.title}
              </Text>
              <Text
                style={[globalStyles.textDefault, styles.productTextOldPrice]}
              >
                R${product.oldPrice}
              </Text>
              <Text style={[globalStyles.textDefault, styles.productTextPrice]}>
                R${product.price}
              </Text>
              <View style={styles.boxTextLine}>
                <Text
                  style={[globalStyles.textDefault, styles.productTextTime]}
                >
                  R${product.store.minDeliveryTime}-
                  {product.store.maxDeliveryTime}min
                </Text>
                <Text
                  style={[
                    globalStyles.textDefault,
                    styles.productTextDeliveryFree,
                  ]}
                >
                  {product.store.deliveryPrice === 0
                    ? "Grátis"
                    : "R$" + product.store.deliveryPrice}
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  productCard: {
    marginEnd: 12,
    position: "relative",
  },
  logo: {
    width: 45,
    height: 45,
    position: "absolute",
    top: 5,
    left: 5,
  },
  productTextOldPrice: {
    fontSize: 12,
    textDecorationLine: "line-through",
    color: Colors.medium,
  },
  productTextPrice: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
  touchCard: {},
  productText: {
    paddingVertical: 4,
  },
  boxTextLine: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  productTextTime: {
    fontSize: 13,
  },
  productTextDeliveryFree: {
    color: Colors.primary,
  },
  productImage: {
    width: 140,
    height: 105,
    borderRadius: 8,
  },
});

export default LastPromotionalProducts;

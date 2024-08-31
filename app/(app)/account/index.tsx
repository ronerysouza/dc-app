import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { globalStyles } from "@/assets/styles/styles";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useLoggedAuth } from "@/context/authContextLogged";

const Index = () => {
  const { onLogout } = useLoggedAuth();

  const logout = async () => {
    await onLogout!();
  };
  return (
    <View style={globalStyles.screenContainer}>
      <ScrollView>
        <View style={styles.helloBox}>
          <Text style={[globalStyles.textDefault]}>Olá,</Text>
          <Text style={[styles.textName]}>Ronery</Text>
          <Text style={[globalStyles.textDefault]}>ronery.souza@gmail.com</Text>
        </View>

        <View style={styles.menuBox}>
          <Link href={"/(app)/home"} asChild>
            <TouchableOpacity>
              <View style={[styles.boxLink]}>
                <Ionicons
                  name="man-outline"
                  size={24}
                  color={Colors.mediumDark}
                />
                <Text style={[globalStyles.textDefault, styles.textLink]}>
                  Meus dados
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={Colors.mediumDark}
                />
              </View>
            </TouchableOpacity>
          </Link>
          <Link href={"/(app)/home"} asChild>
            <TouchableOpacity>
              <View style={[styles.boxLink]}>
                <Ionicons
                  name="receipt-outline"
                  size={24}
                  color={Colors.mediumDark}
                />
                <Text style={[globalStyles.textDefault, styles.textLink]}>
                  Meus pedidos
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={Colors.mediumDark}
                />
              </View>
            </TouchableOpacity>
          </Link>
          <Link href={"/(app)/home"} asChild>
            <TouchableOpacity>
              <View style={[styles.boxLink]}>
                <Ionicons
                  name="location-outline"
                  size={24}
                  color={Colors.mediumDark}
                />
                <Text style={[globalStyles.textDefault, styles.textLink]}>
                  Meus endereços
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={Colors.mediumDark}
                />
              </View>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity onPress={logout}>
            <View style={[styles.boxLink]}>
              <Ionicons
                name="log-in-outline"
                size={24}
                color={Colors.mediumDark}
              />
              <Text style={[globalStyles.textDefault, styles.textLink]}>
                Sair
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  helloBox: {
    paddingHorizontal: 12,
    paddingVertical: 24,
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
    // borderBottomColor: Colors.white,
    // borderBottomWidth: 2,
    // borderStyle: "solid",
    paddingVertical: 16,
  },
  textLink: {
    fontSize: 16,
    textAlign: "left",
    flex: 1,
  },
});

export default Index;

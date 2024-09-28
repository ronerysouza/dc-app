import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { globalStyles } from "@/assets/styles/styles";
import Colors from "@/constants/Colors";
import {
  Link,
  useGlobalSearchParams,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useLoggedAuth } from "@/context/authContextLogged";
import { useIsFocused, useRoute } from "@react-navigation/native";

const Index = () => {
  const isFocused = useIsFocused();
  const { onLogout } = useLoggedAuth();
  const [refresh, setRefresh] = useState(false);

  const router = useRouter();
  const params = useLocalSearchParams();
  // const [searchParams, setSearchParams] = useLocalSearchParams();

  // console.log(params.name);
  // const route = useRouter();
  // const params = useGlobalSearchParams();
  // const params2 = useLocalSearchParams();
  // const params2 = useLocalSearchParams<{ screen: string }>();
  // const { params } = useRoute();
  // const { screen } = route.params;

  // const { screen } = params;

  const logout = async () => {
    await onLogout!();
  };

  const redirect = async (screen?: string | string[]) => {
    // await onLogout!();
    if (screen === "listAddresses") {
      router.navigate("/(app)/account/listAddresses");
      return;
    }
    if (screen === "addAddress") {
      router.navigate("/(app)/account/addAddress");
      return;
    }

    router.setParams({
      name: "someText",
    });

    // router.setParams({ name: "Lucy" });

    // console.log(screen);
  };

  // if (params.name) {
  //   redirect(params.name);
  // }

  // useEffect(() => {
  //   if (isFocused) {
  // Perform actions you want when the screen is focused.
  // This could be fetching data, re-rendering components, or any other refresh logic.
  // alert("Home screen is on focus");
  // redirect(params.name);
  //   }
  // }, [isFocused]);

  return (
    <View style={globalStyles.screenContainer}>
      <ScrollView refreshControl={<RefreshControl refreshing={refresh} />}>
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
          <Link href={"/(app)/account/listAddresses"} asChild>
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

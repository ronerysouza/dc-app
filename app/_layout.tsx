import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import Colors from "@/constants/Colors";
import { AuthProvider } from "@/context/authContext";
import { Stack } from "expo-router";
import { SafeAreaView, StyleSheet, Appearance } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayoutNav() {
  const [loaded, error] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });
  const [colorMode, setColorMode] = useState(Appearance.getColorScheme());

  useEffect(() => {
    Appearance.addChangeListener(({ colorScheme }) => {
      setColorMode(colorScheme);
    });
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <SafeAreaView
        style={colorMode === "dark" ? styles.safeAreaDark : styles.safeArea}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" />
          </Stack>
        </GestureHandlerRootView>
      </SafeAreaView>
    </AuthProvider>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  safeAreaDark: {
    flex: 1,
    backgroundColor: Colors.green,
  },
});

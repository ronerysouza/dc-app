import Colors from "@/constants/Colors";
import { AuthProvider, useAuth } from "@/context/authContext";
import { Stack } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayoutNav() {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.safeArea}>
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
    backgroundColor: Colors.green,
  },
});

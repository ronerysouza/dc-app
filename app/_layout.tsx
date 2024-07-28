import { AuthProvider } from "@/context/authAuth";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayoutNav() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
        </Stack>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}

import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="listAddresses" />
        <Stack.Screen
          name="addAddress"
          options={{
            presentation: "modal",
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}

import Colors from "@/constants/Colors";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          // headerShown: false,
          headerStyle: {
            backgroundColor: Colors.green,
          },
          headerTintColor: Colors.white,
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: "Minha conta", headerShown: false }}
        />
        <Stack.Screen
          name="listAddresses"
          options={{
            presentation: "modal",
            title: "Meus endereços",
          }}
        />
        <Stack.Screen
          name="addAddress"
          options={{
            presentation: "modal",
            title: "Novo endereço",
          }}
        />
        {/* <Stack.Screen
          name="addAddressByZipCode"
          options={{
            presentation: "modal",
          }}
        /> */}
      </Stack>
    </GestureHandlerRootView>
  );
}

import Colors from "@/constants/Colors";
import {
  Stack,
  useGlobalSearchParams,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  // const router = useRouter();
  // const params = useLocalSearchParams();

  // // console.log(params.name);

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
          // initialParams={{ name: undefined }}
        />
        <Stack.Screen
          name="listAddresses"
          options={{
            presentation: "modal",
            title: "Meus endereços",
          }}
          // initialParams={{ name: undefined }}
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

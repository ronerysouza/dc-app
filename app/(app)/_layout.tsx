import CustomHeader from "@/components/CustomHeader";
import { AuthProvider, useAuth } from "@/context/authContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "home",
};

export default function Layout() {
  const { authState } = useAuth();

  if (!authState?.authenticated) {
    return <Redirect href="/" />;
  }

  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Stack>
            <Stack.Screen
              name="home"
              options={{
                header: () => <CustomHeader />,
              }}
            />
          </Stack>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}

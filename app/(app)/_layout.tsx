import CustomHeader from "@/components/CustomHeader";
import Colors from "@/constants/Colors";
import { AuthProvider, useAuth } from "@/context/authContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Redirect, Stack } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";
// import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// export const unstable_settings = {
//   initialRouteName: "home",
// };

export default function Layout() {
  const { authState } = useAuth();

  if (!authState?.authenticated) {
    return <Redirect href="/" />;
  }

  return (
    <AuthProvider>
      <SafeAreaView style={styles.safeArea}>
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

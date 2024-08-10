import CustomHeader from "@/components/CustomHeader";
import Colors from "@/constants/Colors";
import { AuthLoggedProvider } from "@/context/authContextLogged";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <AuthLoggedProvider>
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
    </AuthLoggedProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.green,
  },
});

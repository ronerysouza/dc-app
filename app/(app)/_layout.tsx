import CustomHeader from "@/components/CustomHeader";
import Colors from "@/constants/Colors";
import { AuthLoggedProvider } from "@/context/authContextLogged";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack, Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <AuthLoggedProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: Colors.primary,
              tabBarStyle: {
                height: 60,
                paddingVertical: 8,
                backgroundColor: Colors.white,
                shadowColor: "#666666",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
              },
              tabBarItemStyle: {
                height: 44,
              },
              tabBarLabelStyle: {
                fontSize: 12,
                fontFamily: "Inter_600SemiBold",
                padding: 0,
              },
            }}
          >
            <Tabs.Screen
              name="home"
              options={{
                title: "Início",
                header: () => <CustomHeader />,
                tabBarIcon: ({ color }) => (
                  <Ionicons name="home-outline" size={24} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="orders/index"
              options={{
                title: "Pedidos",
                headerShown: false,
                tabBarIcon: ({ color }) => (
                  <Ionicons name="receipt-outline" size={24} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="account"
              options={{
                title: "Minha conta",
                headerShown: false,
                tabBarIcon: ({ color }) => (
                  <Ionicons name="person-outline" size={24} color={color} />
                ),
              }}
            />
          </Tabs>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </AuthLoggedProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.green,
  },
});

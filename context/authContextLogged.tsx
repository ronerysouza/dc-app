import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { usePathname, useRouter } from "expo-router";

interface AuthLoggedProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "my-jwt";
export const API_URL = process.env.EXPO_PUBLIC_API_URL;
const AuthContextLogged = createContext<AuthLoggedProps>({});

export const useLoggedAuth = () => {
  return useContext(AuthContextLogged);
};

export const AuthLoggedProvider = ({ children }: any) => {
  const pathUrl = usePathname();
  const router = useRouter();
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        setAuthState({
          token: token,
          authenticated: true,
        });
      } else {
        router.replace("/");
      }
    };
    loadToken();
  }, []);

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync("user");
    await SecureStore.deleteItemAsync("userResetPassword");
    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: null,
      authenticated: false,
    });
    router.replace("/");
  };

  const value = {
    onLogout: logout,
    authState,
  };
  return (
    <AuthContextLogged.Provider value={value}>
      {children}
    </AuthContextLogged.Provider>
  );
};

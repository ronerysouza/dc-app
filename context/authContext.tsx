import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { UserProfile } from "@/models/User";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onLogin?: (email: string, password: string) => Promise<any>;
  onRegister?: (
    userName: string,
    email: string,
    phone: string,
    password: string,
    userType: string
  ) => Promise<any>;
}

const TOKEN_KEY = "my-jwt";
export const API_URL = process.env.EXPO_PUBLIC_API_URL;
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
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
        router.replace("/home");
      }
    };
    loadToken();
  }, []);

  const register = async (
    userName: string,
    email: string,
    phone: string,
    password: string,
    userType: string
  ) => {
    try {
      const result = await axios.post(API_URL + "/auth/register", {
        userName: userName,
        email: email,
        phone: phone,
        password: password,
        userType: userType,
      });

      setAuthState({
        token: result?.data.saveToken.token,
        authenticated: true,
      });

      axios.defaults.headers.common["Authorization"] =
        `Bearer ${result?.data.saveToken.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result?.data.saveToken.token);

      router.replace("/home");

      return result;
    } catch (error) {
      return { error: true, msg: (error as any).response.data.message };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(API_URL + "/auth/login", {
        email: email,
        password: password,
      });

      setAuthState({
        token: result?.data.saveToken.token,
        authenticated: true,
      });

      axios.defaults.headers.common["Authorization"] =
        `Bearer ${result?.data.saveToken.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result?.data.saveToken.token);

      router.replace("/home");

      return result;
    } catch (error) {
      return { error: true, msg: (error as any).response.data.message };
    }
  };

  const value = {
    onLogin: login,
    onRegister: register,
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

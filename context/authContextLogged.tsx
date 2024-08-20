import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { usePathname, useRouter } from "expo-router";

interface AuthLoggedProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onUpdateUser?: (user: object) => Promise<any>;
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

  const updateUser = async (user: object) => {
    try {
      const result = await axios.post(API_URL + "/auth/register", user);

      // setAuthState({
      //   token: result?.data.saveToken.token,
      //   authenticated: true,
      // });

      // axios.defaults.headers.common["Authorization"] =
      //   `Bearer ${result?.data.saveToken.token}`;

      // await SecureStore.setItemAsync(TOKEN_KEY, result?.data.saveToken.token);
      // await SecureStore.setItemAsync("phoneToValidate", "+55" + phone);

      // router.replace("/phoneVerification");

      // return result;
    } catch (error) {
      return { error: true, msg: (error as any).response.data.message };
    }
  };

  const value = {
    onLogout: logout,
    onUpdateUser: updateUser,
    authState,
  };
  return (
    <AuthContextLogged.Provider value={value}>
      {children}
    </AuthContextLogged.Provider>
  );
};

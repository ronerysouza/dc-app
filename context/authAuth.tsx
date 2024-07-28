import { UserProfile } from "@/models/User";
import { useNavigation } from "@react-navigation/native";
import React, { createContext, useEffect, useState } from "react";
import { loginApi } from "@/services/authService";

type UserContextType = {
  // user: UserProfile | null;
  // token: string | null;
  // registerUser: (
  //   userName: string,
  //   email: string,
  //   phone: string,
  //   password: string,
  //   answer: string,
  //   userType: string
  // ) => void;
  loginUser: (email: string, password: string) => void;
  // logout: () => void;
  // isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };
const AuthContext = createContext<UserContextType>({} as UserContextType);

export const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigation();
  const [token, setToken] = useState<String | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReaady, setIsReady] = useState(false);

  useEffect(() => {
    // const user = localStorage.getItem("user");
    // const token = localStorage.getItem("token");
    // if (user && token) {
    //   setUser(JSON.parse(user));
    //   setToken(token);
    // }
    // setIsReady(true);
  }, []);

  const register = async (
    userName: string,
    email: string,
    phone: string,
    password: string,
    answer: string,
    userType: string
  ) => {};

  const loginUser = async (email: string, password: string) => {
    await loginApi(email, password).then((res) => {
      if (res) {
        console.log(res);
        // SecureStore.setItemAsync("user", value);
      } else {
        console.log("Errooooooooooouuuuu");
      }
    });
  };

  return (
    <AuthContext.Provider value={{ loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const authUser = () => React.useContext(AuthContext);

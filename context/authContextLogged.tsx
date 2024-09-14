import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import * as Location from "expo-location";
import { usePathname, useRouter } from "expo-router";

interface AuthLoggedProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onUpdateUser?: (user: object) => Promise<any>;
  onGetUser?: (user: object) => Promise<any>;
  onChangeAddress?: () => Promise<any>;
  onSelectedAddress?: () => Promise<any>;
  onGetCurrentLocation?: () => Promise<any>;
  onSaveAddress?: (address: object) => Promise<any>;
  onUnsetMainAddress?: () => Promise<any>;
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

  const [errorMsg, setErrorMsg] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [address, setAddress] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

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
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        router.replace("/");
      }
    };

    loadToken();
    // loadAddressLocation();
  }, []);

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync("user");
    await SecureStore.deleteItemAsync("userResetPassword");
    await SecureStore.deleteItemAsync("userInfos");
    await SecureStore.deleteItemAsync("selectedAddress");
    await SecureStore.deleteItemAsync("userId");

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

  const getUser = async () => {
    // const token = await SecureStore.getItemAsync(TOKEN_KEY);
    // if (user) {
    //   return user;
    // }
    // const userInfos = await SecureStore.getItemAsync("userInfos");
    // return userInfos;
    // console.log("Infos User::::::::");
    // console.log(userInfos);
    // console.log(user);
    // const result = await axios.post(API_URL + "/address/user/", user);
  };

  const changeAddress = async () => {
    // const token = await SecureStore.getItemAsync(TOKEN_KEY);
    const userInfos = await SecureStore.getItemAsync("userInfos");
    // console.log("Infos User:::::::");
    // console.log(userInfos);

    return userInfos;
    // console.log(user);
    // const result = await axios.post(API_URL + "/address/user/", user);
  };

  const selectedAddress = async () => {
    const address = await SecureStore.getItemAsync("selectedAddress");
    // console.log("Selecionadooooooo:::::");
    // console.log(address);
    return address;

    // console.log(JSON.stringify(user));

    // if (JSON.stringify(user)) {
    // }
    // const token = await SecureStore.getItemAsync(TOKEN_KEY);
    // const addresses = user
    // const selectedAddress = JSON.stringify(
    //   await SecureStore.getItemAsync("selectedAddress")
    // );

    // if (!selectedAddress) {
    //   console.log("Sem endereço");
    //   return null;
    // }

    // return selectedAddress;

    // const userInfos = await SecureStore.getItemAsync("userInfos");
    // // console.log("Infos User:::::::");
    // // console.log(userInfos);

    // return userInfos;
    // console.log(user);
    // const result = await axios.post(API_URL + "/address/user/", user);
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permissão de localização negada!");
      return;
    }

    let { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;
      setLatitude(latitude);
      setLongitude(longitude);

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      return response;

      // setAddress(response[0]);

      // console.log(response[0]);
    }
  };

  const saveAddress = async (address: object) => {
    await unsetMainAddress();
    let result = await axios.post(API_URL + "/address/create", address);

    // console.log("Eitaaaaa");
    // console.log(result?.data);

    if (result?.data.success) {
      await SecureStore.deleteItemAsync("selectedAddress");
      await SecureStore.setItemAsync(
        "selectedAddress",
        JSON.stringify(address)
      );
      return result?.data;
    }
  };

  const unsetMainAddress = async () => {
    try {
      // console.log(user);

      const userId = await SecureStore.getItemAsync("userId");
      // console.log(userId);

      if (userId) {
        const result = await axios.put(
          API_URL + "/address/unsetMainAddress/user/" + userId
        );

        if (result?.data.success) {
          return result?.data.success;
        }
        console.log(result?.data);
        return null;
      }

      return null;
    } catch (error) {
      return { error: true, msg: (error as any).response.data.message };
    }
  };

  const value = {
    onLogout: logout,
    onUpdateUser: updateUser,
    onGetUser: getUser,
    onChangeAddress: changeAddress,
    onSelectedAddress: selectedAddress,
    onGetCurrentLocation: getCurrentLocation,
    onSaveAddress: saveAddress,
    onUnsetMainAddress: unsetMainAddress,
    authState,
  };
  return (
    <AuthContextLogged.Provider value={value}>
      {children}
    </AuthContextLogged.Provider>
  );
};

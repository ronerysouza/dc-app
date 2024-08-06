import { View, Text } from "react-native";
import React, { useEffect } from "react";
import axios from "axios";
import { API_URL } from "@/context/authContext";

const Page = () => {
  // useEffect(() => {
  //   const testCall = async () => {
  //     const userInfos = await axios.get(`${API_URL}/user/getUser`);
  //     console.log("User infos: " + JSON.stringify(userInfos));
  //   };
  //   testCall();
  // }, []);
  return (
    <View>
      <Text>Page</Text>
    </View>
  );
};

export default Page;

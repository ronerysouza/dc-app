import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { useAuth } from "@/context/authContext";
import { globalStyles } from "@/assets/styles/styles";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { onLogin } = useAuth();

  const sendForm = async () => {
    // const result = await onLogin!(email, password);
  };

  return (
    <View style={globalStyles.container}>
      <Image
        source={require("@/assets/images/logo-delivery-chapada-login.png")}
        style={globalStyles.logo}
      />

      <View style={globalStyles.boxLogin}>
        <Text style={globalStyles.titleLogin}>Recuperar senha</Text>

        <View style={globalStyles.boxLabel}>
          <Text style={globalStyles.textLabel}>E-mail:</Text>
          <TextInput
            style={globalStyles.inputLogin}
            placeholder="E-mail"
            placeholderTextColor={"#999999"}
            onChangeText={setEmail}
            value={email}
          />
        </View>

        <TouchableOpacity
          style={globalStyles.buttonSubmit}
          onPress={() => sendForm()}
        >
          <Text style={globalStyles.textButtonSubmit}>continuar</Text>
        </TouchableOpacity>

        <Link replace href={"/"} asChild>
          <TouchableOpacity style={globalStyles.linkForgotPassword}>
            <Text style={globalStyles.textLinkRegister}>Voltar para login</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ForgotPassword;

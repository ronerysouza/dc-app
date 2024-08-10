import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { useAuth } from "@/context/authContext";
import { globalStyles } from "@/assets/styles/styles";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "my-jwt";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin } = useAuth();

  const [load, setLoad] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (!token) {
        setLoad(false);
      }
    };
    loadToken();
  }, []);

  const sendForm = async () => {
    const result = await onLogin!(email, password);
  };

  if (load) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  } else {
    return (
      <View style={globalStyles.container}>
        <Image
          source={require("@/assets/images/logo-delivery-chapada-login.png")}
          style={globalStyles.logo}
        />

        <View style={globalStyles.boxLogin}>
          <Text style={globalStyles.titleLogin}>Identifique-se</Text>

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

          <View style={globalStyles.boxLabel}>
            <Text style={globalStyles.textLabel}>Senha:</Text>
            <TextInput
              secureTextEntry={true}
              style={globalStyles.inputLogin}
              placeholder="Senha"
              placeholderTextColor={"#999999"}
              onChangeText={setPassword}
              value={password}
            />
          </View>

          <TouchableOpacity
            style={globalStyles.buttonSubmit}
            onPress={() => sendForm()}
          >
            <Text style={globalStyles.textButtonSubmit}>entrar</Text>
          </TouchableOpacity>

          <Link replace href={"/forgotPassword"} asChild>
            <TouchableOpacity style={globalStyles.linkForgotPassword}>
              <Text style={globalStyles.textLinkForgotPassword}>
                Esqueceu sua senha?
              </Text>
            </TouchableOpacity>
          </Link>

          <Text style={globalStyles.titleNotRegistered}>
            Ainda não é cadastrado?
          </Text>
          <Link replace href={"/register"} asChild>
            <TouchableOpacity style={globalStyles.linkForgotPassword}>
              <Text style={globalStyles.textLinkRegister}>
                Registre-se agora!
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({});

export default Login;

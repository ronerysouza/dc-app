import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { useAuth } from "@/context/authContext";
import { globalStyles } from "@/assets/styles/styles";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "my-jwt";

interface LoginInterface {
  email?: string;
  password?: string;
  invalid?: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginInterface>({});
  const [load, setLoad] = useState(true);
  const { onLogin } = useAuth();

  const validateForm = () => {
    var errorsObj: LoginInterface = {};

    if (!email) errorsObj.email = "E-mail obrigatório.";
    if (!password) errorsObj.password = "Senha obrigatória.";

    setErrors(errorsObj);

    return Object.keys(errors).length === 0;
  };

  const sendForm = async () => {
    if (validateForm()) {
      const result = await onLogin!(email, password);
      if (result.error) {
        setErrors({ invalid: result.msg });
      }
    }
  };

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (!token) {
        setLoad(false);
      }
    };
    loadToken();
  }, []);

  if (load) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  } else {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={globalStyles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={globalStyles.inner}>
            <Image
              source={require("@/assets/images/logo-delivery-chapada-login.png")}
              style={globalStyles.logo}
            />

            <View style={globalStyles.boxLogin}>
              <Text style={globalStyles.titleLogin}>Identifique-se</Text>

              <View
                style={[
                  globalStyles.boxLabel,
                  errors.email ? globalStyles.inputError : null,
                ]}
              >
                <Text style={globalStyles.textLabel}>E-mail:</Text>
                <TextInput
                  keyboardType="email-address"
                  inputMode="email"
                  autoCapitalize="none"
                  style={globalStyles.inputLogin}
                  placeholder="E-mail"
                  placeholderTextColor={"#999999"}
                  onChangeText={setEmail}
                  value={email}
                />
              </View>
              {errors.email ? (
                <Text style={globalStyles.errorTextMessage}>
                  {errors.email}
                </Text>
              ) : null}

              <View
                style={[
                  globalStyles.boxLabel,
                  errors.password ? globalStyles.inputError : null,
                ]}
              >
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
              {errors.password ? (
                <Text style={globalStyles.errorTextMessage}>
                  {errors.password}
                </Text>
              ) : null}
              {errors.invalid ? (
                <View style={globalStyles.errorBoxMessage}>
                  <Text style={globalStyles.errorTextBoxMessage}>
                    {errors.invalid}
                  </Text>
                </View>
              ) : null}

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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
};

const styles = StyleSheet.create({});

export default Login;

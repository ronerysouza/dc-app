import {
  View,
  Text,
  SafeAreaView,
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
import { Link, useRouter } from "expo-router";
import { useAuth } from "@/context/authContext";
import { globalStyles } from "@/assets/styles/styles";
import * as SecureStore from "expo-secure-store";

interface ResetInterface {
  email?: string;
  code?: string;
  pass?: string;
  confirmPass?: string;
  invalid?: string;
}

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [screen, setScreen] = useState("email");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [load, setLoad] = useState(true);

  const [errors, setErrors] = useState<ResetInterface>({});
  const { onSaveCode, onValidateCode, onResetPassword } = useAuth();

  useEffect(() => {
    const loadToken = async () => {
      const screenCode = await SecureStore.getItemAsync("userResetPassword");
      if (screenCode) {
        setScreen("newPassword");
      }
      setLoad(false);
    };
    loadToken();
  }, []);

  const validateForm = () => {
    var errorsObj: ResetInterface = {};

    if (!email) errorsObj.email = "E-mail obrigatório.";

    setErrors(errorsObj);

    return Object.keys(errors).length === 0;
  };

  const sendForm = async () => {
    if (validateForm()) {
      const result = await onSaveCode!(email);
      if (result.error) {
        setErrors({ invalid: result.msg });
        return;
      }

      setScreen("code");
    }
  };

  const validateCode = async () => {
    let userId = await SecureStore.getItemAsync("userResetPassword");
    var errorsObj: ResetInterface = {};

    if (!code) errorsObj.code = "Código é obrigatório";

    setErrors(errorsObj);

    const qtdErrors = Object.keys(errors).length === 0;

    if (userId && qtdErrors) {
      const result = await onValidateCode!(code, userId);
      if (result.error) {
        setErrors({ invalid: result.msg });
        return;
      }

      setScreen("newPassword");
    }
    // const result = await onLogin!(email, password);
  };

  const validateNewPassword = async () => {
    var errorsObj: ResetInterface = {};
    let userId = await SecureStore.getItemAsync("userResetPassword");

    if (!pass) errorsObj.pass = "Nova senha é obrigatória";
    if (!confirmPass)
      errorsObj.confirmPass = "Confirmação de senha é obrigatória";
    if (pass !== confirmPass) errorsObj.invalid = "Senhas não conferem";
    setErrors(errorsObj);

    const qtdErrors = Object.keys(errors).length === 0;

    if (userId && qtdErrors) {
      const result = await onResetPassword!(userId, pass, code);
      if (result.error) {
        setErrors({ invalid: result.msg });
        return;
      }
      await SecureStore.deleteItemAsync("userResetPassword");

      alert(
        "Senha alterada com sucesso! Agora é só fazer login com sua nova senha."
      );
      router.replace("/");
    }
  };

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

          {screen === "email" && !load ? (
            <View style={globalStyles.boxLogin}>
              <Text style={globalStyles.titleLogin}>Recuperar senha</Text>

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
                <Text style={globalStyles.textButtonSubmit}>continuar</Text>
              </TouchableOpacity>

              <Link replace href={"/"} asChild>
                <TouchableOpacity style={globalStyles.linkForgotPassword}>
                  <Text style={globalStyles.textLinkRegister}>
                    Voltar para login
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          ) : screen === "code" && !load ? (
            <View style={globalStyles.boxLogin}>
              <Text style={globalStyles.titleLogin}>Validação</Text>
              <Text style={globalStyles.subTitleLogin}>
                Digite o código recebido no seu e-mail
              </Text>

              <View
                style={[
                  globalStyles.boxLabel,
                  errors.code ? globalStyles.inputError : null,
                ]}
              >
                <Text style={globalStyles.textLabel}>Código:</Text>
                <TextInput
                  keyboardType="numeric"
                  maxLength={5}
                  style={globalStyles.inputLogin}
                  placeholder="00000"
                  placeholderTextColor={"#999999"}
                  onChangeText={setCode}
                  value={code}
                />
              </View>

              {errors.code ? (
                <Text style={globalStyles.errorTextMessage}>{errors.code}</Text>
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
                onPress={() => validateCode()}
              >
                <Text style={globalStyles.textButtonSubmit}>continuar</Text>
              </TouchableOpacity>

              {/* <Link replace href={"/"} asChild> */}
              <TouchableOpacity
                style={globalStyles.linkForgotPassword}
                onPress={() => setScreen("email")}
              >
                <Text style={globalStyles.textLinkRegister}>
                  Reenviar código
                </Text>
              </TouchableOpacity>
              {/* </Link> */}
            </View>
          ) : screen === "newPassword" && !load ? (
            <View style={globalStyles.boxLogin}>
              <Text style={globalStyles.titleLogin}>Redefinir senhas</Text>

              <View
                style={[
                  globalStyles.boxLabel,
                  errors.pass ? globalStyles.inputError : null,
                ]}
              >
                <Text style={globalStyles.textLabel}>Nova senha:</Text>
                <TextInput
                  secureTextEntry={true}
                  style={globalStyles.inputLogin}
                  placeholder="Digite nova senha"
                  placeholderTextColor={"#999999"}
                  onChangeText={setPass}
                  value={pass}
                />
              </View>

              {errors.pass ? (
                <Text style={globalStyles.errorTextMessage}>{errors.pass}</Text>
              ) : null}

              <View
                style={[
                  globalStyles.boxLabel,
                  errors.confirmPass ? globalStyles.inputError : null,
                ]}
              >
                <Text style={globalStyles.textLabel}>
                  Confirmar nova senha:
                </Text>
                <TextInput
                  secureTextEntry={true}
                  style={globalStyles.inputLogin}
                  placeholder="Confirme nova senha"
                  placeholderTextColor={"#999999"}
                  onChangeText={setConfirmPass}
                  value={confirmPass}
                />
              </View>

              {errors.confirmPass ? (
                <Text style={globalStyles.errorTextMessage}>
                  {errors.confirmPass}
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
                onPress={() => validateNewPassword()}
              >
                <Text style={globalStyles.textButtonSubmit}>mudar senha</Text>
              </TouchableOpacity>

              {/* <Link replace href={"/"} asChild> */}
              <TouchableOpacity
                style={globalStyles.linkForgotPassword}
                onPress={() => setScreen("email")}
              >
                <Text style={globalStyles.textLinkRegister}>cancelar</Text>
              </TouchableOpacity>
              {/* </Link> */}
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({});

export default ForgotPassword;

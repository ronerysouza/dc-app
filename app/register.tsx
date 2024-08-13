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
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { useAuth } from "@/context/authContext";
import { globalStyles } from "@/assets/styles/styles";

interface RegisterInterface {
  userName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  answer?: string;
  userType?: string;
  invalid?: string;
}

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<RegisterInterface>({});
  const { onRegister } = useAuth();

  const validateForm = () => {
    var errorsObj: RegisterInterface = {};

    if (!userName) errorsObj.userName = "Nome é obrigatório.";
    if (!email) errorsObj.email = "E-mail obrigatório.";
    if (!phone) errorsObj.phone = "Nº celular obrigatório.";
    // if (!answer) errorsObj.answer = "Resposta obrigatória.";
    if (!password) errorsObj.password = "Senha obrigatória.";
    // if (!confirmPassword)
    //   errorsObj.confirmPassword = "Confirmação de senha obrigatória.";
    // if (password !== confirmPassword)
    //   errorsObj.confirmPassword = "Senhas não conferem.";

    setErrors(errorsObj);

    return Object.keys(errors).length === 0;
  };

  const sendForm = async () => {
    if (validateForm()) {
      const result = await onRegister!(
        userName,
        email,
        phone,
        password,
        "client"
      );

      if (result.error) {
        setErrors({ invalid: result.msg });
        return;
      }
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

          <View style={globalStyles.boxLogin}>
            <Text style={globalStyles.titleLogin}>Cadastre-se</Text>

            <View
              style={[
                globalStyles.boxLabel,
                errors.userName ? globalStyles.inputError : null,
              ]}
            >
              <Text style={globalStyles.textLabel}>Nome completo:</Text>
              <TextInput
                style={globalStyles.inputLogin}
                placeholder="Nome completo"
                placeholderTextColor={"#999999"}
                onChangeText={setUserName}
                value={userName}
              />
            </View>
            {errors.userName ? (
              <Text style={globalStyles.errorTextMessage}>
                {errors.userName}
              </Text>
            ) : null}

            <View
              style={[
                globalStyles.boxLabel,
                errors.email ? globalStyles.inputError : null,
              ]}
            >
              <Text style={globalStyles.textLabel}>E-mail:</Text>
              <TextInput
                style={globalStyles.inputLogin}
                placeholder="E-mail"
                placeholderTextColor={"#999999"}
                onChangeText={setEmail}
                value={email}
              />
            </View>
            {errors.email ? (
              <Text style={globalStyles.errorTextMessage}>{errors.email}</Text>
            ) : null}

            <View
              style={[
                globalStyles.boxLabel,
                errors.phone ? globalStyles.inputError : null,
              ]}
            >
              <Text style={globalStyles.textLabel}>Celular:</Text>
              <TextInput
                style={globalStyles.inputLogin}
                placeholder="Celular"
                placeholderTextColor={"#999999"}
                onChangeText={setPhone}
                value={phone}
              />
            </View>
            {errors.phone ? (
              <Text style={globalStyles.errorTextMessage}>{errors.phone}</Text>
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

            {/* <View
          style={[
            globalStyles.boxLabel,
            errors.confirmPassword ? globalStyles.inputError : null,
          ]}
        >
          <Text style={globalStyles.textLabel}>Confirmar senha:</Text>
          <TextInput
            secureTextEntry={true}
            style={globalStyles.inputLogin}
            placeholder="Confirmar senha"
            placeholderTextColor={"#999999"}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
        </View>
        {errors.confirmPassword ? (
          <Text style={globalStyles.errorTextMessage}>
            {errors.confirmPassword}
          </Text>
        ) : null} */}

            {/* <View
          style={[
            globalStyles.boxLabel,
            errors.answer ? globalStyles.inputError : null,
          ]}
        >
          <Text style={globalStyles.textLabel}>Palavra ou frase secreta:</Text>
          <TextInput
            style={globalStyles.inputLogin}
            placeholder="Digite palavra ou frase secreta"
            placeholderTextColor={"#999999"}
            onChangeText={setAnswer}
            value={answer}
          />
        </View>
        {errors.answer ? (
          <Text style={globalStyles.errorTextMessage}>{errors.answer}</Text>
        ) : null} */}

            <TouchableOpacity
              style={globalStyles.buttonSubmit}
              onPress={() => sendForm()}
            >
              <Text style={globalStyles.textButtonSubmit}>continuar</Text>
            </TouchableOpacity>

            <Text style={globalStyles.titleNotRegistered}>
              Já é cadastrado?
            </Text>
            <Link replace href={"/"} asChild>
              <TouchableOpacity style={globalStyles.linkForgotPassword}>
                <Text style={globalStyles.textLinkRegister}>Faça login</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({});

export default Register;

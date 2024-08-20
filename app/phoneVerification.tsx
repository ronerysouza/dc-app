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
import { Link, useRouter } from "expo-router";
import { useAuth } from "@/context/authContext";
import { globalStyles } from "@/assets/styles/styles";

import * as SecureStore from "expo-secure-store";

interface CodeInterface {
  code?: string;
  invalid?: string;
}

const PhoneVerification = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<CodeInterface>({});
  const { onValidateSmsCode, onSendSmsCode, onValidatePhone } = useAuth();

  const validateForm = () => {
    var errorsObj: CodeInterface = {};

    if (!code) errorsObj.code = "Código é obrigatório.";

    setErrors(errorsObj);

    return Object.keys(errors).length === 0;
  };

  const sendForm = async () => {
    if (validateForm()) {
      const result = await onValidateSmsCode!(code, phone);

      if (result.error) {
        setErrors({ invalid: "Ops, algo errado com o código!" });
        return;
      }

      const update = await onValidatePhone!();

      if (update?.success) {
        await SecureStore.deleteItemAsync("phoneToValidate");
      }

      alert("Telefone validado com sucesso. Aproveite nosso app.");

      router.replace("/home");
      return;
    }
  };

  useEffect(() => {
    const loadCode = async () => {
      const phone = await SecureStore.getItemAsync("phoneToValidate");

      if (!phone) {
        router.replace("/home");
        return;
      }

      if (phone) {
        setPhone(phone);

        const result = await onSendSmsCode!(phone);

        if (result.error) {
          setErrors({
            invalid:
              "Caso náo tenha recebido o código, aguarde um instante para enviar outro.",
          });
          return;
        }
        return;
      }
    };
    loadCode();
  }, []);

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
            <Text style={globalStyles.titleLogin}>Validação de telefone</Text>

            <View
              style={[
                globalStyles.boxLabel,
                errors.code ? globalStyles.inputError : null,
              ]}
            >
              <Text style={globalStyles.textLabel}>
                Código recebido via SMS:
              </Text>
              <TextInput
                keyboardType="numeric"
                maxLength={5}
                style={globalStyles.inputLogin}
                placeholder=""
                placeholderTextColor={"#999999"}
                onChangeText={setCode}
                value={code}
              />
            </View>
            {errors.code ? (
              <Text style={globalStyles.errorTextMessage}>{errors.code}</Text>
            ) : null}

            <TouchableOpacity
              style={globalStyles.buttonSubmit}
              onPress={() => sendForm()}
            >
              <Text style={globalStyles.textButtonSubmit}>Validar</Text>
            </TouchableOpacity>

            <Text style={globalStyles.titleNotRegistered}>
              Não recebeu o código?
            </Text>
            <TouchableOpacity style={globalStyles.linkForgotPassword}>
              <Text style={globalStyles.textLinkRegister}>Reenviar</Text>
            </TouchableOpacity>
            <Link replace href={"/home"} asChild>
              <TouchableOpacity style={globalStyles.linkForgotPassword}>
                <Text style={globalStyles.textLinkRegister}>
                  Pular verificação
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({});

export default PhoneVerification;

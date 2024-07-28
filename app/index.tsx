import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";

const Login = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/logo-delivery-chapada-login.png")}
          style={styles.logo}
        />

        <View style={styles.boxLogin}>
          <Text style={styles.titleLogin}>Identifique-se</Text>

          <View style={styles.boxLabel}>
            <Text style={styles.textLabel}>E-mail:</Text>
            <TextInput
              style={styles.inputLogin}
              placeholder="E-mail"
              placeholderTextColor={"#999999"}
            />
          </View>

          <View style={styles.boxLabel}>
            <Text style={styles.textLabel}>Senha:</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.inputLogin}
              placeholder="Senha"
              placeholderTextColor={"#999999"}
            />
          </View>

          <TouchableOpacity style={styles.buttonSubmit}>
            <Text style={styles.textButtonSubmit}>entrar</Text>
          </TouchableOpacity>

          <Link href={""} asChild>
            <TouchableOpacity style={styles.linkForgotPassword}>
              <Text style={styles.textLinkForgotPassword}>
                Esqueceu sua senha?
              </Text>
            </TouchableOpacity>
          </Link>

          <Text style={styles.titleNotRegistered}>Ainda não é cadastrado?</Text>
          <Link href={""} asChild>
            <TouchableOpacity style={styles.linkForgotPassword}>
              <Text style={styles.textLinkRegister}>Registre-se agora!</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.green,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    flexDirection: "column",
  },
  logo: {
    marginBottom: 24,
  },
  boxLogin: {},
  titleLogin: {
    fontSize: 28,
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "600",
  },
  boxLabel: {
    borderColor: Colors.medium,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    position: "relative",
    flexDirection: "row",
    marginBottom: 16,
  },
  textLabel: {
    position: "absolute",
    top: -12,
    left: 5,
    padding: 5,
    backgroundColor: Colors.white,
    color: Colors.medium,
    fontSize: 12,
  },
  inputLogin: {
    width: "80%",
    paddingVertical: 8,
    fontSize: 16,
  },
  buttonSubmit: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 4,
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  textButtonSubmit: {
    flex: 1,
    color: Colors.white,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  linkForgotPassword: {
    marginHorizontal: "auto",
    marginVertical: 16,
  },
  textLinkForgotPassword: {},
  textLinkRegister: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.blue,
  },
  titleNotRegistered: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 12,
  },
});

export default Login;

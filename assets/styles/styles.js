import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
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
  errorBoxMessage: {
    borderColor: Colors.red,
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
  },
  errorTextMessage: {
    color: Colors.red,
    fontSize: 12,
    marginTop: -10,
    marginBottom: 16,
  },
  errorTextBoxMessage: { color: Colors.red, fontSize: 12 },
  inputError: {
    borderColor: Colors.red,
  },
});

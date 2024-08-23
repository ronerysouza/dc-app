import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.green,
  },
  titleSection: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
  },
  textDefault: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    flexDirection: "column",
  },
  inner: {
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  logo: {
    marginBottom: 24,
  },
  boxLogin: {},
  titleLogin: {
    fontSize: 28,
    marginBottom: 24,
    textAlign: "center",
    fontFamily: "Inter_700Bold",
  },
  subTitleLogin: {
    fontSize: 14,
    marginBottom: 24,
    textAlign: "center",
    fontFamily: "Inter_600SemiBold",
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
    fontFamily: "Inter_400Regular",
  },
  inputLogin: {
    width: "80%",
    paddingVertical: 8,
    fontSize: 16,
    fontFamily: "Inter_400Regular",
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
    fontFamily: "Inter_600SemiBold",
  },
  linkForgotPassword: {
    marginHorizontal: "auto",
    marginVertical: 16,
  },
  textLinkForgotPassword: {
    fontFamily: "Inter_400Regular",
  },
  textLinkRegister: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: Colors.blue,
  },
  titleNotRegistered: {
    fontFamily: "Inter_400Regular",
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
    fontFamily: "Inter_400Regular",
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

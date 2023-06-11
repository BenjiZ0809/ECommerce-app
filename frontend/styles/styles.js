import { Platform, StyleSheet, StatusBar } from "react-native";

export const Colors = {
  primary500: "#344E41",
  primary400: "#3A5A40",
  primary300: "#588157",
  white: "white",
  gray500: "rgb(45,45,45)",
  transparent: "transparent",
  white500: "#f2f2f2",
  white300: "#f7f7f7",
};

export const defaultStyles = StyleSheet.create({
  flex: 1,
  padding: 35,
  paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  backgroundColor: Colors.white,
});

export const inputStyles = StyleSheet.create({
  height: 50,
  marginVertical: 10,
  marginHorizontal: 20,
  backgroundColor: Colors.white,
  borderRadius: 5,
});

export const formHeading = {
  borderRadius: 5,
  fontSize: 25,
  fontWeight: 500,
  textAlign: "center",
  backgroundColor: Colors.gray500,
  color: Colors.white,
  padding: 5,
};

export const inputOptions = {
  styles: inputStyles,
  mode: "outlined",
  activeOutlineColor: Colors.primary500,
};

export const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.gray500,
    borderRadius: 10,
    justifyContent: "center",
    elevation: 10,
    shadowColor: Colors.gray500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  forgetText: {
    color: Colors.white,
    marginHorizontal: 20,
    marginVertical: 10,
    alignSelf: "flex-end",
    fontWeight: 300,
  },
  btn: {
    backgroundColor: Colors.primary500,
    margin: 20,
    padding: 6,
  },
  or: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: 200,
    color: Colors.white,
  },
  link: {
    alignSelf: "center",
    color: Colors.white,
    fontSize: 18,
    textTransform: "capitalize",
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

export const defaultImg =
  "https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg";

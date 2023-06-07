import { Platform, StyleSheet, StatusBar } from 'react-native';

export const Colors = {
  primary500: '#344E41',
  primary400: '#3A5A40',
  primary300: '#588157',
  gray500: 'rgb(45,45,45)',
  transparent: 'transparent',
  white50: 'white',
  white500: '#f2f2f2',
  white300: '#f7f7f7',
};

export const defaultStyles = StyleSheet.create({
  flex: 1,
  padding: 35,
  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  backgroundColor: Colors.white50,
});

export const inputStyles = StyleSheet.create({
  height: 50,
  marginVertical: 10,
  marginHorizontal: 20,
  backgroundColor: Colors.white50,
});

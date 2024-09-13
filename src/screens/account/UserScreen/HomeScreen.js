import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InfoUser } from '../../../components/Account'; // Verifica la ruta
import { styles } from './HomeScreenStyle'; // Verifica la ruta
import { screen } from "../../../utils/screenName";

export function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    try {
      // Borra el token y la información del usuario del almacenamiento
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userInfo');
      // Navega a la pantalla de inicio de sesión
      navigation.navigate(screen.home.tab, { screen: screen.home.sesion });
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  };

  const handleMenu = () => {
    navigation.navigate(screen.drive.tab, { screen: screen.drive.inicio });
  };

  return (
    <View style={styles.container}>
      <InfoUser />
      <TouchableOpacity style={styles.buttonMenu} onPress={handleMenu}>
        <Text style={styles.buttonText}>Menú</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

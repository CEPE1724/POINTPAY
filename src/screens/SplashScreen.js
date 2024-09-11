// src/screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../../assets/ponty.png';

export default function SplashScreen() {
  const navigation = useNavigation();

  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Main'); // Navega a la pantalla principal después de 5 segundos
    }, 5000); // 5 segundos

    return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta antes de 5 segundos
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={[styles.image, { width, height: height * 0.4 }]}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#fff" />
      <Text style={styles.text}>Cargando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#022b58',
  },
  image: {
    marginBottom: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    color: '#fff',
  },
});

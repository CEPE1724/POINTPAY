// src/navigation/AppNavigator.js
import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from '../screens/SplashScreen'; // Importación por defecto
import DriveScreen from '../screens/DriveScreen';   // Importación por defecto
import HomeScreen from '../screens/HomeScreen';     // Importación por defecto
import LoginScreen from '../screens/LoginScreen';   // Importación por defecto

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Drive" component={DriveScreen} />
    <Tab.Screen name="Home" component={HomeScreen} />
  </Tab.Navigator>
);

export function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Simula la verificación del token o del estado de inicio de sesión
    setTimeout(() => {
      // Aquí podrías verificar el estado real de autenticación
      setIsLoggedIn(true); // Cambia esto según el estado real de autenticación
    }, 5000); // Ajusta este tiempo según necesites
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      {!isLoggedIn ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <Stack.Screen name="Main" component={TabNavigator} />
      )}
    </Stack.Navigator>
  );
}

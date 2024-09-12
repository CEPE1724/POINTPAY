import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Gestionstack } from "./Gestionstack";
import { AccountStack } from "./AccountStack";
import { Registrostack } from "./Registrostack"; 
import { Icon } from "react-native-elements";
import { screen } from "../utils";
import SplashScreen from "../screens/SplashScreen";
import {LoginScreen} from "../screens/LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: "#022b58",
      tabBarInactiveTintColor: "#8f9bb3",
      tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
    })}
  >
    <Tab.Screen 
      name={screen.drive.tab} 
      component={Gestionstack} 
      options={{ title: "Inicio" }}
    />
    <Tab.Screen 
      name={screen.registro.tab} 
      component={Registrostack} 
      options={{ title: "Registros" }}
    />
    <Tab.Screen 
      name={screen.home.tab} 
      component={AccountStack} 
      options={{ 
        tabBarStyle: { display: 'none' },
        title: "Cuenta" // Oculta la barra de pestañas en LoginScreen
      }}
    />
  </Tab.Navigator>
);

function screenOptions(route, color, size) {
  let iconName;
  if (route.name === screen.home.tab) {
    iconName = "account-circle";
  }
  if (route.name === screen.drive.tab) {
    iconName = "home";
  }
  if (route.name === screen.registro.tab) {
    iconName = "book";
  }
  return (
    <Icon type="material-community" name={iconName} color={color} size={size} />
  );
}

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Main" component={TabNavigator} />
  </Stack.Navigator>
);

export function AppNavigator() {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Simula la verificación del token o del estado de inicio de sesión
        const token = await AsyncStorage.getItem("userToken");
        setIsLoggedIn(!!token); // Cambia esto según el estado real de autenticación
      } catch (error) {
        console.error("Error checking login status:", error);
      } finally {
        setIsCheckingAuth(false); // Indica que la verificación ha terminado
      }
    };

    checkLoginStatus();
  }, []);

  if (isCheckingAuth) {
    return <SplashScreen />; // Muestra el SplashScreen mientras se verifica el estado de autenticación
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="Main" component={TabNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}

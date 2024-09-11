import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SplashScreen from "../screens/SplashScreen";
import DriveScreen from "../screens/DriveScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from "react-native-elements";
import { screen } from "../utils";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: "#022b58",
      tabBarInactiveTintColor: "#8f9bb3",
      tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
    })}
  >
    <Tab.Screen 
    name={screen.drive.tab} 
    component={DriveScreen} 
    options={{ title: "Drive" }}
    />
    <Tab.Screen name={screen.home.tab} 
    component={HomeScreen} 
    options={{ title: "Home" }}
    />
  </Tab.Navigator>
);

function screenOptions(route, color, size) {
  let iconName;
  if (route.name === screen.home.tab) {
    iconName = "home-outline";
  }
  if (route.name === screen.drive.tab) {
    iconName = "car";
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
      // Simula la verificación del token o del estado de inicio de sesión
      setTimeout(async () => {
        const token = await AsyncStorage.getItem("userToken");
        setIsLoggedIn(!!token); // Cambia esto según el estado real de autenticación
        setIsCheckingAuth(false); // Indica que la verificación ha terminado
      }, 5000); // Ajusta este tiempo según necesites
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

import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DashBoardStack } from "./DashBoardStack";
import { AccountStack } from "./AccountStack";
import { Registrostack } from "./Registrostack";
import { Terrenostack } from "./Terrenostack";
import { Icon } from "react-native-elements";
import { screen } from "../utils";
import SplashScreen from "../screens/SplashScreen";
import { LoginScreen } from "../screens/LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, Text, Keyboard } from "react-native";
import { LocationTracker } from "../components/Location/Location";
import LocationSender from "../components/Location/LocationSender";
import { GestionDiariaStack } from "./GestionDiariaStack";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <>
      <LocationSender />
      <LocationTracker />

      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#ffffff",
          tabBarInactiveTintColor: "#ffffff",
          tabBarStyle: {
            display: isKeyboardVisible ? "none" : "flex", // Oculta el tab bar si el teclado está visible
            backgroundColor: "#1c2463",
            borderTopWidth: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            overflow: "hidden",
          },
          tabBarIcon: ({ color, size, focused }) =>
            renderIcon(route, color, size, focused),
          tabBarLabel: ({ focused }) =>
            focused ? <Text style={styles.label}>{renderLabel(route)}</Text> : null,
        })}
      >
        <Tab.Screen
          name={screen.drive.tab}
          component={DashBoardStack}
          options={{ title: "Inicio" }}
        />
        <Tab.Screen
          name={screen.registro.tab}
          component={Registrostack}
          options={{ title: "Registros" }}
        />
        <Tab.Screen
          name={screen.gestionDiaria.tab}
          component={GestionDiariaStack}
          options={{ title: "Gestión Diaria" }}
        />
        <Tab.Screen
          name={screen.terreno.tab}
          component={Terrenostack}
          options={{ title: "Terreno" }}
        />
        <Tab.Screen
          name={screen.home.tab}
          component={AccountStack}
          options={{
            tabBarStyle: { display: "none" },
            title: "Cuenta",
          }}
        />
      </Tab.Navigator>
    </>
  );
};

function renderIcon(route, color, size, focused) {
  let iconName;
  if (route.name === screen.home.tab) {
    iconName = "account-circle";
  } else if (route.name === screen.drive.tab) {
    iconName = "home";
  } else if (route.name === screen.registro.tab) {
    iconName = "book";
  } else if (route.name === screen.terreno.tab) {
    iconName = "terrain";
  }else if (route.name === screen.gestionDiaria.tab) {
    iconName = "calendar-today";
  }

  return (
    <View
      style={[
        styles.iconContainer,
        { backgroundColor: focused ? "#de2317" : "transparent" },
      ]}
    >
      <Icon
        type="material-community"
        name={iconName}
        color={focused ? "#ffffff" : color}
        size={size}
      />
    </View>
  );
}

function renderLabel(route) {
  switch (route.name) {
    case screen.home.tab:
      return "Cuenta";
    case screen.drive.tab:
      return "Inicio";
    case screen.registro.tab:
      return "Registros";
    case screen.terreno.tab:
      return "Terreno";
    case screen.gestionDiaria.tab:
      return "Diaria";
    default:
      return "";
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 50,
    height: 70,
    borderRadius: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "#ffffff",
    fontSize: 12,
  },
});

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Main" component={TabNavigator} />
  </Stack.Navigator>
);

export function AppNavigator() {
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        setIsLoggedIn(!!token);
      } catch (error) {
        console.error("Error checking login status:", error);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isCheckingAuth) {
    return <SplashScreen />;
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

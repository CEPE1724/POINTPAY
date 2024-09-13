import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Gestionstack } from "./Gestionstack";
import { AccountStack } from "./AccountStack";
import { Registrostack } from "./Registrostack"; 
import { Icon } from "react-native-elements";
import { screen } from "../utils";
import SplashScreen from "../screens/SplashScreen";
import { LoginScreen } from "../screens/LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, Text } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: "#ffffff", // Color del ícono activo
      tabBarInactiveTintColor: "#ffffff", // Color del ícono inactivo
      tabBarStyle: {
        backgroundColor: '#1c2463', // Color de fondo de la barra de pestañas
        borderTopWidth: 0, // Elimina el borde superior
        borderTopLeftRadius: 20, // Radio de esquina superior izquierda
        borderTopRightRadius: 20, // Radio de esquina superior derecha
        overflow: 'hidden', // Asegura que el contenido no se desborde
      },
      tabBarIcon: ({ color, size, focused }) => renderIcon(route, color, size, focused),
      tabBarLabel: ({ focused }) => focused ? <Text style={styles.label}>{renderLabel(route)}</Text> : null, // Mostrar título solo cuando está seleccionado
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
        tabBarStyle: { display: 'none' }, // Oculta la barra de pestañas en esta pantalla
        title: "Cuenta"
      }}
    />
  </Tab.Navigator>
);

function renderIcon(route, color, size, focused) {
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
    <View
      style={[
        styles.iconContainer,
        { backgroundColor: focused ? '#de2317' : 'transparent' }, // Fondo rojo si está seleccionado
      ]}
    >
      <Icon
        type="material-community"
        name={iconName}
        color={focused ? '#ffffff' : color} // Color blanco si está seleccionado
        size={size}
      />
    </View>
  );
}

function renderLabel(route) {
  // Retorna el título basado en el nombre de la ruta
  switch (route.name) {
    case screen.home.tab:
      return "Cuenta";
    case screen.drive.tab:
      return "Inicio";
    case screen.registro.tab:
      return "Registros";
    default:
      return "";
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 50,
    height: 70,
    borderRadius: 0, // Sin bordes redondeados
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#ffffff', // Color del texto del título
    fontSize: 12, // Tamaño de fuente del texto
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

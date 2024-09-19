import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/account/UserScreen";
import  {LoginScreen}  from "../screens/LoginScreen";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function AccountStack()  {
  return (
    <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#1c2463' }, // Color de fondo verde
      headerTintColor: '#ffffff', // Color de la letra blanco
    }}
    >
      <Stack.Screen 
      name={screen.home.inicio} 
      component={HomeScreen} 
      options={{ title: "Cuenta" }}
      />
      <Stack.Screen 
      name={screen.home.sesion} 
      component={LoginScreen} 
      options={{ 
        headerShown: false, // Oculta el encabezado (título y botones)
      }}
      />
    </Stack.Navigator>
  );
};

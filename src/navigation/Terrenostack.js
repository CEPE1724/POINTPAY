import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClientesScreen } from "../screens/terrenaScreen/clientesScreen";
import { VerificacionClienteScreen } from "../screens/terrenaScreen/VerificacionClienteScreen";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function Terrenostack()  {
  return (
    <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#1c2463' }, // Color de fondo verde
      headerTintColor: '#ffffff', // Color de la letra blanco
    }}
    >
      <Stack.Screen 
      name={screen.terreno.inicio} 
      component={ClientesScreen} 
      options={{ title: "Verificación Terrena" }}
      />
      <Stack.Screen
      name={screen.terreno.insert}
      component={VerificacionClienteScreen}
      options={{ title: "Verificación Cliente" }}
      />
    </Stack.Navigator>
  );
};


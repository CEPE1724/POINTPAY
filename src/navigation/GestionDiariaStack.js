import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Calendario } from "../screens/GestionDiaria/Calendario/Calendario";
import {GestionCalenadrio} from "../screens/GestionDiaria/GestionCalendario/GestionCalendario";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function GestionDiariaStack()  {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1c2463' }, // Color de fondo verde
        headerTintColor: '#ffffff', // Color de la letra blanco
      }}
    >
      <Stack.Screen 
        name={screen.gestionDiaria.inicio} 
        component={Calendario} 
        options={{ title: "Gestión Diaria" }}
      />
      <Stack.Screen 
        name={screen.gestionDiaria.diaria} 
        component={GestionCalenadrio} 
        options={{ title: "Diaria" }}
      />
    </Stack.Navigator>
  );
};

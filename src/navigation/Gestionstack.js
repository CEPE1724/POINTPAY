import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DriveScreen } from "../screens/gestioncobrador/DriveScreen";
import {InsertGestionscreen} from "../screens/gestioncobrador/InsertGestionscreen";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function Gestionstack()  {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1c2463' }, // Color de fondo verde
        headerTintColor: '#ffffff', // Color de la letra blanco
      }}
    >
      <Stack.Screen 
        name={screen.drive.inicio} 
        component={DriveScreen} 
        options={{ title: "Dashboard" }}
      />
      <Stack.Screen 
        name={screen.drive.insert} 
        component={InsertGestionscreen} 
        options={{ title: "Gestión" }}
      />
    </Stack.Navigator>
  );
};

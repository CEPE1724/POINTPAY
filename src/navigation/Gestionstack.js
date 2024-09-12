import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DriveScreen } from "../screens/gestioncobrador/DriveScreen";
import {InsertGestionscreen} from "../screens/gestioncobrador/InsertGestionscreen";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function Gestionstack()  {
  return (
    <Stack.Navigator>
      <Stack.Screen 
      name={screen.drive.inicio} 
      component={DriveScreen} 
      options={{ title: "Inicio" }}
      />
      <Stack.Screen 
      name={screen.drive.insert} 
      component={InsertGestionscreen} 
      options={{ title: "Gestión" }}
      />
    </Stack.Navigator>
  );
};

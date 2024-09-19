import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DriveScreen } from "../screens/gestioncobrador/DriveScreen";
import {RegistroScreen} from "../screens/registros/resgistroScreen/RegistroScreen";
import {InsertScreen} from "../screens/registros/insertScreen"
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function Registrostack()  {
  return (
    <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#1c2463' }, // Color de fondo verde
      headerTintColor: '#ffffff', // Color de la letra blanco
    }}
    >
      <Stack.Screen 
      name={screen.drive.inicio} 
      component={RegistroScreen} 
      options={{ title: "Registro" }}
      />
      <Stack.Screen
      name={screen.registro.insertCall}
      component={InsertScreen}
      options={{ title: "Gestión" }}
      />
    </Stack.Navigator>
  );
};


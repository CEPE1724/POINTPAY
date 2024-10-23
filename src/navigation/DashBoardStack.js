import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Dashboard } from "../screens/Dashboard/DashBoardScreen";
import {InsertGestionscreen} from "../screens/Dashboard/InsertGestionscreen";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function DashBoardStack()  {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1c2463' }, // Color de fondo verde
        headerTintColor: '#ffffff', // Color de la letra blanco
      }}
    >
      <Stack.Screen 
        name={screen.drive.inicio} 
        component={Dashboard} 
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

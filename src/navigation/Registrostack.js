import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegistroScreen } from "../screens/registros/resgistroScreen/RegistroScreen";
import { InsertScreen } from "../screens/registros/insertScreen";
import { ViewProductos } from "../screens/registros/viewProductos";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function Registrostack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#1c2463" },
        headerTintColor: "#ffffff",
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
      <Stack.Screen
        name={screen.registro.product} 
        component={ViewProductos}
        options={{ title: "Productos" }} 
      />
    </Stack.Navigator>
  );
}

import { NavigationContainer } from "@react-navigation/native";
import {AppNavigator} from "./src/navigation/AppNavigator";
import { UserProvider } from "./src/context/UserContext";  // Importa el UserProvider
export default function App() {
  return (

    <UserProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </UserProvider>
  );
}

import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./src/navigation/AppNavigator";
import KeyboardAvoidingWrapper from "./src/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper";
import { UserProvider } from "./src/context/UserContext"; // Ajusta la ruta según tu estructura

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <KeyboardAvoidingWrapper>
          <AppNavigator />
        </KeyboardAvoidingWrapper>
      </NavigationContainer>
    </UserProvider>
  );
}

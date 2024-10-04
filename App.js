import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./src/navigation/AppNavigator";
import {KeyboardAvoidingWrapper} from "./src/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper";
export default function App() {
  return (
    <KeyboardAvoidingWrapper>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </KeyboardAvoidingWrapper>
  );
}

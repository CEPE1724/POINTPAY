import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import logo from "../../assets/pointLogin.png";
import { APIURL } from "../config/apiconfig";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailEntered, setIsEmailEntered] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const { width, height } = Dimensions.get("window");

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsButtonEnabled(text.length > 0);
    if (isEmailEntered) {
      setShowPasswordFields(false);
      setIsEmailEntered(false);
      setPassword("");
    }
  };

  const handleButtonPress = async () => {
    navigation.replace("Main");
    if (!isEmailEntered) {
      if (email === "") {
        Alert.alert("Error", "Por favor ingresa tu correo electrónico.");
        return;
      }
      setIsEmailEntered(true);
      setShowPasswordFields(true);
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      if (email === "" || password === "") {
        Alert.alert("Error", "Por favor ingresa tus credenciales.");
        return;
      }
      try {
        console.log("Iniciando sesión...");
        console.log("Email:", email);
        console.log("Contraseña:", password);
        const url = APIURL.senLogin();
        console.log("URL:", url);
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nombre: email, clave: password }),
        });
        console.log("Respuesta:", response);
        const data = await response.json();

        if (data.estado === "success") {
          await AsyncStorage.setItem("userToken", data.token);
          await AsyncStorage.setItem("userInfo", JSON.stringify(data.usuario));
          // Redirige a AppNavigator después de un inicio de sesión exitoso
          navigation.replace("Main");
        } else {
          Alert.alert("Error", data.message || "Credenciales incorrectas");
        }
      } catch (error) {
        console.error(
          "Error al realizar la solicitud de inicio de sesión:",
          error
        );
        Alert.alert(
          "Error",
          "Hubo un problema al iniciar sesión. Inténtalo de nuevo."
        );
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image
          source={logo}
          style={[styles.image, { width: width * 0.8, height: height * 0.3 }]}
          resizeMode="contain"
        />

        <View style={styles.inputContainer}>
          <Text style={styles.subtitle}>Ingresa tu usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={handleEmailChange}
            onFocus={() => setIsEmailEditing(true)}
            onBlur={() => setIsEmailEditing(false)}
          />
        </View>

        {showPasswordFields && (
          <Animated.View
            style={[styles.passwordContainer, { opacity: opacityAnim }]}
          >
            <View style={styles.inputContainer}>
              <Text style={styles.subtitle}>Ingresa tu contraseña</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Icon
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={24}
                    color="#aaa"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        )}

        <TouchableOpacity
          style={[styles.button, { opacity: isButtonEnabled ? 1 : 0.5 }]}
          onPress={handleButtonPress}
          disabled={!isButtonEnabled}
        >
          <Text style={styles.buttonText}>
            {isEmailEntered ? "Iniciar sesión" : "Continuar"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.version}>V.1.0.0</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242c64",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    marginBottom: 40,
  },
  inputContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
    color: "#fff",
    textAlign: "left",
    width: "100%",
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#ddd",
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    width: "100%",
    backgroundColor: "#a91519",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  passwordContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  version: {
    color: "#fff",
    marginTop: 20,
    fontSize: 14,
  },
});
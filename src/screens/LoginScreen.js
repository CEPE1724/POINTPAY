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
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import logo from "../../assets/pointLogin.png";
import { APIURL } from "../config/apiconfig";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';

export function LoginScreen(props) {
  const { navigation } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailEntered, setIsEmailEntered] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [birthdate, setBirthdate] = useState(new Date());
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
    if (isLoading) return;

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
      setIsLoading(true);

      setTimeout(async () => {
        try {
          const url = APIURL.senLogin();
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ nombre: email, clave: password }),
          });
          const data = await response.json();

          if (data.estado === "success") {
            await AsyncStorage.setItem("userToken", data.token);
            await AsyncStorage.setItem("userInfo", JSON.stringify(data.usuario));
            navigation.replace("Main");
          } else {
            Alert.alert("Error", data.message || "Credenciales incorrectas");
          }
        } catch (error) {
          console.error("Error al realizar la solicitud de inicio de sesión:", error);
          Alert.alert("Error", "Hubo un problema al iniciar sesión. Inténtalo de nuevo.");
        } finally {
          setIsLoading(false);
        }
      }, 3000);
    }
  };

  const showDatePickerModal = () => setShowDatePicker(true);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthdate(selectedDate);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
          <Image
            source={logo}
            style={[styles.image, { width: width * 0.8, height: height * 0.3 }]}
            resizeMode="contain"
          />

          <View style={styles.inputContainer}>
            <Text style={styles.subtitle}>Ingresa tu usuario</Text>
            <TextInput
              style={styles.input}
              placeholder="Usuario"
              keyboardType="email-address"
              value={email}
              onChangeText={handleEmailChange}
              onFocus={() => setIsEmailEditing(true)}
              onBlur={() => setIsEmailEditing(false)}
            />
          </View>

          {showPasswordFields && (
            <Animated.View style={[styles.passwordContainer, { opacity: opacityAnim }]}>
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
            style={[styles.button, { opacity: isButtonEnabled && !isLoading ? 1 : 0.5 }]}
            onPress={handleButtonPress}
            disabled={!isButtonEnabled || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                {isEmailEntered ? "Iniciar sesión" : "Continuar"}
              </Text>
            )}
          </TouchableOpacity>

          <Text style={styles.version}>V.1.0.0</Text>

        </ScrollView>
    
    </TouchableWithoutFeedback>
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
  datePickerText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#fff",
  },
  icon: {
    marginRight: 10,
  },
});

export default LoginScreen;

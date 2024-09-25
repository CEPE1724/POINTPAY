import { styles } from "./VerificacionClienteScreen.Style"; // Verifica la ruta de estilos
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Button, RadioButton, TextInput } from "react-native-paper";
import { RadioGroup } from "../../../components/Terrena";
import { TextInputField } from "../../../components/Terrena";
import { launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";

const Tab = createMaterialTopTabNavigator();
const options = {
  tipoclienteOptions: [
    { value: "Cliente", label: "Cliente", icon: "home" },
    { value: "Garante", label: "Garante", icon: "building" },
  ],

  tipoViviendaOptions: [
    { value: "Casa", label: "Casa", icon: "home" },
    { value: "Villa", label: "Villa", icon: "tree" },
    { value: "Mixta", label: "Mixta", icon: "building" },
    { value: "Depart.", label: "Departamento", icon: "building" },
    { value: "MediaAgua", label: "MediaAgua", icon: "leaf" },
  ],

  estadoOptions: [
    { value: "Muy Bueno", label: "Muy Bueno", icon: "smile-o" },
    { value: "Bueno", label: "Bueno", icon: "meh-o" },
    { value: "Malo", label: "Malo", icon: "frown-o" },
  ],

  zonaOptions: [
    { value: "Urbano", label: "Urbano", icon: "building" },
    { value: "Rural", label: "Rural", icon: "tree" },
  ],

  propiedadOptions: [
    { value: "Propio", label: "Propio", icon: "key" },
    { value: "Familiar", label: "Familiar", icon: "users" },
    { value: "Arrendado", label: "Arrendado", icon: "money" },
  ],

  accesoOptions: [
    { value: "Facil", label: "Facil", icon: "key" },
    { value: "Dificil", label: "Dificil", icon: "users" },
  ],

  coberturaSeñalOptions: [
    { value: "Llamada Movil", label: "Llamada Movil", icon: "phone" }, // Cambié a "phone" para más claridad
    { value: "Whatsapp", label: "Whatsapp", icon: "comments" }, // Cambié a "comments" para representar mejor la app
  ],

  tipoTrabajoOptions: [
    { value: "Dependiente", label: "Dependiente", icon: "building" },
    { value: "Independiente", label: "Independiente", icon: "briefcase" }, // Cambié a "briefcase" para representar mejor el trabajo independiente
    { value: "Informal", label: "Informal", icon: "user" }, // Cambié a "user" para dar un sentido más personal
  ],
};

const DomicilioTab = ({ state, setState }) => {
  const {
    tipocliente,
    tiempoVivienda,
    tipoVivienda,
    estado,
    zonas,
    valorArrendado,
    callePrincipal,
    calleSecundaria,
    puntoReferencia,
    vecinoEntrevistado,
    personaEntrevistadaDomicilio,
    observacion,
    isArrendado,
    propia,
    acceso,
    coberturaSeñal,
  } = state;
  const renderRadioGroup = (label, value, onChange, options) => (
    <RadioGroup
      label={label}
      options={options}
      value={value}
      onChange={onChange}
    />
  );
  return (
    <View style={styles.container}>
      <Text>Datos de Domicilio</Text>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Tipo de cliente */}
        {renderRadioGroup(
          "Tipo de Cliente:",
          tipocliente,
          (value) => setState({ ...state, tipocliente: value }),
          options.tipoclienteOptions
        )}
        {/* tiempo en meses*/}
        <TextInputField
          label={"Tiempo de Vivienda (Meses)"}
          placeholder={"Ingrese tiempo en meses"}
          value={tiempoVivienda}
          onChange={(text) => setState({ ...state, tiempoVivienda: text })}
          keyboardType="numeric"
        />
        {/* Tipo de Vivienda */}
        {renderRadioGroup(
          "Tipo de Vivienda:",
          tipoVivienda,
          (value) => setState({ ...state, tipoVivienda: value }),
          options.tipoViviendaOptions
        )}
        {/* Estado vivienda */}
        {renderRadioGroup(
          "Estado Vivienda:",
          estado,
          (value) => setState({ ...state, estado: value }),
          options.estadoOptions
        )}
        {/* Zona de Vivienda */}
        {renderRadioGroup(
          "Zona de Vivienda:",
          zonas,
          (value) => setState({ ...state, zonas: value }),
          options.zonaOptions
        )}
        {/* Propiedad */}
        {renderRadioGroup(
          "Propiedad:",
          propia,
          (value) => setState({ ...state, propia: value }),
          options.propiedadOptions
        )}
        {isArrendado && (
          <TextInputField
            label="Valor Arrendado"
            placeholder="Ingrese valor arrendado"
            value={valorArrendado}
            onChange={(text) => setState({ ...state, valorArrendado: text })}
            keyboardType="decimal-pad"
          />
        )}
        {/* Acceso */}
        {renderRadioGroup(
          "Acceso:",
          acceso,
          (value) => setState({ ...state, acceso: value }),
          options.accesoOptions
        )}
        {/* Cobertura de Señal */}
        {renderRadioGroup(
          "Cobertura de Señal:",
          coberturaSeñal,
          (value) => setState({ ...state, coberturaSeñal: value }),
          options.coberturaSeñalOptions
        )}
        <TextInputField
          label="Calle Principal"
          placeholder="Ingrese calle principal"
          value={callePrincipal}
          onChange={(text) => setState({ ...state, callePrincipal: text })}
        />
        <TextInputField
          label="Calle Secundaria"
          placeholder="Ingrese calle secundaria"
          value={calleSecundaria}
          onChange={(text) => setState({ ...state, calleSecundaria: text })}
        />
        <TextInputField
          label="Punto de Referencia"
          placeholder="Ingrese punto de referencia"
          value={puntoReferencia}
          onChange={(text) => setState({ ...state, puntoReferencia: text })}
        />
        <TextInputField
          label="Persona Entrevistada"
          placeholder="Ingrese nombre"
          value={personaEntrevistadaDomicilio}
          onChange={(text) =>
            setState({ ...state, personaEntrevistadaDomicilio: text })
          }
          // keyboardType="numeric" // Teclado numérico
          //keyboardType="decimal-pad" // Teclado para números decimales
        />

        <TextInputField
          label="Observación"
          placeholder="Ingrese observación"
          value={observacion}
          onChange={(text) => setState({ ...state, observacion: text })}
          multiline // Campo de texto multilinea
          numberOfLines={3} // Número de líneas
        />

        <TextInputField
          label="Vecino Entrevistado"
          placeholder="Ingrese nombre"
          value={vecinoEntrevistado}
          onChange={(text) => setState({ ...state, vecinoEntrevistado: text })}
        />
      </ScrollView>
    </View>
  );
};

const DomicilioImagenesTab = ({ state, setState, type }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert(
          "¡Lo siento! Necesitamos permisos para acceder a tu galería de fotos."
        );
      }
    })();
  }, []);

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets && Array.isArray(result.assets)) {
      const newImages = result.assets.map((asset) => asset.uri || "");
      setImages((prevImages) => [...newImages, ...prevImages]);
      setState((prev) => ({
        ...prev,

        [type]: [...newImages, ...prev[type]],
      }));
    }
  };

  const removeImage = (uri) => {
    setImages(images.filter((image) => image !== uri));
    setState((prev) => ({
      ...prev,
      [type]: prev[type].filter((image) => image !== uri),
    }));
  };
  return (
    <View>
      <TouchableOpacity style={styles.buttonImage} onPress={handleImagePicker}>
        <Icon name="camera" size={30} color="#fff" />
        <Text style={styles.buttonTextImage}>Seleccionar Imágenes</Text>
      </TouchableOpacity>

      <ScrollView style={styles.containerImage}>
        <Text style={{ marginVertical: 10 }}>
          Imágenes seleccionadas: {images.length}{" "}
          {images.length < 5 ? "(¡Selecciona al menos 5!)" : ""}
        </Text>

        <View style={styles.imageListImage}>
          {images.map((image, index) => (
            <View
              key={index}
              style={{
                position: "relative",
                marginBottom: 10,
                width: "58%",
                height: 100,
              }}
            >
              <Image source={{ uri: image }} style={styles.imageImage} />
              <TouchableOpacity
                onPress={() => removeImage(image)}
                style={{ position: "absolute", top: 5, right: 5 }}
              >
                <Icon name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const LaboralTab = ({ state, setState }) => {
  const {
    tipoTrabajo,
    tiempoTrabajo,
    tiempoTrabajoMeses,
    ingresosMensuales,
    actividadLaboral,
    telefonoLaboral,
    callePrincipalLaboral,
    calleSecundariaLaboral,
    puntoReferenciaLaboral,
    personaEntrevistada,
  } = state;
  const renderRadioGroup = (label, value, onChange, options) => (
    <RadioGroup
      label={label}
      options={options}
      value={value}
      onChange={onChange}
    />
  );
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      {/* Campos de Laboral */}
      {renderRadioGroup(
        "Tipo de Trabajo:",
        tipoTrabajo,
        (value) => setState({ ...state, tipoTrabajo: value }),
        options.tipoTrabajoOptions
      )}
      <TextInputField
        label="Tiempo de Trabajo (Meses)"
        placeholder="Ingrese tiempo en meses"
        value={tiempoTrabajoMeses}
        onChange={(text) => setState({ ...state, tiempoTrabajoMeses: text })}
        keyboardType="numeric"
      />
      <TextInputField
        label="Tiempo de Trabajo (Años)"
        placeholder="Ingrese tiempo en años"
        value={tiempoTrabajo}
        onChange={(text) => setState({ ...state, tiempoTrabajo: text })}
        keyboardType="numeric"
      />
      <TextInputField
        label="Ingresos Mensuales"
        placeholder="Ingrese ingresos mensuales"
        value={ingresosMensuales}
        onChange={(text) => setState({ ...state, ingresosMensuales: text })}
        keyboardType="decimal-pad"
      />
      <TextInputField
        label="Actividad Laboral"
        placeholder="Ingrese actividad laboral"
        value={actividadLaboral}
        onChange={(text) => setState({ ...state, actividadLaboral: text })}
      />
      <TextInputField
        label="Teléfono Laboral"
        placeholder="Ingrese teléfono laboral"
        value={telefonoLaboral}
        onChange={(text) => setState({ ...state, telefonoLaboral: text })}
        keyboardType="phone-pad"
      />
      <TextInputField
        label="Calle Principal Laboral"
        placeholder="Ingrese calle principal"
        value={callePrincipalLaboral}
        onChange={(text) => setState({ ...state, callePrincipalLaboral: text })}
      />
      <TextInputField
        label="Calle Secundaria Laboral"
        placeholder="Ingrese calle secundaria"
        value={calleSecundariaLaboral}
        onChange={(text) =>
          setState({ ...state, calleSecundariaLaboral: text })
        }
      />
      <TextInputField
        label="Punto de Referencia Laboral"
        placeholder="Ingrese punto de referencia"
        value={puntoReferenciaLaboral}
        onChange={(text) =>
          setState({ ...state, puntoReferenciaLaboral: text })
        }
      />
      <TextInputField
        label="Persona Entrevistada"
        placeholder="Ingrese nombre"
        value={personaEntrevistada}
        onChange={(text) => setState({ ...state, personaEntrevistada: text })}
      />
    </ScrollView>
  );
};

export function VerificacionClienteScreen({ route }) {
  const { item } = route.params;
  const [state, setState] = useState({
    tiempoVivienda: "",
    valorArrendado: "",
    callePrincipal: "",
    calleSecundaria: "",
    puntoReferencia: "",
    vecinoEntrevistado: "",
    observacion: "",
    tiempoTrabajo: "",
    tiempoTrabajoMeses: "",
    ingresosMensuales: "",
    actividadLaboral: "",
    telefonoLaboral: "",
    callePrincipalLaboral: "",
    calleSecundariaLaboral: "",
    puntoReferenciaLaboral: "",
    personaEntrevistada: "",
    personaEntrevistadaDomicilio: "",
    tipoVivienda: "Casa",
    tipocliente: "Cliente",
    estado: "Muy Bueno",
    zonas: "Urbano",
    isArrendado: false,
    propia: "Propio",
    acceso: "Facil", // Valor por defecto agregado
    coberturaSeñal: "Llamada Movil", // Valor por defecto agregado
    tipoTrabajo: "Dependiente",
    domicilioImages: [],
    laboralImages: [],
  });

  const [showTabContent, setShowTabContent] = useState({
    Domicilio: false,
    Laboral: false,
  });

  const toggleTabContent = (tab) => {
    setShowTabContent((prev) => ({
      ...prev,
      [tab]: !prev[tab],
    }));
  };

  const validateFields = () => {
    const rules = {
      domicilio: {
        tiempoVivienda: { min: 1, max: 120, label: "Tiempo de Vivienda" },
        callePrincipal: { min: 10, max: 249, label: "Calle Principal" },
        calleSecundaria: { min: 10, max: 249, label: "Calle Secundaria" },
        puntoReferencia: { min: 10, max: 249, label: "Punto de Referencia" },
        vecinoEntrevistado: { min: 1, max: 100, label: "Vecino Entrevistado" },
        personaEntrevistadaDomicilio: {
          min: 1,
          max: 100,
          label: "Persona Entrevistada",
        },
        observacion: { min: 1, max: 500, label: "Observación" },
      },
      laboral: {
        tiempoTrabajo: { min: 1, max: 2, label: "Tiempo de Trabajo" },
        tiempoTrabajoMeses: {
          min: 1,
          max: 2,
          label: "Tiempo de Trabajo (Meses)",
        },
        ingresosMensuales: {
          min: 1,
          max: Infinity,
          label: "Ingresos Mensuales",
        },
        actividadLaboral: { min: 20, max: 100, label: "Actividad Laboral" },
        telefonoLaboral: { min: 9, max: 10, label: "Teléfono Laboral" },
        callePrincipalLaboral: {
          min: 20,
          max: 100,
          label: "Calle Principal Laboral",
        },
        calleSecundariaLaboral: {
          min: 20,
          max: 100,
          label: "Calle Secundaria Laboral",
        },
        puntoReferenciaLaboral: {
          min: 20,
          max: 100,
          label: "Punto de Referencia Laboral",
        },
        personaEntrevistada: {
          min: 1,
          max: 100,
          label: "Persona Entrevistada",
        },
      },
    };

    let missingFields = { domicilio: [], laboral: [] };
    let invalidFields = { domicilio: [], laboral: [] };

    // Validar campos de Domicilio
    if (item.bDomicilio) {
      for (const [key, { min, max, label }] of Object.entries(
        rules.domicilio
      )) {
        const value = state[key] ? state[key].trim() : "";
        if (value === "") {
          missingFields.domicilio.push(label);
        } else {
          const length = value.length; // Obtener la longitud de la cadena
          if (length < min || length > max) {
            invalidFields.domicilio.push(
              `${label} (debe tener entre ${min} y ${
                max === Infinity ? "infinito" : max
              } letras)`
            );
          }
        }
      }
      if (state.domicilioImages.length < 5) {
        invalidFields.domicilio.push(
          "Se requieren al menos 5 imágenes para Domicilio."
        );
      }
    }

    // Validar campos de Laboral
    if (item.bTrabajo) {
      for (const [key, { min, max, label }] of Object.entries(rules.laboral)) {
        const value = state[key] ? state[key].trim() : "";
        if (value === "") {
          missingFields.laboral.push(label);
        } else {
          const length = value.length; // Obtener la longitud de la cadena
          if (length < min || length > max) {
            invalidFields.laboral.push(
              `${label} (debe tener entre ${min} y ${
                max === Infinity ? "infinito" : max
              } letras)`
            );
          }
        }
      }
      if (state.laboralImages.length < 5) {
        invalidFields.laboral.push(
          "Se requieren al menos 5 imágenes para Laboral."
        );
      }
    }

    // Mostrar alertas para campos faltantes o inválidos
    let alertMessage = "";

    if (missingFields.domicilio.length > 0) {
      alertMessage += `Domicilio:\n- ${missingFields.domicilio.join(
        "\n- "
      )}\n\n`;
    }

    if (invalidFields.domicilio.length > 0) {
      alertMessage += `Domicilio (inválidos):\n- ${invalidFields.domicilio.join(
        "\n- "
      )}\n\n`;
    }

    if (missingFields.laboral.length > 0) {
      alertMessage += `Laboral:\n- ${missingFields.laboral.join("\n- ")}\n\n`;
    }

    if (invalidFields.laboral.length > 0) {
      alertMessage += `Laboral (inválidos):\n- ${invalidFields.laboral.join(
        "\n- "
      )}\n\n`;
    }

    if (alertMessage) {
      Alert.alert("Problemas de Validación", alertMessage.trim());
      return false;
    }

    return true;
  };

  const handleSave = () => {
    let valid = validateFields();
    if (valid) {
      // Save logic here
      Alert.alert("Éxito", "Datos guardados correctamente.");
    }
  };

  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  if (!item) {
    return <Text>No hay datos de cliente disponibles.</Text>;
  }
  return (
    <View style={styles.screenContainer}>
      <View style={styles.row}>
        <Icon name="user" size={20} color="#228b22" style={styles.icon} />
        <Text style={styles.cardSubtitle}>{item.Nombres}</Text>
      </View>
      <Tab.Navigator>
        {item.bDomicilio && (
          <Tab.Screen
            name="Domicilio"
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="home" color={color} size={20} /> // Cambia "home" por el ícono que desees
              ),
              tabBarLabel: () => null,
            }}
          >
            {() => <DomicilioTab state={state} setState={setState} />}
          </Tab.Screen>
        )}
        {item.bTrabajo && (
          <Tab.Screen
            name="Laboral"
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="briefcase" color={color} size={20} /> // Cambia "home" por el ícono que desees
              ),
              tabBarLabel: () => null,
            }}
          >
            {() => <LaboralTab state={state} setState={setState} />}
          </Tab.Screen>
        )}
        {item.bDomicilio && (
          <Tab.Screen
            name="ImgDomicilio"
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="image" color={color} size={20} /> // Cambia "home" por el ícono que desees
              ),
              tabBarLabel: () => null,
            }}
          >
            {() => (
              <DomicilioImagenesTab
                state={state}
                setState={setState}
                type="domicilioImages"
              />
            )}
          </Tab.Screen>
        )}
        {item.bTrabajo && (
          <Tab.Screen
            name="ImgLaboral"
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="archive" color={color} size={20} /> // Cambia "home" por el ícono que desees
              ),
              tabBarLabel: () => null,
            }}
          >
            {() => (
              <DomicilioImagenesTab
                state={state}
                setState={setState}
                type="laboralImages"
              />
            )}
          </Tab.Screen>
        )}
      </Tab.Navigator>
      <View style={styles.buttonContainer}>
        <Button mode="contained" style={styles.button} onPress={handleSave}>
          Guardar
        </Button>
      </View>
    </View>
  );
}

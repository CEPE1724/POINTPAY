import { styles } from "./VerificacionClienteScreen.Style"; // Verifica la ruta de estilos
import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RadioButton, TextInput } from "react-native-paper";
import { RadioGroup } from "../../../components/Terrena";
import { TextInputField } from "../../../components/Terrena";
const Tab = createMaterialTopTabNavigator();

const DomicilioTab = ({ item, state, setState }) => {
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

  const tipoclienteOptions = [
    { value: "Cliente", label: "Cliente", icon: "home" },
    { value: "Garante", label: "Garante", icon: "building" },
  ];
  
  const tipoViviendaOptions = [
    { value: "Casa", label: "Casa", icon: "home" },
    { value: "Villa", label: "Villa", icon: "tree" },
    { value: "Mixta", label: "Mixta", icon: "building" },
    { value: "Depart.", label: "Departamento", icon: "building" },
    { value: "MediaAgua", label: "MediaAgua", icon: "leaf" },
  ];
  
  const estadoOptions = [
    { value: "Muy Bueno", label: "Muy Bueno", icon: "smile-o" },
    { value: "Bueno", label: "Bueno", icon: "meh-o" },
    { value: "Malo", label: "Malo", icon: "frown-o" },
  ];
  
  const zonaOptions = [
    { value: "Urbano", label: "Urbano", icon: "building" },
    { value: "Rural", label: "Rural", icon: "tree" },
  ];
  
  const propiedadOptions = [
    { value: "Propio", label: "Propio", icon: "key" },
    { value: "Familiar", label: "Familiar", icon: "users" },
    { value: "Arrendado", label: "Arrendado", icon: "money" },
  ];
  
  const accesoOptions = [
    { value: "Facil", label: "Facil", icon: "key" },
    { value: "Dificil", label: "Dificil", icon: "users" },
  ];
  
  const coberturaSeñalOptions = [
    { value: "Llamada Movil", label: "Llamada Movil", icon: "phone" }, // Cambié a "phone" para más claridad
    { value: "Whatsapp", label: "Whatsapp", icon: "comments" }, // Cambié a "comments" para representar mejor la app
  ];
  
  return (
    <ScrollView style={styles.container}>
      {/* Tipo de cliente */}
      <RadioGroup
        label="Tipo de Cliente:"
        options={tipoclienteOptions}
        value={tipocliente}
        onChange={(value) => setState({ ...state, tipocliente: value })}
      />
      {/* tiempo en meses*/}
      <TextInputField
        label={"Tiempo de Vivienda (Meses)"}
        placeholder={"Ingrese tiempo en meses"}
        value={tiempoVivienda}
        onChange={(text) => setState({ ...state, tiempoVivienda: text })}
        keyboardType="numeric"
      />
      {/* Tipo de Vivienda */}
      <RadioGroup
        label="Tipo de Vivienda:"
        options={tipoViviendaOptions}
        value={tipoVivienda}
        onChange={(value) => setState({ ...state, tipoVivienda: value })}
      />
      {/* Estado vivienda */}
      <RadioGroup
        label="Estado Vivienda:"
        options={estadoOptions}
        value={estado}
        onChange={(value) => setState({ ...state, estado: value })}
      />

      {/* Estado vivienda */}
      <RadioGroup
        label="Zona de  Vivienda:"
        options={zonaOptions}
        value={zonas}
        onChange={(value) => setState({ ...state, zonas: value })}
      />
      {/* Propiedad */}
      <RadioGroup
        label="Propiedad"
        options={propiedadOptions}
        value={propia}
        onChange={(value) => setState({ ...state, propia: value })}
      />
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
      <RadioGroup
        label="Acceso:"
        options={accesoOptions}
        value={acceso} // Esto debe estar vinculado al estado
        onChange={(value) => setState({ ...state, acceso: value })}
      />

      {/* Cobertura de Señal */}
      <RadioGroup
        label="Cobertura de Señal:"
        options={coberturaSeñalOptions}
        value={coberturaSeñal} // Esto debe estar vinculado al estado
        onChange={(value) => setState({ ...state, coberturaSeñal: value })}
      />
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
  );
};

const LaboralTab = ({ state, setState }) => {
    const tipoTrabajoOptions = [
        { value: "Dependiente", label: "Dependiente", icon: "building" },
        { value: "Independiente", label: "Independiente", icon: "briefcase" }, // Cambié a "briefcase" para representar mejor el trabajo independiente
        { value: "Informal", label: "Informal", icon: "user" }, // Cambié a "user" para dar un sentido más personal
      ];
      
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

  return (
    <ScrollView style={styles.container}>
      {/* Campos de Laboral */}
      <RadioGroup
        label="Tipo de Trabajo:"
        options={tipoTrabajoOptions}
        value={tipoTrabajo}
        onChange={(value) => setState({ ...state, tipoTrabajo: value })}
      />
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
  });

  if (!item) {
    return <Text>No hay datos de cliente disponibles.</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        //onPress={() => Alert.alert("Detalles del cliente")}
        accessible={true}
        accessibilityLabel="Ver detalles del cliente"
      >
        <View style={styles.detailsContainer}>
          {[
            { icon: "drivers-license-o", text: item.Ruc },
            { icon: "user", text: item.Nombres },
            { icon: "phone", text: item.Celular },
            { icon: "archive", text: item.Almacen },
            {
              icon: "calendar",
              text: new Date(item.FechaSistema).toLocaleString(),
            },
          ].map(({ icon, text }, index) => (
            <View style={styles.row} key={index}>
              <Icon name={icon} size={20} color="#228b22" style={styles.icon} />
              <Text style={styles.cardSubtitle}>{text}</Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>

      <Tab.Navigator>
        {item.bDomicilio && (
          <Tab.Screen name="Domicilio">
            {() => (
              <DomicilioTab item={item} state={state} setState={setState} />
            )}
          </Tab.Screen>
        )}
        {item.bTrabajo && (
          <Tab.Screen name="Laboral">
            {() => <LaboralTab state={state} setState={setState} />}
          </Tab.Screen>
        )}
      </Tab.Navigator>
    </View>
  );
}

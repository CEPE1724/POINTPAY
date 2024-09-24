import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from "./RadioGroup.Style"; // Asegúrate de que la ruta sea correctaorrecta

export function TextInputField(
     { label, placeholder, value, onChange, keyboardType = "default", 
        multiline = false, numberOfLines = 1 }) {
 return (
    <View style={styles.viviendaContainer}>
      <Text style={styles.viviendaLabel}>{label}:</Text>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        keyboardType={keyboardType} // Define el tipo de teclado aquí
        multiline={multiline} // Agregar esta prop
        numberOfLines={numberOfLines} // Opcional, solo para mostrar la cantidad de líneas
        textAlignVertical={multiline ? "top" : "center"} // Alinear texto en la parte superior si es multiline
      />
    </View>
  );
};



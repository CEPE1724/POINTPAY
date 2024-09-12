import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { styles } from "./InsertScreenStyle"; // Verifica que la ruta es correcta

export function InsertScreen({ route }) {
  const { item } = route.params;

  const [selectedOption, setSelectedOption] = useState(0);
  const [selectTipoContacto, setSelectTipoContacto] = useState(0);
  const [selectResultado, setSelectResultado] = useState(0);
  const [options, setOptions] = useState([]);
  const [optionsTipoContacto, setOptionsTipoContacto] = useState([]);
  const [optionsResultado, setOptionsResultado] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showComment, setShowComment] = useState(false); // Nuevo estado para el comentario
  const [comment, setComment] = useState(""); // Nuevo estado para el valor del comentario
  const [number, setNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(
          "http://192.168.2.124:3005/cobranza/api/v1/point/Cbo_EstadosGestion/list"
        );
        setOptions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching options:", error);
        setLoading(false);
      }
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    // Limpiar el campo de número y ocultar el campo de comentario cuando cambie selectedOption
    setNumber("");
    setShowComment(false);
    setSelectTipoContacto(0); // Opcional: Limpiar el tipo de contacto seleccionado si cambia el dato

    const fetchOptionsTipoContacto = async () => {
      if (selectedOption === 0) {
        setOptionsTipoContacto([]); // Limpiar opciones si no hay dato seleccionado
        return;
      }

      try {
        const response = await axios.get(
          `http://192.168.2.124:3005/cobranza/api/v1/point/Cbo_EstadosTipocontacto/list?idCbo_EstadoGestion=${selectedOption}`
        );
        setOptionsTipoContacto(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching optionsTipoContacto:", error);
        setLoading(false);
      }
    };

    fetchOptionsTipoContacto();
  }, [selectedOption]);

  useEffect(() => {
    const fetchOptionsResultado = async () => {
      if (selectTipoContacto === 0) {
        setOptionsResultado([]); // Limpiar opciones si no hay tipo de contacto seleccionado
        setSelectResultado(0); // Restablecer el valor seleccionado de Descripción
        setNumber(""); // Limpiar el campo de número
        setShowComment(false); // Ocultar el campo de número
        return;
      }

      try {
        const response = await axios.get(
          `http://192.168.2.124:3005/cobranza/api/v1/point/Cbo_ResultadoGestion/list?idCbo_EstadoGestion=${selectTipoContacto}`
        );
        setOptionsResultado(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching optionsResultado:", error);
        setLoading(false);
      }
    };

    fetchOptionsResultado();
  }, [selectTipoContacto]);

  const handleDateChange = (date) => {
    const today = new Date().toISOString().split("T")[0];
    if (date.dateString < today) {
      Alert.alert(
        "Fecha inválida",
        "No puedes seleccionar una fecha anterior a hoy."
      );
    } else {
      setSelectedDate(date.dateString);
    }
  };

  const handleNumberChange = (text) => {
    const numericValue = parseFloat(text);
    if (!isNaN(numericValue) && numericValue > 0) {
      setNumber(text);
    } else {
      Alert.alert("Número inválido", "Introduce un número mayor a 0.");
    }
  };

  const handleResultadoChange = (itemValue) => {
    setSelectResultado(itemValue);

    // Mostrar el campo de número solo si el valor de itemValue está en los valores requeridos
    if (
      itemValue === 4 ||
      itemValue === 39 ||
      itemValue === 54 ||
      itemValue === 61 ||
      itemValue === 69
    ) {
      setShowComment(true); // Mostrar el campo de comentario si se selecciona "COMPROMISO DE PAGO"
    } else {
      setShowComment(false); // Ocultar el campo de comentario si no se selecciona "COMPROMISO DE PAGO"
      setComment(""); // Opcional: Limpiar el comentario si se oculta el campo
      setNumber(""); // Limpiar el campo de número si se oculta el campo de comentario
    }
  };

  const getColorForValue = (projected, collected) => {
    if (collected < projected && collected > 0) {
      return "#e28743";
    }
    if (collected >= projected) {
      return "green";
    }
    return "#a91519";
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          <Icon name="user" size={24} color="#333" style={styles.icon} />
          <Text style={styles.value}>{item.Cliente}</Text>
        </View>
        <View style={styles.row}>
          <Icon
            name="drivers-license-o"
            size={24}
            color="#333"
            style={styles.icon}
          />
          <Text style={styles.value}>{item.Cedula}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="file-text-o" size={24} color="#333" style={styles.icon} />
          <Text style={styles.value}>{item.Numero_Documento}</Text>
        </View>
        <View style={styles.rowProyect}>
          <Text style={styles.textProyect}>
            ${item.Valor_Cobrar_Proyectado.toFixed(2)}
          </Text>
          <Text
            style={[
              styles.textProyect,
              {
                color: getColorForValue(
                  item.Valor_Cobrar_Proyectado,
                  item.Valor_Cobrado
                ),
              },
            ]}
          >
            ${item.Valor_Cobrado.toFixed(2)}
          </Text>
        </View>
      </View>

      <Text style={styles.pickerLabel}>Selecciona una fecha:</Text>

      <Text style={styles.pickerLabel}>Dato:</Text>
      <View style={styles.rowList}>
        <Picker
          selectedValue={selectedOption}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedOption(itemValue)}
          enabled={!loading && options.length > 0}
        >
          <Picker.Item label="Escoja una opción" value={0} />
          {options.map((option) => (
            <Picker.Item
              key={option.idCbo_EstadoGestion}
              label={option.Estado}
              value={option.idCbo_EstadoGestion}
            />
          ))}
        </Picker>
      </View>

      <Text style={styles.pickerLabel}>Tipo Contacto:</Text>
      <View style={styles.rowList}>
        <Picker
          selectedValue={selectTipoContacto}
          style={styles.picker}
          onValueChange={(itemValue) => {
            setSelectTipoContacto(itemValue);
            setSelectResultado(0); // Restablecer el valor de Descripción
            setNumber(""); // Limpiar el campo de número
            setShowComment(false); // Ocultar el campo de número
          }}
          enabled={!loading && optionsTipoContacto.length > 0}
        >
          <Picker.Item label="Escoja una opción" value={0} />
          {optionsTipoContacto.map((option) => (
            <Picker.Item
              key={option.idCbo_EstadosTipocontacto}
              label={option.Estado}
              value={option.idCbo_EstadosTipocontacto}
            />
          ))}
        </Picker>
      </View>

      <Text style={styles.pickerLabel}>Descripción:</Text>
      <View style={styles.rowList}>
        <Picker
          selectedValue={selectResultado}
          style={styles.picker}
          onValueChange={handleResultadoChange}
          enabled={!loading && optionsResultado.length > 0}
        >
          <Picker.Item label="Escoja una opción" value={0} />
          {optionsResultado.map((option) => (
            <Picker.Item
              key={option.idCbo_ResultadoGestion}
              label={option.Resultado}
              value={option.idCbo_ResultadoGestion}
            />
          ))}
        </Picker>
      </View>

      {/* Mostrar el campo de número solo si el valor de selectResultado no es 0 */}
      {selectResultado !== 0 && showComment && (
        <View style={styles.row}>
          <Icon name="dollar" size={24} color="green" style={styles.icon} />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={number}
            onChangeText={handleNumberChange}
            placeholder="Ingrese el Valor"
          />
        </View>
      )}

      {/* Mostrar el campo de comentario solo si el valor de selectResultado no es 0 */}
      {selectResultado !== 0 && showComment && (
        <View style={styles.row}>
          <Icon name="comment" size={24} color="#333" style={styles.icon} />
          <TextInput
            style={styles.commentInput}
            placeholder="Ingrese un comentario..."
            value={comment}
            onChangeText={setComment}
          />
        </View>
      )}
    </ScrollView>
  );
}

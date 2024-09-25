import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { styles } from "./InsertScreenStyle"; // Verifica que la ruta es correcta
import DateTimePicker from "@react-native-community/datetimepicker"; // Asegúrate de instalar este paquete
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import {LoadingModal} from "../../../components/Account/Shared"; // Importa los componentes necesarios
export function InsertScreen({ route }) {
  const { item } = route.params;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [birthdate, setBirthdate] = useState(new Date()); // Estado para la fecha de nacimiento
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
  const [selectedDate, setSelectedDate] = useState(new Date()); // Estado para la fecha seleccionada
  const [userInfo, setUserInfo] = useState({ ingresoCobrador: "" });
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem("userInfo");
        console.log("Stored user info:", storedUserInfo);
        if (storedUserInfo) {
          const user = JSON.parse(storedUserInfo);

          setUserInfo(  user.ingresoCobrador.idIngresoCobrador  || "" );
          console.log("User info..:", userInfo);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

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

  const handleDateChange = (event, selectedDate) => {
    // Cierra el selector de fecha
    setShowDatePicker(false);

    if (selectedDate) {
      const currentDate = new Date();

      // Comparar fechas ignorando la hora para evitar problemas con la hora actual
      const selectedDateWithoutTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      );
      const currentDateWithoutTime = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );

      if (selectedDateWithoutTime < currentDateWithoutTime) {
        // Fecha seleccionada es menor que la fecha actual
        Alert.alert(
          "Fecha inválida",
          "La fecha no puede ser menor al día actual."
        );
        // Restablece la fecha actual si es inválida
        setSelectedDate(currentDateWithoutTime);
      } else {
        // Actualiza la fecha seleccionada si es válida
        setSelectedDate(selectedDateWithoutTime);
      }
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

    if (
      itemValue === 4 ||
      itemValue === 39 ||
      itemValue === 54 ||
      itemValue === 61 ||
      itemValue === 69
    ) {
      setShowComment(true);
    } else {
      setShowComment(false);
      setComment("");
      setNumber("");
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

  const showDatePickerModal = () => setShowDatePicker(true);


  const HandleGuardar = async () => {
    console.log("Guardando...");
    
    const url = 'http://192.168.2.124:3005/cobranza/api/v1/point/Cbo_GestionesDeCobranzas/insert';
    const token = 'YOUR_AUTHORIZATION_TOKEN'; // Reemplaza con tu token real
  
    // Maneja las fechas
    const currentDate = new Date().toISOString(); // Fecha actual en formato ISO
    const fechaPago = selectedDate ? selectedDate.toISOString() : '1900-09-01T00:00:00.000Z'; // Fecha de pago en formato ISO
  
    const data = {
      idCompra: item.idCompra,
      idPersonal: userInfo.ingresoCobrador.idIngresoCobrador,
      Fecha: currentDate,
      idCbo_EstadoGestion: selectedOption,
      idCbo_ResultadoGestion: selectResultado,
      FechaPago: showComment ? fechaPago : '1900-09-01T00:00:00.000Z',
      Valor: parseFloat(number) || 0,
      Usuario: userInfo.ingresoCobrador.codigo,
      Notas: comment,
      idCliente: item.idCliente,
      Tipo: 2,
      idCbo_EstadosTipocontacto: selectTipoContacto,
    };
  
    console.log("Datos a enviar:", data);
  
    // Validaciones
    if (selectedOption === 0) {
      Alert.alert("Info", "Debe seleccionar un dato.");
      return;
    }
    if (selectTipoContacto === 0) {
      Alert.alert("Info", "Debe seleccionar un tipo de contacto.");
      return;
    }
    if (selectResultado === 0) {
      Alert.alert("Info", "Debe seleccionar una descripción.");
      return;
    }
    if (showComment && selectResultado !== 0) {
      if (number === "") {
        Alert.alert("Info", "Debe ingresar un valor.");
        return;
      }
      if (!selectedDate || selectedDate.toString() === 'Invalid Date') {
        Alert.alert("Info", "Debe seleccionar una fecha.");
        return;
      }
    }
    if (comment === "") {
      Alert.alert("Info", "Debe ingresar un comentario.");
      return;
    }
    if (comment.length < 20 || comment.length > 250) {
      Alert.alert("Info", "El comentario debe tener entre 20 y 250 caracteres.");
      return;
    }
  
    // Enviar datos a la API usando axios
    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`, // Autenticación si es necesaria
          'Accept': 'application/json', // Cambia esto si el backend espera otro formato
          'Content-Type': 'application/json', // Asegúrate de que esto coincida con la configuración del backend
        },
      });
  
      // Manejo de respuesta
      if (response.status === 200) {
        Alert.alert("Éxito", "Datos guardados exitosamente.");
        
        // Restablecer los estados después de guardar
        setSelectedOption(0);
        setSelectTipoContacto(0);
        setSelectResultado(0);
        setNumber("");
        setShowComment(false);
        setComment("");
        setSelectedDate(new Date()); // O cualquier valor inicial que prefieras
      } else {
        Alert.alert("Error", response.data.message || "Ocurrió un error al guardar los datos.");
      }
    } catch (error) {
      console.error('Error sending POST request:', error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.message || "Ocurrió un error al guardar los datos.");
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          <Icon name="user" size={24} color="#333" style={styles.icon} />
          <Text style={styles.value}>{item.Cliente}</Text>
        </View>
        <View style={styles.row}>
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
            <Icon
              name="file-text-o"
              size={24}
              color="#333"
              style={styles.icon}
            />
            <Text style={styles.value}>{item.Numero_Documento}</Text>
          </View>
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
      {selectResultado !== 0 && showComment && (
        <View style={styles.rowcalendar}>
          {/* Contenedor para el campo de valor */}
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
          {/* Contenedor para el selector de fecha */}

          <TouchableOpacity onPress={showDatePickerModal}>
            <View style={styles.datePickerRow}>
              <Icon
                name="calendar"
                size={24}
                color="#333"
                style={styles.icon}
              />
              <Text>
                {selectedDate.toISOString().split("T")[0]}{" "}
                {/* Mostrar la fecha seleccionada */}
              </Text>
            </View>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
      )}

      {/* Mostrar el campo de comentario solo si el valor de selectResultado no es 0 */}
      {selectResultado !== 0 && (
        <>
          <View style={styles.row}>
            <TextInput
              style={styles.commentInput}
              placeholder="Ingrese un comentario..."
              value={comment}
              onChangeText={setComment}
              multiline={true} // Permite varias líneas
              numberOfLines={4} // Define el número de líneas visibles (ajustar según necesidad)
              textAlignVertical="top" // Asegura que el texto se alinee en la parte superior
            />
          </View>
          <View>
            <Button title="Guardar" onPress={HandleGuardar} />
          </View>
        </>
      )}
    </ScrollView>
  );
}

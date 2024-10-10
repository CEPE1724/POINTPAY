import React, { useEffect, useState } from "react";
import { launchImageLibrary } from "react-native-image-picker";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"; // Asegúrate de tener esta librería
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./InsertScreenStyle"; // Asegúrate de que la ruta es correcta
import { screen } from "../../../utils/screenName";
import { APIURL } from "../../../config/apiconfig"; // Importa tu URL de API
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { ComprobanteModal } from "../../../components/Registro/ComprobanteModal";
import { Recojo } from "../../../components/Registro";
export function InsertScreen({ route, navigation }) {
  const { item } = route.params;
  const [items, setItems] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [contactTypes, setContactTypes] = useState([]);
  const [selectedContactType, setSelectedContactType] = useState("");
  const [resultadoGestion, setResultadoGestion] = useState([]);
  const [selectedResultado, setSelectedResultado] = useState("");
  const [number, setNumber] = useState(""); // Estado para el valor del input
  const [comprobante, setComprobante] = useState(""); // Estado para el número de comprobante
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar el modal
  const [imageUri, setImageUri] = useState(null); // Estado para la imagen seleccionada
  const [images, setImages] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Estado para la fecha
  const [showDatePicker, setShowDatePicker] = useState(false); // Estado para mostrar el calendario
  const [bancos, setBancos] = useState([]);
  const [selectedBanco, setSelectedBanco] = useState("");
  const [modalVisibleRecojo, setModalVisibleRecojo] = useState(false);
  const [submittedDataRecojo, setSubmittedDataRecojo] = useState([]);
  const [observations, setObservations] = useState({});

  const getColorForValue = (projected, collected) => {
    if (collected < projected && collected > 0) return "#e28743"; // Amarillo
    if (collected >= projected) return "green"; // Verde
    return "#a91519"; // Rojo
  };

  const handleButtonPress = () => {
    navigation.navigate(screen.registro.product, { item });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(APIURL.Cbo_EstadosGestion());
        const data = await response.json();
        setItems(data); // Asumiendo que tu API devuelve un array de elementos
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleValueChange = async (value) => {
    setSelectedValue(value);
    setSelectedContactType(""); // Resetear el segundo Picker
    setResultadoGestion([]); // Resetear el tercer Picker

    if (value) {
      try {
        const response = await axios.get(APIURL.getEstadosTipoContacto(value));
        setContactTypes(response.data); // Establece los datos para el segundo Picker
      } catch (error) {
        console.error("Error al obtener tipos de contacto:", error);
      }
    } else {
      setContactTypes([]); // Resetear si no hay estado seleccionado
    }
  };

  const handleContactTypeChange = async (value) => {
    setSelectedContactType(value);
    setSelectedResultado(""); // Resetear el tercer Picker

    if (value) {
      try {
        const response = await axios.get(APIURL.getResultadoGestion(value));
        setResultadoGestion(response.data); // Establecer los datos para el tercer Picker
      } catch (error) {
        console.error("Error al obtener resultados de gestión:", error);
      }
    } else {
      setResultadoGestion([]); // Resetear si no hay tipo de contacto seleccionado
    }
  };
  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };
  const handleNumberChange = (value) => {
    setNumber(value);
  };
  const handleComprobanteChange = (value) => setComprobante(value);
  const handleResultadoChange = (value) => {
    setSelectedResultado(value);
    console.log("Resultado seleccionado:", value);
  };

  const fetchBancos = async () => {
    try {
      const response = await axios.get(APIURL.getBancos());
      setBancos(response.data);
    } catch (error) {
      console.error("Error fetching banks:", error);
    }
  };

  useEffect(() => {
    if (selectedResultado === 61) {
      fetchBancos();
      setModalVisible(true); // Abrir modal cuando selectedResultado sea 61
      setModalVisibleRecojo(false);
    }
    if (selectedResultado === 60) {
      setModalVisible(false); // Abrir modal cuando selectedResultado sea 61
      setModalVisibleRecojo(true); // Abrir modal cuando selectedResultado sea 61
      console.log("Modal", modalVisibleRecojo);
    }
  }, [selectedResultado]);

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets && Array.isArray(result.assets)) {
      // Reemplaza las imágenes anteriores con la nueva seleccionada
      const newImages = result.assets.map((asset) => asset.uri || "");
      setImages(newImages); // Cambia a setImages(newImages) para reemplazar
    }
  };

  const removeImage = (uri) => {
    setImages(images.filter((image) => image !== uri));
  };

  const onAccept = () => {
    // Validar campos y manejar datos
    if (!selectedBanco || !comprobante || !number || images.length === 0) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    // Procesa los datos
    console.log("Datos aceptados:", {
      selectedBanco,
      comprobante,
      number,
    });
    setModalVisible(false);
  };

  const handleSave = () => {
    // Validar campos y manejar datos
    if (
      selectedValue === "" ||
      selectedContactType === "" ||
      selectedResultado === ""
    ) {
      alert("Seleccione un estado, tipo de contacto y resultado de gestión.");
      return;
    }
    if (!selectedResultado) {
      alert("Por favor, seleccione un resultado de gestión.");
      return;
    }

    if(observations[item.idDetCompra].length < 10 || observations[item.idDetCompra].length > 500) {
      alert("La descripción debe tener entre 10 y 500 caracteres.");
      return;
    }
    
      // Procesa los datos
      console.log("Datos guardados:", {
        selectedResultado,
        number,
        selectedDate,
      });
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <View style={styles.card}>
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
            <Icon
              name="file-text-o"
              size={24}
              color="#333"
              style={styles.icon}
            />
            <Text style={styles.value}>{item.Numero_Documento}</Text>
          </View>
          <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
            <View style={styles.rowPro}>
              <Icon name="shopping-cart" size={24} color="#fff" />
              <Text style={styles.valuePro}>Productos</Text>
            </View>
          </TouchableOpacity>
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
      </View>

      {/* Primer Picker para estados */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={handleValueChange}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione..." value="" />
          {items.map((item) => (
            <Picker.Item
              key={item.idCbo_EstadoGestion}
              label={item.Estado}
              value={item.idCbo_EstadoGestion}
            />
          ))}
        </Picker>
      </View>

      {/* Segundo Picker para tipos de contacto */}
      {selectedValue ? (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedContactType}
            onValueChange={handleContactTypeChange}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione..." value="" />
            {contactTypes.map((type) => (
              <Picker.Item
                key={type.idCbo_EstadosTipocontacto}
                label={type.Estado}
                value={type.idCbo_EstadosTipocontacto}
              />
            ))}
          </Picker>
        </View>
      ) : null}

      {/* Tercer Picker para resultados de gestión */}
      {/* Tercer Picker para resultados de gestión */}
      {selectedContactType ? (
        <View>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedResultado}
              onValueChange={handleResultadoChange}
              style={styles.picker}
            >
              <Picker.Item label="Seleccione..." value="" />
              {resultadoGestion.map((result) => (
                <Picker.Item
                  key={result.idCbo_ResultadoGestion}
                  label={result.Resultado}
                  value={result.idCbo_ResultadoGestion}
                />
              ))}
            </Picker>
          </View>

          {/* Mostrar campo de texto y calendario si el resultado seleccionado es 54 */}
          {selectedResultado === 54 && (
            <View style={styles.calendarContainer}>
              {/* Contenedor para el campo de valor */}
              <Icon name="dollar" size={24} color="#333" style={styles.icon} />
              <View style={{ flex: 1 }}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={number}
                  onChangeText={handleNumberChange}
                  placeholder="Ingrese el Valor"
                />
              </View>
              {/* Contenedor para el selector de fecha */}
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={{ flexGrow: 0 }}
              >
                <View style={styles.datePickerRow}>
                  <Icon
                    name="calendar"
                    size={24}
                    color="#333"
                    style={styles.icon}
                  />
                  <Text style={styles.datePickerText}>
                    {selectedDate.toISOString().split("T")[0]}
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

          <ComprobanteModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            selectedBanco={selectedBanco} // Cambia esto
            setSelectedBanco={setSelectedBanco}
            comprobante={comprobante}
            handleComprobanteChange={handleComprobanteChange}
            number={number}
            handleNumberChange={handleNumberChange}
            handleImagePicker={handleImagePicker} // Define esta función
            images={images}
            removeImage={removeImage} // Define esta función
            setImages={setImages}
            onAccept={onAccept}
            bancos={bancos} // Pasa los bancos al modal
            setSelectedResultado={setSelectedResultado}
          />
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {modalVisibleRecojo && (
              <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisibleRecojo} // Cambiado a modalVisibleRecojo
                onRequestClose={() => setModalVisibleRecojo(false)} // Asegúrate de que esta función esté correcta
              >
                <View style={{ flex: 1 }}>
                  <Recojo
                    route={{ params: { item } }}
                    setModalVisibleRecojo={setModalVisibleRecojo}
                    setSubmittedDataRecojo={setSubmittedDataRecojo}
                    setSelectedResultado={setSelectedResultado}
                  />
                </View>
              </Modal>
            )}
          </View>
        </View>
      ) : null}
      {selectedResultado ? (
        <View>
          <TextInput
            style={styles.textArea} // Asegúrate de tener este estilo definido
            placeholder="Observaciones"
            multiline={true} // Permite múltiples líneas
            numberOfLines={4} // Número de líneas visibles
            textAlignVertical="top" // Alineación del texto en la parte superior
            value={observations[item.idDetCompra] || ""} // Captura el valor actual del estado
            onChangeText={(text) => {
              setObservations((prev) => ({
                ...prev,
                [item.idDetCompra]: text, // Actualiza el estado con el texto ingresado
              }));
            }}
          />
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </ScrollView>
  );
}

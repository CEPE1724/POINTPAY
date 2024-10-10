import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./ComporbanteModal.Style"; // Asegúrate de que la ruta es correcta
export function ComprobanteModal({
  modalVisible,
  setModalVisible,
  selectedBanco,
  setSelectedBanco,
  comprobante,
  handleComprobanteChange,
  number,
  handleNumberChange,
  handleImagePicker,
  images,
  removeImage,
  setImages,
  onAccept,
  bancos, // Recibe la lista de bancos
  setSelectedResultado,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)} // Cierra el modal
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Información de Comprobante</Text>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedBanco}
              onValueChange={(itemValue) => setSelectedBanco(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Seleccione..." value="" />
              {bancos.map((bank) => (
                <Picker.Item
                  key={bank.idCuenta}
                  label={bank.Descripcion}
                  value={bank.idCuenta}
                />
              ))}
            </Picker>
            
          </View>
          <View style={styles.row}>
            <Icon name="file-text" size={24} color="#333" style={styles.icon} />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={comprobante}
              onChangeText={handleComprobanteChange}
              placeholder="Número de Comprobante"
            />
          </View>

          <View style={styles.row}>
            <Icon name="dollar" size={24} color="#333" style={styles.icon} />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={number}
              onChangeText={handleNumberChange}
              placeholder="Ingrese el Valor"
            />
          </View>

          <View>
            <TouchableOpacity
              onPress={handleImagePicker}
              style={styles.uploadButton}
            >
              <Icon name="upload" size={24} color="#007bff" />
              <Text style={styles.uploadButtonText}> Cargar Imagen</Text>
            </TouchableOpacity>

            <ScrollView style={styles.containerImage}>
              <Text style={{ marginVertical: 10 }}>
                Imágenes seleccionadas: {images.length}{" "}
                {images.length < 1 ? "(¡Selecciona al menos 1!)" : ""}
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

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.actionButton, styles.acceptButton]}
              onPress={onAccept}
            >
              <Icon
                name="check"
                size={18}
                color="#FFFFFF"
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={() => {
                setModalVisible(false); // Cierra el modal
                setSelectedBanco(""); // Resetea el banco seleccionado si deseas
                setImages([]); // Resetea las imágenes
                setSelectedResultado(""); // Resetea el resultado seleccionado
              }}
            >
              <Icon
                name="times"
                size={18}
                color="#FFFFFF"
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

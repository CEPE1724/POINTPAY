import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/screenName";
import { APIURL } from "../../../config/apiconfig";
import Icon from "react-native-vector-icons/MaterialIcons";
import { styles } from "./Dashboard.Style"; // Verifica la ruta
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as XLSX from 'xlsx';

export function Dashboard(props) {
  const { navigation } = props;

  const [totalAmount, setTotalAmount] = useState("$0.00");
  const [numberOfClients, setNumberOfClients] = useState(0);
  const [totalProjected, setTotalProjected] = useState(0);
  const [percentageCollected, setPercentageCollected] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const userInfo = await AsyncStorage.getItem("userInfo");
      const token = await AsyncStorage.getItem("userToken");
      const url = APIURL.postAllCountGestiones();

      if (userInfo) {
        const { ingresoCobrador } = JSON.parse(userInfo);
        const idIngresoCobrador = ingresoCobrador.idIngresoCobrador;

        const response = await axios.post(
          url,
          { idCobrador: idIngresoCobrador },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const { totalProjected, totalCollected, count } = response.data;
        const formattedTotalCollected =
          totalCollected !== null ? totalCollected.toFixed(2) : "0.00";
        const totalCount = count !== undefined ? count : 0;

        const percentage =
          totalProjected > 0 ? (totalCollected / totalProjected) * 100 : 0;

        setTotalAmount(formattedTotalCollected);
        setNumberOfClients(totalCount);
        setTotalProjected(totalProjected);
        setPercentageCollected(percentage.toFixed(2));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  const goToInsert = () => {
    navigation.navigate(screen.drive.insert);
  };

  const gotoRegistro = () => {
    navigation.navigate(screen.registro.tab, {
      screen: screen.registro.inicio,
    });
  };

  const gotoTerreno = () => {
    navigation.navigate(screen.terreno.tab, { screen: screen.terreno.inicio });
  };

  const handleNavigate = () => {
    gotoRegistro();
  };

  const handlePendientesPress = () => {
    console.log("Navegando a Pendientes");
  };

  const handleCompletadosPress = () => {
    console.log("Navegando a Completados");
  };



  const handleImportar = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
  
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const fileUri = result.assets[0].uri;
  
        console.log('File URI:', fileUri);
  
        const fileData = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
  
        const binaryData = XLSX.read(fileData, { type: 'base64' });
        const specificSheetName = 'Data'; // Change to your sheet name
  
        if (binaryData.SheetNames.includes(specificSheetName)) {
          const worksheet = binaryData.Sheets[specificSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
  
          const filteredData = jsonData.map(row => ({
            cedula: row.cedula,
            fecha: row.fecha && !isNaN(row.fecha) 
              ? XLSX.SSF.format('dd/mm/yyyy', row.fecha)
              : row.fecha,
          }));
  
          // Count records by fecha
          const fechaCount = new Map();
          filteredData.forEach(row => {
            const date = row.fecha;
            if (fechaCount.has(date)) {
              fechaCount.set(date, fechaCount.get(date) + 1);
            } else {
              fechaCount.set(date, 1);
            }
          });
  
          // Prepare the message to show in the alert
          let countMessage = "Registros por fecha:\n";
          fechaCount.forEach((count, fecha) => {
            countMessage += `Fecha: ${fecha}, Cantidad: ${count}\n`;
          });
  
          // Show confirmation dialog
          Alert.alert(
            'Confirmar Carga',
            countMessage + "¿Desea continuar?",
            [
              {
                text: 'Cancelar',
                onPress: () => console.log('Carga cancelada'),
                style: 'cancel',
              },
              {
                text: 'Aceptar',
                onPress: () => {
                  // Store the data in a variable
                  const storedData = filteredData;
                  console.log('Datos almacenados:', storedData);
                  // You can also use setState here if needed
                },
              },
            ],
            { cancelable: false }
          );
        } else {
          console.log(`Sheet "${specificSheetName}" not found.`);
        }
      } else {
        console.log('No file selected or selection was canceled.');
      }
    } catch (err) {
      console.error('Error picking or reading document:', err);
    }
  };
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity
          onPress={handleNavigate}
          style={styles.summaryContainer}
        >
          <Text style={styles.title}>Resumen de Cobranza</Text>
          <View style={styles.row}>
            <View style={styles.card}>
              <View style={styles.iconContainer}>
                <Icon name="attach-money" size={24} color="#fff" />
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.label}>Valor Total</Text>
                <Text style={styles.summaryValue}>${totalAmount}</Text>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.iconContainer}>
                <Icon name="group" size={24} color="#fff" />
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.label}>Clientes</Text>
                <Text style={styles.summaryValue}>{numberOfClients}</Text>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.card}>
              <View style={styles.iconContainer}>
                <Icon name="assessment" size={24} color="#fff" />
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.label}>Total Proyectado</Text>
                <Text style={styles.summaryValue}>${totalProjected}</Text>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.iconContainer}>
                <Icon name="pie-chart" size={24} color="#fff" />
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.label}>% Cobrado</Text>
                <Text style={styles.summaryValue}>{percentageCollected}%</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.summaryContainer}>
          <Text style={styles.title}>Asignación diaria</Text>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={handleImportar}
              style={[styles.card, styles.clickableCard, styles.pendientesCard]}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <Icon name="upload" size={24} color="#fff" />
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.label}>Importar</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCompletadosPress}
              style={[styles.card, styles.clickableCard, styles.completadosCard]}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <Icon name="check-circle" size={24} color="#fff" />
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.label}>Asignación Manual</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={gotoTerreno} style={styles.summaryContainer}>
          <Text style={styles.title}>Verificación Terrena</Text>
          <View style={styles.row}>
            <View style={styles.card}>
              <View style={styles.iconContainer}>
                <Icon name="pending" size={24} color="#fff" />
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.label}>Pendientes</Text>
                <Text style={styles.summaryValue}>10</Text>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.iconContainer}>
                <Icon name="done" size={24} color="#fff" />
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.label}>Completados</Text>
                <Text style={styles.summaryValue}>5</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={handleRefresh}
        activeOpacity={0.7}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Icon name="refresh" size={24} color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );
}
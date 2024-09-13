// src/screens/DriveScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import axios from 'axios'; // Asegúrate de haber instalado axios
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../utils/screenName";
import { APIURL } from "../../config/apiconfig";

export function DriveScreen(props) {
  const { navigation } = props;
  const [totalAmount, setTotalAmount] = useState('$0.00');
  const [numberOfClients, setNumberOfClients] = useState(0);
  const [totalProjected, setTotalProjected] = useState(0);
  const [idCobrador, setIdCobrador] = useState(null);

  // Función para obtener los datos de la API
  const fetchData = async () => {
    try {
      // Recupera el userInfo del AsyncStorage
      const userInfo = await AsyncStorage.getItem('userInfo');
      const token = await AsyncStorage.getItem('userToken');
      const url = APIURL.postAllCountGestiones();
      console.log('URL:', url); // Imprime la URL para verificar

      if (userInfo) {
        const { ingresoCobrador } = JSON.parse(userInfo);
        console.log('IngresoCobrador:', ingresoCobrador); // Imprime el objeto ingresoCobrador para verificar
        
        const idIngresoCobrador = ingresoCobrador.idIngresoCobrador; // Captura el idIngresoCobrador
        console.log('idIngresoCobrador:', idIngresoCobrador); // Imprime el idIngresoCobrador para verificar
        
        setIdCobrador(idIngresoCobrador);

        // Llama a la API con el idCobrador recuperado
        const response = await axios.post(url, { idCobrador: idIngresoCobrador }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Response:', response.data); // Imprime la respuesta de la API para verificar
        
        const { totalProjected, totalCollected, count } = response.data;
       
        // Asegúrate de que los valores no sean nulos o indefinidos
        const formattedTotalCollected = totalCollected !== null ? totalCollected.toFixed(2) : '0.00';
        const totalCount = count !== undefined ? count : 0;
        const totalProjectedCount = totalProjected !== null ? totalProjected : 0;

        // Actualiza el estado con los datos recibidos
        setTotalAmount(formattedTotalCollected);
        setNumberOfClients(totalCount);
        setTotalProjected(totalProjectedCount);
      } else {
        console.log('No userInfo found in AsyncStorage');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
    }
  };

  // Llama a fetchData cuando el componente se monta
  useEffect(() => {
    fetchData();
  }, []);

  // Función que llama a fetchData para actualizar los datos
  const handleRefresh = () => {
    fetchData();
  };

  const goToInsert = () => {
    navigation.navigate(screen.drive.insert);
  };

  return (
    <View style={styles.container}>
      {/* Section for displaying total amount and number of clients */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Cobrado:</Text>
          <Text style={styles.summaryValue}>${totalAmount}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}># De Clientes:</Text>
          <Text style={styles.summaryValue}>{numberOfClients}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Proyectado:</Text>
          <Text style={styles.summaryValue}>${totalProjected}</Text>
        </View>
      </View>
      
      <Button title="Refresh Data" onPress={handleRefresh} />
      {/* Search Input */}
      <TextInput 
        style={styles.input}
        placeholder="Search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  summaryContainer: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryValue: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
});

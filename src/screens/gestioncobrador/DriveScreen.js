// src/screens/DriveScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { screen } from '../../utils/screenName';
import { APIURL } from '../../config/apiconfig';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import vector icons

export function DriveScreen(props) {
  const { navigation } = props;
  const [totalAmount, setTotalAmount] = useState('$0.00');
  const [numberOfClients, setNumberOfClients] = useState(0);
  const [totalProjected, setTotalProjected] = useState(0);
  const [percentageCollected, setPercentageCollected] = useState(0);
  const [idCobrador, setIdCobrador] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const fetchData = async () => {
    setLoading(true); // Start loading
    try {
      const userInfo = await AsyncStorage.getItem('userInfo');
      const token = await AsyncStorage.getItem('userToken');
      const url = APIURL.postAllCountGestiones();

      if (userInfo) {
        const { ingresoCobrador } = JSON.parse(userInfo);
        const idIngresoCobrador = ingresoCobrador.idIngresoCobrador;

        setIdCobrador(idIngresoCobrador);

        const response = await axios.post(url, { idCobrador: idIngresoCobrador }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const { totalProjected, totalCollected, count } = response.data;

        const formattedTotalCollected = totalCollected !== null ? totalCollected.toFixed(2) : '0.00';
        const totalCount = count !== undefined ? count : 0;
        const totalProjectedCount = totalProjected !== null ? totalProjected : 0;

        const percentage = totalProjectedCount > 0 ? (totalCollected / totalProjectedCount) * 100 : 0;

        setTotalAmount(formattedTotalCollected);
        setNumberOfClients(totalCount);
        setTotalProjected(totalProjectedCount);
        setPercentageCollected(percentage.toFixed(2));
      } else {
        console.log('No userInfo found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // End loading
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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>% Cobrado:</Text>
            <Text style={styles.summaryValue}>{percentageCollected}%</Text>
          </View>
        </View>

        <View style={styles.insertButtonContainer}>
          <TouchableOpacity onPress={goToInsert} style={styles.insertButton}>
            <Text style={styles.insertButtonText}>Agregar Datos</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={styles.fab} 
        onPress={handleRefresh}
        activeOpacity={0.7}
        disabled={loading} // Disable button when loading
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" /> // Show loading spinner
        ) : (
          <Icon name="refresh" size={24} color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  scrollViewContent: {
    paddingBottom: 80, // Add padding to accommodate FAB
  },
  summaryContainer: {
    backgroundColor: '#ffffff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  summaryLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryValue: {
    fontSize: 18,
    color: '#333',
  },
  insertButtonContainer: {
    margin: 20,
  },
  insertButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  insertButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: '#4a90e2',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});

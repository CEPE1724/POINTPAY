// src/screens/DriveScreen.js
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Asegúrate de instalar esta biblioteca si no lo has hecho

export default function DriveScreen() {
  // Datos de ejemplo
  const totalAmount = "$1,234.56";
  const numberOfClients = 123;

  return (
    <View style={styles.container}>
      {/* Section for displaying total amount and number of clients */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Amount:</Text>
          <Text style={styles.summaryValue}>{totalAmount}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Number of Clients:</Text>
          <Text style={styles.summaryValue}>{numberOfClients}</Text>
        </View>
      </View>

      {/* Search Input */}
      <TextInput 
        style={styles.input}
        placeholder="Search"
      />

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Column 1</Text>
        <Text style={styles.tableHeaderText}>Column 2</Text>
        <Text style={styles.tableHeaderText}>Column 3</Text>
        <Text style={styles.tableHeaderText}>Column 3</Text>
        <Text style={styles.tableHeaderText}>Column 3</Text>
      </View>

      {/* Table Rows */}
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Row 1, Cell 1</Text>
        <Text style={styles.tableCell}>Row 1, Cell 2</Text>
        <Text style={styles.tableCell}>Row 1, Cell 3</Text>
        <Text style={styles.tableCell}>Row 1, Cell 3</Text>
        <Text style={styles.tableCell}>Row 1, Cell 3</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Row 2, Cell 1</Text>
        <Text style={styles.tableCell}>Row 2, Cell 2</Text>
        <Text style={styles.tableCell}>Row 2, Cell 3</Text>
        <TouchableOpacity style={styles.actionButton}>
            <Icon name="attach-money" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="person" size={24} color="#000" />
          </TouchableOpacity>
      </View>
      {/* Add more rows as needed */}
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
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    padding: 10,
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '80%',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
  },
});

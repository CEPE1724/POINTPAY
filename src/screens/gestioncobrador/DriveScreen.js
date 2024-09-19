import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../utils/screenName";
import { APIURL } from "../../config/apiconfig";
import Icon from "react-native-vector-icons/MaterialIcons";

export function DriveScreen(props) {
  const { navigation } = props;
  const [totalAmount, setTotalAmount] = useState("$0.00");
  const [numberOfClients, setNumberOfClients] = useState(0);
  const [totalProjected, setTotalProjected] = useState(0);
  const [percentageCollected, setPercentageCollected] = useState(0);
  const [loading, setLoading] = useState(false);

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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.summaryContainer}>
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
        </View>

        <View style={styles.summaryContainer}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  summaryContainer: {
    backgroundColor: "#ffffff",
    margin: 16,
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1c2463",
    textAlign: "left",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 6,
    paddingVertical: 6,
    flex: 1,
    marginHorizontal: 4,
  },
  iconContainer: {
    backgroundColor: "#28a745",
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },
  valueContainer: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  summaryValue: {
    fontSize: 12,
    color: "#333",
  },
  insertButtonContainer: {
    margin: 16,
  },
  insertButton: {
    backgroundColor: "#1c2463",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  insertButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    backgroundColor: "#de2317",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
});

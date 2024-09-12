import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { styles } from "./RegistroScreenStyle"; // Verify the path
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/screenName";
import { APIURL} from "../../../config/apiconfig"
export function RegistroScreen( props ) {
  const { navigation } = props;
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pressedCardIndex, setPressedCardIndex] = useState(null); // State to manage pressed card

  // Fetch data from API
  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const idCobrador = 204; // Adjust according to your logic
      const url = APIURL.getAllcliente(); // Verify the path
      const response = await axios.get(url,
        {
          params: {
            idCobrador,
            page,
            limit,
          },
        }
      );
      const [fetchedData, total] = response.data;
      setData((prevData) =>
        page === 1 ? fetchedData : [...prevData, ...fetchedData]
      );
      setTotalRecords(total);
      setLoading(false);
      setLoadingMore(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleLoadMore = () => {
    if (!loadingMore && data.length < totalRecords) {
      setLoadingMore(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
    if (isBottom) {
      handleLoadMore();
    }
  };

  const handleCardPress = (item, index) => {

      navigation.navigate(screen.registro.insertCall, { item });
      Alert.alert(
        "Card Pressed",
        `idCompra: ${item.idCompra}\nCedula: ${item.Cedula}\nNumero Documento: ${item.Numero_Documento}\nValor Cobrado: $${item.Valor_Cobrado.toFixed(2)}`
      );
  };

  const getColorForValue = (projected, collected) => {
    if (collected < projected && collected > 0) {
      return "#e28743"; // Color for collected > 0 and less than projected
    }
    if (collected >= projected) {
      return "green"; // Color for collected greater than or equal to projected
    }
    return "#a91519"; // Color for collected less than 0
  };

  return (
    <ScrollView
      style={styles.container}
      onScroll={handleScroll}
      scrollEventThrottle={400}
    >
      <View style={styles.grid}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.card,
              {
                backgroundColor: pressedCardIndex === index ? "#e0e0e0" : "#fff", // Change color when pressed
                borderColor: pressedCardIndex === index ? "#ccc" : "#ddd", // Optional: Change border color when pressed
              },
            ]}
            onPress={() => handleCardPress(item, index)}
            onPressIn={() => setPressedCardIndex(index)} // Set index on press
            onPressOut={() => setPressedCardIndex(null)} // Reset index when press ends
          >
            <View style={styles.row}>
              <Icon name="user" size={20} color="black" style={styles.icon} />
              <Text style={styles.text}> {item.Cliente}</Text>
            </View>
            <View style={styles.row}>
              <Icon
                name="drivers-license-o"
                size={20}
                color="black"
                style={styles.icon}
              />
              <Text style={styles.text}> {item.Cedula}</Text>
            </View>
            <View style={styles.row}>
              <Icon
                name="file-text-o"
                size={20}
                color="black"
                style={styles.icon}
              />
              <Text style={styles.text}>{item.Numero_Documento}</Text>
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
          </TouchableOpacity>
        ))}
      </View>
      {loadingMore && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading && !loadingMore && data.length === 0 && (
        <Text style={styles.noData}>No data available</Text>
      )}
      {loading && !loadingMore && (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </ScrollView>
  );
}


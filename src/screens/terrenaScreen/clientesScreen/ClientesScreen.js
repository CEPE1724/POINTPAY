import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";
import axios from "axios";
import { styles } from "./ClientesScreen.style";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/screenName";
import { APIURL } from "../../../config/apiconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CardCliente } from "../../../components/Terrena";
import Icon from "react-native-vector-icons/FontAwesome";

export function ClientesScreen(props) {
  const { navigation } = props;
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pressedCardIndex, setPressedCardIndex] = useState(null);
  const [userInfo, setUserInfo] = useState({ ingresoCobrador: "" });
  const [userInfoLoaded, setUserInfoLoaded] = useState(false);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem("userInfo");
        if (storedUserInfo) {
          const user = JSON.parse(storedUserInfo);
          setUserInfo({
            ingresoCobrador: user.ingresoCobrador.idIngresoCobrador || "",
          });
          setUserInfoLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        setUserInfoLoaded(true);
      }
    };

    fetchUserInfo();
  }, []);

  const fetchData = async (page = 1, retries = 3) => {
    if (!userInfoLoaded || loading || (page > 1 && data.length >= totalRecords))
      return;

    setLoading(true);
    try {
      const idCobrador = userInfo.ingresoCobrador;
      const url = APIURL.getAllVerificacionTerrena();

      const response = await axios.get(url, {
        params: { idCobrador, filtro, page, limit },
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });

      const fetchedData = response.data.registros || [];
      const total = response.data.total || 0;

      // Limpiar los datos si es la primera página
      setData((prevData) =>
        page === 1 ? fetchedData : [...prevData, ...fetchedData]
      );
      setTotalRecords(total);
    } catch (error) {
      if (retries > 0) {
        console.error(`Retrying fetch data, attempts remaining: ${retries - 1}`);
        setTimeout(() => fetchData(page, retries - 1), 1000);
      } else {
        console.error("Error fetching data:", error);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (userInfoLoaded) {
      fetchData(currentPage);
      const intervalId = setInterval(() => {
        fetchData(1); // Re-fetch data every 5 seconds
      }, 9000); // 5000 ms = 5 seconds

      return () => clearInterval(intervalId); // Clean up the interval on unmount
    }
  }, [userInfoLoaded]);

  useEffect(() => {
    if (userInfoLoaded) {
      setCurrentPage(1);
      setData([]); // Limpiar los datos al cambiar el filtro
      fetchData(1); // Volver a cargar datos con el filtro
    }
  }, [filtro]);

  const handleLoadMore = () => {
    if (!loadingMore && data.length < totalRecords) {
      setLoadingMore(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleRefresh = () => {
    setCurrentPage(1); // Resetear a la primera página
    fetchData(1); // Llamar a la función de obtener datos
  };

  const handleCardPress = (item, index) => {
    navigation.navigate(screen.terreno.insert, { item });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <View style={styles.grid}>
          {data.map((item, index) => (
            <CardCliente
              key={item.idClienteVerificacion} // Clave única
              item={item}
              pressedCardIndex={pressedCardIndex}
              onPress={handleCardPress} // Pasa la función de navegación
            />
          ))}
        </View>
        {loading && !loadingMore && <ActivityIndicator size="large" color="#0000ff" />}
        {!loading && !loadingMore && data.length === 0 && (
          <View>
            <Icon
              name="history"
              size={80}
              color="#fffff"
              style={styles.iconNoData}
            />
            <Text style={styles.noData}>No se encontró nada</Text>
            <Text style={styles.noData}>
              Pruebe con una palabra clave distinta.
            </Text>
          </View>
        )}
        {loadingMore && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loadingIndicator}
          />
        )}
      </ScrollView>
      <TouchableOpacity
        style={[styles.floatingButton, { opacity: loadingMore ? 0.5 : 1 }]}
        onPress={handleRefresh}
        disabled={loadingMore}
      >
        <Icon name="refresh" size={20} color="#fff" />

      </TouchableOpacity>
    </View>
  );
}
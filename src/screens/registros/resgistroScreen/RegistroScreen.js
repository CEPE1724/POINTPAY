// RegistroScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import axios from "axios";
import { styles } from "./RegistroScreenStyle"; // Verifica el path
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/screenName";
import { APIURL } from "../../../config/apiconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Card} from '../../../components/Registro/Card'; // Importa el nuevo componente Card
import Icon from 'react-native-vector-icons/FontAwesome';

export function RegistroScreen(props) {
  const { navigation } = props;
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pressedCardIndex, setPressedCardIndex] = useState(null); // State to manage pressed card
  const [userInfo, setUserInfo] = useState({ ingresoCobrador: "" });
  const [userInfoLoaded, setUserInfoLoaded] = useState(false); // Track if user info is loaded

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem("userInfo");
        if (storedUserInfo) {
          const user = JSON.parse(storedUserInfo);
          setUserInfo({ ingresoCobrador: user.ingresoCobrador.idIngresoCobrador || "" });
          setUserInfoLoaded(true); // Mark user info as loaded
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        setUserInfoLoaded(true); // Mark user info as loaded even if there's an error
      }
    };

    fetchUserInfo();
  }, []);

  // Fetch data from API with added retry logic
  const fetchData = async (page = 1, retries = 3) => {
    if (!userInfoLoaded || loading || (page > 1 && data.length >= totalRecords)) return; // Ensure user info is loaded, avoid multiple requests, and prevent fetching if all data is loaded

    setLoading(true);
    try {
      const idCobrador = userInfo.ingresoCobrador; // Adjust according to your logic
      const url = APIURL.getAllcliente(); // Verifica el path
      const response = await axios.get(url, {
        params: {
          idCobrador,
          page,
          limit,
        },
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
      const [fetchedData, total] = response.data;
      setData((prevData) =>
        page === 1 ? fetchedData : [...prevData, ...fetchedData]
      );
      setTotalRecords(total);
      setLoading(false);
      setLoadingMore(false);
    } catch (error) {
      if (retries > 0) {
        console.error(`Retrying fetch data, attempts remaining: ${retries - 1}`);
        setTimeout(() => fetchData(page, retries - 1), 1000);
      } else {
        console.error("Error fetching data:", error);
        setLoading(false);
        setLoadingMore(false);
      }
    }
  };

  useEffect(() => {
    if (userInfoLoaded) {
      fetchData(currentPage);
    }
  }, [currentPage, userInfoLoaded]);

  const handleLoadMore = () => {
    if (!loadingMore && data.length < totalRecords) {
      setLoadingMore(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleCardPress = (item, index) => {
    navigation.navigate(screen.registro.insertCall, { item });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 80 }} // To ensure space for the floating button
      >
        <View style={styles.grid}>
          {data.map((item, index) => (
            <Card
              key={index}
              item={item}
              index={index}
              onPress={handleCardPress}
              onPressIn={setPressedCardIndex}
              onPressOut={() => setPressedCardIndex(null)}
              pressedCardIndex={pressedCardIndex}
            />
          ))}
        </View>
        {loading && !loadingMore && (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
        {!loading && !loadingMore && data.length === 0 && (
          <Text style={styles.noData}>No data available</Text>
        )}
        {loadingMore && (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
        )}
      </ScrollView>
      <TouchableOpacity
        style={[styles.floatingButton, { opacity: loadingMore ? 0.5 : 1 }]} // Disable button when loading more
        onPress={handleLoadMore}
        disabled={loadingMore} // Disable button while loading more data
      >
        <Icon name="plus" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

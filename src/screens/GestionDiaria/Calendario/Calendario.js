import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { DayCard } from '../../../components/GestionDiaria/DayCard'; // Import your DayCard component
import { styles } from './Calendario.Style'; // Import your styles
import { APIURL } from '../../../config/apiconfig';
import axios from 'axios';
import { useUserContext } from "../../../context/UserContext";
import { screen } from "../../../utils/screenName";

export function Calendario(props) {
  const { navigation } = props;
  const { user } = useUserContext();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const numColumns = 2; // Set your desired number of columns here
  console.log (user);
  // Fetch data function
  const fetchData = async () => {
    try {
      const url = APIURL.postGestiondiariaId(user.ingresoCobrador.idIngresoCobrador); // Construct the URL with the id
      const response = await axios.get(url, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [user.ingresoCobrador.idIngresoCobrador]);

  // Refresh data function
  const refreshData = async () => {
    setLoading(true); // Set loading to true while fetching
    await fetchData(); // Re-fetch data
  };

  const currentDate = new Date();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  const currentDay = currentDate.getDate(); // Current day

  const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  const handleIconPress = (day, fullDate) => {
    let idcobrador = user.ingresoCobrador.idIngresoCobrador;
    navigation.navigate(screen.gestionDiaria.diaria, { day, idcobrador, fullDate });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{`Calendario - ${month} ${year}`}</Text>
        <TouchableOpacity onPress={refreshData} style={styles.refreshButton}>
          <Text style={styles.refreshButtonText}>Actualizar</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          key={numColumns} // Add key prop to force fresh render
          data={daysArray}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => {
            const dayData = data.find(d => d.Day === item); // Find corresponding data for the day
            const fullDate = dayData ? dayData.Dia : ''; // Get the full date
            return (
              <DayCard
                day={item}
                isCurrent={item === currentDay}
                gestionado={dayData ? dayData.Gestionado : 0} // Display gestionado
                total={dayData ? dayData.Total : 0} // Display total
                onPress={() => handleIconPress(item, fullDate)} // Wrap in an arrow function
              />
            );
          }}
          numColumns={numColumns} // Number of columns
        />
      )}
    </View>
  );
};


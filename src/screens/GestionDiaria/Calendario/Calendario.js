import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import {DayCard} from '../../../components/GestionDiaria/DayCard'; // Asegúrate de importar el componente DayCard
import { styles } from './Calendario.Style'; // Asegúrate de importar los estilos
export function Calendario() {
  const currentDate = new Date();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  const currentDay = currentDate.getDate(); // Día actual

  const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{`Calendario - ${month} ${year}`}</Text>
      <FlatList
        data={daysArray}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <DayCard day={item} isCurrent={item === currentDay} />
        )}
        numColumns={3}
      />
    </View>
  );
};


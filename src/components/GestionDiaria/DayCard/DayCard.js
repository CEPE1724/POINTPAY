import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Asegúrate de tener esta biblioteca instalada

import { styles } from './DayCard.Style'; // Asegúrate de importar los estilos
export function DayCard  ({ day, onPress }) {
  const currentDate = new Date();
  const cardColor = getCardColor(day, currentDate.getDate());

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: cardColor }]}>
      <View style={styles.cardContent}>
        <FontAwesome name="calendar" size={24} color="#fff" />
        <Text style={styles.dayText}>{day}</Text>
      </View>
    </TouchableOpacity>
  );
};
const getCardColor = (day, currentDay) => {
  const today = new Date().getDate();
  if (day < today) {
    return '#d1d1d1'; // Color para días pasados
  } else if (day === today) {
    return '#4CAF50'; // Color para el día actual
  } else {
    return '#2196F3'; // Color para días futuros
  }
};




// src/screens/DriveScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DriveScreen() {
  return (
    <View style={styles.container}>
      <Text>Drive Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

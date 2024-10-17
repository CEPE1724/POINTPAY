import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export function ConnectionStatus  ()  {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe(); // Limpieza al desmontar
  }, []);

  return (
    <View style={[styles.banner, { backgroundColor: isConnected ? 'green' : 'red' }]}>
      <Text style={styles.text}>
        {isConnected ? 'Conectado a Internet' : 'Sin conexión a Internet'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    padding: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
  },
  text: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 80,
  },
});


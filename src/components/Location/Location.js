// LocationTracker.js
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location';

export function LocationTracker() {
  const [locationEnabled, setLocationEnabled] = useState(false);

  const checkLocationEnabled = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setLocationEnabled(false);
      showAlert();
    } else {
      const locationStatus = await Location.hasServicesEnabledAsync();
      setLocationEnabled(locationStatus);
      if (!locationStatus) {
        showAlert();
      }
    }
  };

  const showAlert = () => {
    Alert.alert(
      "Ubicación Desactivada",
      "Por favor, activa la ubicación para continuar.",
      [{ text: "Aceptar" }]
    );
  };

  useEffect(() => {
    checkLocationEnabled();
    const interval = setInterval(checkLocationEnabled, 5000); // Verifica cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  return null; // No necesitas renderizar nada aquí
}

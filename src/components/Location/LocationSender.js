import React, { useEffect, useState, useRef } from 'react';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APIURL } from '../../config/apiconfig';
import io from 'socket.io-client';
import NetInfo from '@react-native-community/netinfo';
import { useUserContext } from '../../context/UserContext';

const LocationSender = () => {
  const { isLoggedIn } = useUserContext();
  const [lastLocation, setLastLocation] = useState(null);
  const [isConnected, setIsConnected] = useState(true);
  const socketRef = useRef(null);
  const subscriptionRef = useRef(null);

  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const sendLocationToApi = async (newLocation) => {
    if (!isConnected) {
      console.log('No hay conexión a Internet, guardando ubicación localmente.');
      await saveLocationToStorage(newLocation);
      return;
    }

    if (!isLoggedIn) {
      console.log('Usuario no logueado, no se enviará la ubicación.');
      return;
    }

    try {
      const storedUserInfo = await AsyncStorage.getItem("userInfo");
      const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : {};
      const idUser = userInfo.ingresoCobrador?.idIngresoCobrador || null;

      if (!idUser || !newLocation?.coords) {
        console.error('Datos inválidos, no se enviará la ubicación.');
        return;
      }

      console.log('Enviando ubicación:', newLocation);
      const url = APIURL.postUbicacionesAPPlocation();
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idUser: idUser,
          latitude: newLocation.coords.latitude,
          longitude: newLocation.coords.longitude,
        }),
      });
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      socketRef.current.emit('newLocation', { idUser, ...newLocation.coords });
    } catch (error) {
      console.error('Error enviando ubicación:', error);
      await saveLocationToStorage(newLocation);
    }
  };
  const saveLocationToStorage = async (newLocation) => {
    try {
      const storedLocations = await AsyncStorage.getItem('offlineLocations');
      const locations = storedLocations ? JSON.parse(storedLocations) : [];
      locations.push({
        latitude: newLocation.coords.latitude,
        longitude: newLocation.coords.longitude,
        timestamp: newLocation.timestamp,
      });
      await AsyncStorage.setItem('offlineLocations', JSON.stringify(locations));
    } catch (error) {
      console.error('Error guardando ubicación:', error);
    }
  };

  const saveLocation = debounce((newLocation) => {
    console.log('Guardando ubicación:', newLocation);
    sendLocationToApi(newLocation);
    setLastLocation(newLocation);
  }, 3000);

  useEffect(() => {
    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    const initializeSocket = () => {
      socketRef.current = io(APIURL.socketEndpoint());
      socketRef.current.on('connect', () => console.log('Conectado al servidor de sockets'));
      socketRef.current.on('connect_error', (error) => console.error('Error de conexión de socket:', error));
    };

    initializeSocket();

    const getLocationUpdates = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permisos de ubicación no concedidos');
        return;
      }

      subscriptionRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 300000,
          distanceInterval: 50,
        },
        (newLocation) => {
          saveLocation(newLocation);
        }
      );
    };

    getLocationUpdates();

    const sendStoredLocations = async () => {
      const storedLocations = await AsyncStorage.getItem('offlineLocations');
      if (storedLocations) {
        const locations = JSON.parse(storedLocations);
        for (const loc of locations) {
          await sendLocationToApi(loc).catch(error => console.error('Error enviando ubicación almacenada:', error));
        }
        await AsyncStorage.removeItem('offlineLocations');
      }
    };

    sendStoredLocations();

    return () => {
      unsubscribeNetInfo();
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
      }
      socketRef.current.disconnect();
    };
  }, [isLoggedIn]);

  return null; // No renderiza nada
};

export default LocationSender;

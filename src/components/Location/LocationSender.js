import React, { useEffect, useState, useRef } from 'react';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APIURL } from '../../config/apiconfig';
import io from 'socket.io-client';

const LocationSender = () => {
  const [lastLocation, setLastLocation] = useState(null);
  const socketRef = useRef(null); // Mantén la referencia del socket
  const subscriptionRef = useRef(null); // Referencia para la suscripción a la ubicación

  useEffect(() => {
    // Inicializa el socket
    try {
      socketRef.current = io(APIURL.socketEndpoint());
      console.log('Conectando al servidor de sockets...');
    } catch (error) {
      console.error('Error al inicializar el socket:', error);
    }

    // Manejo de conexión del socket
    const connectSocket = () => {
      socketRef.current.on('connect', () => {
        console.log('Conectado al servidor de sockets');
      });

      socketRef.current.on('connect_error', (error) => {
        console.error('Error de conexión de socket:', error);
      });
    };

    connectSocket();

    const sendLocationToApi = async (newLocation) => {
      try {
        const storedUserInfo = await AsyncStorage.getItem("userInfo");
        const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : {};
        const idUser = userInfo.ingresoCobrador ? userInfo.ingresoCobrador.idIngresoCobrador : null;

        if (!idUser || !newLocation || !newLocation.coords) {
          console.error('Datos inválidos, no se enviará la ubicación.');
          return;
        }

        console.log('Enviando ubicación:', newLocation); // Agregar para depuración
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

    const saveLocation = (newLocation) => {
      console.log('Guardando ubicación sin cambios:', newLocation); // Para depuración
      sendLocationToApi(newLocation);
      setLastLocation(newLocation);
    };

    const getLocationUpdates = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      subscriptionRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 300000, // Actualiza cada 5 minutos
          distanceInterval: 50, // Actualiza si se mueve 50 metros
        },
        (newLocation) => {
          saveLocation(newLocation);
        }
      );
    };

    getLocationUpdates();

    // Intenta enviar ubicaciones almacenadas al inicio
    const sendStoredLocations = async () => {
      const storedLocations = await AsyncStorage.getItem('offlineLocations');
      if (storedLocations) {
        const locations = JSON.parse(storedLocations);
        for (const loc of locations) {
          try {
            await sendLocationToApi(loc);
          } catch (error) {
            console.error('Error enviando ubicación almacenada:', error);
          }
        }
        await AsyncStorage.removeItem('offlineLocations');
      }
    };

    sendStoredLocations();

    return () => {
      // Limpieza al desmontar el componente
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
      }
      socketRef.current.disconnect();
    };
  }, []);

  return null; // No renderiza nada
};

export default LocationSender;

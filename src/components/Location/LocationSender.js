import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APIURL } from '../../config/apiconfig';
import io from 'socket.io-client';

const LocationSender = () => {
  const [lastLocation, setLastLocation] = useState(null);
  const socket = io(APIURL.socketEndpoint()); // Reemplaza con tu URL de socket

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conectado al servidor de sockets');
    });

    socket.on('connect_error', (error) => {
      console.error('Error de conexión de socket:', error);
    });

    const sendLocationToApi = async (newLocation) => {
      try {
        const storedUserInfo = await AsyncStorage.getItem("userInfo");
        const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : {};
        const idUser = userInfo.ingresoCobrador ? userInfo.ingresoCobrador.idIngresoCobrador : null;

        if (!idUser || !newLocation || !newLocation.coords) {
          console.error('Datos inválidos, no se enviará la ubicación.');
          return;
        }

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

        socket.emit('newLocation', { idUser, ...newLocation.coords });
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


    const saveLocationIfChanged = (newLocation) => {
      const threshold = 0.0001;
      /* es temporal y borrar*/
      //sendLocationToApi(newLocation);
     // setLastLocation(newLocation);
      /* es temporal y borrar*/
      if (!lastLocation || 
          Math.abs(lastLocation.coords.latitude - newLocation.coords.latitude) > threshold ||
          Math.abs(lastLocation.coords.longitude - newLocation.coords.longitude) > threshold) {
            
        sendLocationToApi(newLocation);
        setLastLocation(newLocation);
      }
    };

    const getLocationUpdates = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 300000, // Actualiza cada 5 minutos 300000
          distanceInterval: 50, // Actualiza si se mueve 10 metros 10
        },
        (newLocation) => {
          saveLocationIfChanged(newLocation);
        }
      );

      return () => {
        subscription.remove();
      };
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
        // Limpia el almacenamiento después de enviar
        await AsyncStorage.removeItem('offlineLocations');
      }
    };

    sendStoredLocations();
  }, []);

  return null; // No renderiza nada
};

export default LocationSender;

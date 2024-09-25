import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { APIURL } from '../../config/apiconfig';
import io from 'socket.io-client';

export function InsertGestionscreen({ navigation }) {
    const [locations, setLocations] = useState([]);
    const socket = io(APIURL.socketEndpoint()); // Asegúrate de que esta URL sea correcta

    useEffect(() => {
        // Función para obtener las ubicaciones iniciales
        const fetchLocations = async () => {
            const url = APIURL.getUbicacionesAPPidUser(190);
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };

            try {
                const response = await fetch(url, requestOptions);
                const data = await response.json();
                if (data.locations) {
                    setLocations(data.locations);
                }
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        // Escuchar eventos de WebSocket
        socket.on('newLocation', (newLocation) => {
            setLocations(prevLocations => [...prevLocations, newLocation]);
        });

        // Llamar a la función para obtener ubicaciones iniciales
        fetchLocations();

        // Limpiar el socket al desmontar el componente
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ubicaciones</Text>
            <FlatList
                data={locations}
                keyExtractor={(item) => item.idUbicacionesAPP.toString()}
                renderItem={({ item }) => (
                    <View style={styles.locationItem}>
                        <Text>ID: {item.idUbicacionesAPP}</Text>
                        <Text>User ID: {item.idUser}</Text>
                        <Text>Latitude: {item.latitude}</Text>
                        <Text>Longitude: {item.longitude}</Text>
                        <Text>Timestamp: {new Date(item.timestamp).toLocaleString()}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    locationItem: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
});

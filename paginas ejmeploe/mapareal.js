import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps'; // Importa Polyline
import { APIURL } from '../../config/apiconfig';
import io from 'socket.io-client';

export function InsertGestionscreen({ navigation }) {
    const [lastLocation, setLastLocation] = useState(null);
    const [previousLocation, setPreviousLocation] = useState(null);
    const socket = io(APIURL.socketEndpoint());

    useEffect(() => {
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
                if (data.locations && data.locations.length > 0) {
                    setLastLocation(data.locations[data.locations.length - 1]);
                }
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        socket.on('newLocation', (newLocation) => {
            setPreviousLocation(lastLocation); // Guarda la ubicación anterior
            setLastLocation(newLocation);
        });

        fetchLocations();

        return () => {
            socket.disconnect();
        };
    }, [lastLocation]); // Asegúrate de que lastLocation se use como dependencia

    // Función para calcular un desplazamiento en la dirección de la última ubicación
    const getNextLocation = (location) => {
        const displacement = 0.0001; // Ajusta este valor para el desplazamiento deseado
        return {
            latitude: location.latitude + displacement,
            longitude: location.longitude + displacement,
        };
    };

    const nextLocation = lastLocation ? getNextLocation(lastLocation) : null;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Última Ubicación</Text>
            {lastLocation && (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: lastLocation.latitude,
                        longitude: lastLocation.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    {/* Marcador de la última ubicación */}
                    <Marker
                        coordinate={{
                            latitude: lastLocation.latitude,
                            longitude: lastLocation.longitude,
                        }}
                        title={`Ubicación ID: ${lastLocation.idUbicacionesAPP}`}
                        description={`User ID: ${lastLocation.idUser}\nTimestamp: ${new Date(lastLocation.timestamp).toLocaleString()}`}
                    />

                    {/* Marcador del desplazamiento simulado */}
                    {nextLocation && (
                        <Marker
                            coordinate={nextLocation}
                            title="Próxima Ubicación"
                            description="Simulación de desplazamiento"
                            pinColor="blue" // Cambia el color para diferenciar
                        />
                    )}

                    {/* Línea que conecta las dos ubicaciones */}
                    {previousLocation && (
                        <Polyline
                            coordinates={[
                                { latitude: previousLocation.latitude, longitude: previousLocation.longitude },
                                { latitude: lastLocation.latitude, longitude: lastLocation.longitude },
                            ]}
                            strokeColor="#000" // Color de la línea
                            strokeWidth={3} // Ancho de la línea
                        />
                    )}
                </MapView>
            )}
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
    map: {
        width: '100%',
        height: 400, // Ajusta según tus necesidades
    },
});

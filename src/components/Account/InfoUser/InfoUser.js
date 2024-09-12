import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './InfoUserStyle'; // Verifica la ruta

export function InfoUser() {
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem('userInfo');
        if (storedUserInfo) {
          const user = JSON.parse(storedUserInfo);
          setUserInfo({ name: user.Nombre || '' });
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <View style={styles.content}>
      <Avatar
        size="large"
        rounded
        icon={{ type: 'material', name: 'person' }}
        containerStyle={styles.Avatar}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.text}>{userInfo.name || 'Nombre'}</Text>
      </View>
    </View>
  );
}

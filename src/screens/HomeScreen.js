
 // screens/HomeScreen.js
 import React from 'react';
 import { View, Text, Button, StyleSheet } from 'react-native';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 
 export default function HomeScreen({ navigation }) {
   const handleLogout = async () => {
     await AsyncStorage.removeItem('userToken');
     navigation.navigate('Login');
   };
 
   return (
     <View style={styles.container}>
       <Text style={styles.title}>Welcome to the Home Screen</Text>
       <Button title="Logout" onPress={handleLogout} />
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
   title: {
     fontSize: 24,
     fontWeight: 'bold',
     marginBottom: 20,
   },
 });
 
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderRadius: 15,
        margin: 10,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        alignItems: 'center',
      },
      cardContent: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      dayText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 5,
      },
});

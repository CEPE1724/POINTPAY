import {StyleSheet}  from 'react-native';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
      },
      grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
      card: {
        width: '48%', // Adjust width to fit two items per row
        backgroundColor: '#f8f8f8',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        borderColor: '#ddd',
        borderWidth: 1,
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
      },
      rowProyect: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
        backgroundColor: '#FFFFFF',
        
      },
      rowCash: {
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'space-between',
        padding: 5,
        backgroundColor: '#FFFFFF',
      },
      text: {
        flex: 1, // This will make the text take up all available space
        fontSize: 10,
        marginBottom: 5,
      },
      textProyect: {
        flex: 1, // This will make the text take up all available space
        fontSize: 10,
        marginBottom: 5,
        color: '#a91519',
        fontStyle: 'italic',
        fontWeight: 'bold',
        
      },
      icon: {
        marginLeft: 1, // Adjust this value to increase/decrease the space between text and icon
        marginRight: 5,

      },
      button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
      },
      buttonText: {
        color: '#fff',
        textAlign: 'center',
      },
      noData: {
        textAlign: 'center',
        marginTop: 20,
      },
});

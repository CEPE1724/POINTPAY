import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: '#F4F4F4', // Gris claro para el fondo
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF', // Blanco para el contenedor de detalles
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000000', // Negro para la sombra
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10, // Para la sombra en Android
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2, // Reducido para hacer el espacio más pequeño
    paddingVertical: 3, // Reducido para ajustar el padding vertical
  },
  rowProyect: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD', // Gris claro para la línea de separación
    paddingTop: 8,
  },
  text: {
    fontSize: 16,
    color: '#333333', // Gris oscuro para el texto
  },
  value: {
    fontSize: 16,
    color: '#555555', // Gris medio para los valores
    marginLeft: 8,
  },
  textProyect: {
    fontSize: 16,
    color: '#008C8C', // Verde aqua para los valores proyectados
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 8,
  },
  pickerContainer: {
    marginTop: 16,
  },
  pickerLabel: {
    fontSize: 14, // Tamaño de letra reducido
    color: '#333333',
    marginBottom: 8,
    fontWeight: 'bold',
    marginLeft: 8,
    marginRight: 30,
  },
  picker: {
    height: 30, // Altura del Picker incrementada para una mejor usabilidad
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 14, // Tamaño de letra dentro del Picker
  },
  rowList: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4, // Reducido para hacer el espacio entre elementos más pequeño
    paddingVertical: 1, // Reducido para ajustar el padding vertical
  },
  commentInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  
});

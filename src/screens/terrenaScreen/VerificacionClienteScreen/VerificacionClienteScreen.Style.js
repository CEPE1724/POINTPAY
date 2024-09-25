import { StyleSheet } from "react-native";
import { Icon } from "react-native-paper";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  screenContainer: {
    flex: 1,
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#1c2463",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 5,
    padding: 20,
    marginBottom: 20,
  },
  detailsContainer: {
    width: "100%",
    padding: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginLeft: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  rowOption: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginVertical: 10,
  },
  borderContainer: {
    borderWidth: 1,
    borderColor: "#1c2463",
    borderRadius: 5,
    padding: 8,
  },
  radioButtonLabel: {
    marginLeft: 8,
    fontSize: 12,
  },
  viviendaContainer: {
    marginVertical: 10,
  },
  viviendaLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  textInput: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  submitButton: {
    backgroundColor: "#228b22",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  arrowButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5, // Menos padding
    backgroundColor: "#f0f0f0", // Fondo más suave
    borderRadius: 15, // Ligero redondeo
    elevation: 1, // Sombra más sutil
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 1,
  },
  button: {
    backgroundColor: "#228b22",
    padding: 5,
    borderRadius: 100,
    alignItems: "center",
    marginTop: 5,
    width: "50%",
    height: 50,
  },
  iconbutton: {
    padding: 10,
  },
  

  containerImage: {
    paddingBottom: 60,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  buttonImage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#228b22',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonTextImage: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
  imageListImage: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageImage: {
    width: '100%',  // Cambiado para que ocupe el 100% del View
    height: '100%',
    marginBottom: 10,
  },

});
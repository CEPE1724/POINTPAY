import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginVertical: 1,
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
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  textInput: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
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

});

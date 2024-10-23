import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f4f4",
      },
      scrollViewContent: {
        paddingBottom: 80,
      },
      summaryContainer: {
        backgroundColor: "#ffffff",
        margin: 16,
        padding: 12,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
      },
      title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#1c2463",
        textAlign: "left",
      },
      row: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 6,
        paddingVertical: 6,
        flex: 1,
        marginHorizontal: 4,
      },
      iconContainer: {
        backgroundColor: "#28a745",
        borderRadius: 5,
        padding: 8,
        marginRight: 10,
      },
      valueContainer: {
        flex: 1,
      },
      label: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#333",
      },
      summaryValue: {
        fontSize: 12,
        color: "#333",
      },
      insertButtonContainer: {
        margin: 16,
      },
      insertButton: {
        backgroundColor: "#1c2463",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
      },
      insertButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
      },
      fab: {
        position: "absolute",
        bottom: 20,
        right: 20,
        width: 56,
        height: 56,
        backgroundColor: "#de2317",
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
      },
      clickableCard: {
        borderColor: 'white',
        borderWidth: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
      },
    });
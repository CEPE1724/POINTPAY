import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#242c64",
      },
      scrollViewContent: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      },
      image: {
        marginBottom: 40,
      },
      inputContainer: {
        width: "100%",
        alignItems: "flex-end",
        marginBottom: 20,
      },
      subtitle: {
        fontSize: 16,
        marginBottom: 8,
        color: "#fff",
        textAlign: "left",
        width: "100%",
      },
      input: {
        height: 50,
        width: "100%",
        borderColor: "#ddd",
        borderWidth: 1,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: "#fff",
        fontSize: 16,
        textTransform: "uppercase",
      },
      button: {
        width: "100%",
        backgroundColor: "#a91519",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
      },
      buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
      },
      passwordContainer: {
        width: "100%",
        alignItems: "flex-end",
        marginBottom: 20,
      },
      passwordInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
      },
      eyeIcon: {
        position: "absolute",
        right: 15,
        top: 15,
      },
      version: {
        color: "#fff",
        marginTop: 20,
        fontSize: 14,
      },
      datePickerText: {
        fontSize: 16,
        marginLeft: 10,
        color: "#fff",
      },
      icon: {
        marginRight: 10,
      },
    });
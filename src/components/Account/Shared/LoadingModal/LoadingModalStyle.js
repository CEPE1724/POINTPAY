import { Overlay } from "react-native-elements";
import { StyleSheet } from "react-native-web";

export const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 200,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#00a680",
  },
    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#00a680",
        textTransform: "uppercase",
        marginTop: 10,
    },
});
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // paddingTop: 50,
        width: "100%",
        alignItems: "center",
    },
    textInput: {
        height: 50,
        width: "100%",
        backgroundColor: "transparent",
        borderColor: "#4361EE",
        borderWidth: 2,
        borderRadius: 40,
        marginVertical: 20,
        paddingHorizontal: 20,
        color: "white",
        // borderColor: "lightgray",
        // borderBottomWidth: 1,
        // borderStyle: "solid",
        // paddingVertical: 10,
        // paddingHorizontal: 20,
        // marginTop: 20,
    },
    button: {
        marginTop: 80,
        borderColor: "lightgray",
        borderWidth: 1,
        borderStyle: "solid",
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: "center",
        backgroundColor: "red",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default styles;

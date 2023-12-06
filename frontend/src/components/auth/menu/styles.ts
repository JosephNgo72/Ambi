import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#262034",
    },
    containerMain: {
        padding: 30,
        flex: 1,
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 25,
        marginBottom: 25,
        color: "darkslategray",
        textAlign: "center",
    },
    providerButton: {
        borderColor: "lightgray",
        borderWidth: 1,
        borderStyle: "solid",
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    providerButtonText: {
        paddingRight: 20,
    },

    containerBottomButton: {
        backgroundColor: "ghostwhite",
        padding: 20,
        alignItems: "center",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "lightgray",
    },
    bottomButtonText: {
        fontWeight: "bold",
        color: "red",
    },
    menuMessage: {
        color: "green",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },
    textInput: {
        borderColor: "lightgray",
        borderBottomWidth: 1,
        borderStyle: "solid",
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
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

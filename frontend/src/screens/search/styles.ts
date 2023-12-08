import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#262034",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    textInput: {
        backgroundColor: "#262034",
        color: "white",
        borderWidth: 1,
        borderColor: "white",
        padding: 5,
        borderRadius: 4,
        height: 40,
        width: 280,
    },
});

export default styles;

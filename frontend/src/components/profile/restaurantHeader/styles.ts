import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    counterContainer: {
        paddingBottom: 10,
        flexDirection: "row",
    },
    counterItemContainer: {
        // flex: 1,
        alignItems: "center",
        color: "white",
    },
    emailText: {
        color: "white",
        fontSize: 16,
        fontFamily: "OpenSans-Semibold"
    },
    counterNumberText: {
        fontWeight: "bold",
        fontSize: 16,
        color: "white",
    },
    counterLabelText: {
        color: "white",
        fontSize: 11,
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 40,
    },
    addressText: {
        color: "rgba(228, 228, 228, 0.60)",
        fontSize: 12,
        fontFamily: "OpenSans"
    },
    descriptionText: {
        color: "#E4E4E4",
        fontSize: 14,
        fontFamily: "OpenSans"
    },
    linkText: {
        color: "lightblue",
        fontSize: 14,
        textDecorationLine: "underline",
        fontFamily: "OpenSans"
    },
});

export default styles;

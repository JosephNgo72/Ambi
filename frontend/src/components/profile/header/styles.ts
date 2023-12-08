import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "space-between",
        height: 140,
        paddingBottom: 10,
        flexDirection: "row",
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
        fontSize: 20,
        fontWeight: "bold",
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
        color: "gray",
        fontSize: 13,
    },
    descriptionText: {
        color: "white",
        fontSize: 14,
        fontFamily: "OpenSans-Semibold",
    },
    linkText: {
        color: "lightblue",
        fontSize: 14,
        textDecorationLine: "underline",
    },
});

export default styles;

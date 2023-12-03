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
        fontSize: 16,
    },
    linkText: {
        color: "lightblue",
        fontSize: 16,
        textDecorationLine: "underline",
    },
});

export default styles;

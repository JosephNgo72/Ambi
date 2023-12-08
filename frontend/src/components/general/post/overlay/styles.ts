import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width,
        position: "absolute",
        zIndex: 999,
        bottom: 0,
        paddingLeft: 20,
        paddingBottom: 40,
        paddingRight: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    displayName: {
        color: "white",
        fontFamily: "OpenSans-Semibold",
        fontSize: 16,
        marginRight: 10,
    },
    description: {
        color: "rgba(255, 255, 255, 0.64)",
        paddingBottom: 15,
        fontFamily: "OpenSans",
        fontSize: 16,
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: "white",
    },
    defaultAvatar: {
        borderRadius: 25,
        borderWidth: 2,
        borderColor: "white",
    },
    leftContainer: {
        alignItems: "center",
        paddingBottom: 60,
    },
    actionButton: {
        paddingBottom: 15,
    },
    actionButtonText: {
        color: "white",
        textAlign: "center",
        fontFamily: "OpenSans-Semibold",
        fontSize: 13,
    },
});

export default styles;

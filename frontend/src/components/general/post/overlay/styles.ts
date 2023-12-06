import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width,
        position: "absolute",
        zIndex: 999,
        bottom: 0,
        paddingLeft: 20,
        paddingBottom: 20,
        paddingRight: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    displayName: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    description: {
        color: "white",
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: "white",
        marginBottom: 30,
    },
    defaultAvatar: {
        marginBottom: 30,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: "white",
    },
    leftContainer: {
        alignItems: "center",
    },
    actionButton: {
        paddingBottom: 16,
    },
    actionButtonText: {
        color: "white",
        textAlign: "center",
    },
});

export default styles;

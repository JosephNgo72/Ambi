import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        backgroundColor: "#262034",
    },
    uploadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    spacer: {
        flex: 1,
    },
    formContainer: {
        margin: 20,
        flexDirection: "row",
    },
    buttonsContainer: {
        flexDirection: "row",
        margin: 20,
    },
    inputText: {
        paddingVertical: 10,
        marginRight: 10,
        borderRadius: 5,
        flex: 1,
        // backgroundColor: "#DCDCDC",
        paddingHorizontal: 5,
        fontSize: 16,

        zIndex: 1,
        backgroundColor: "#262034",
        borderWidth: 2,
        borderColor: "white",
        // borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        color: "white",
    },
    mediaPreview: {
        aspectRatio: 9 / 16,
        backgroundColor: "black",
        width: 60,
    },
    cancelButton: {
        position: "absolute",
        top: 50,
        left: 20,
        zIndex: 999,

        // alignItems: "center",
        // flex: 1,
        // borderColor: "lightgray",
        // borderWidth: 1,
        // flexDirection: "row",
        // paddingVertical: 10,
        // paddingHorizontal: 20,
        // justifyContent: "center",
        // borderRadius: 4,
        // marginRight: 10,
    },
    postButton: {
        alignItems: "center",
        flex: 1,
        backgroundColor: "#4361EE",
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: "center",
        borderRadius: 100,
        marginRight: 10,
        marginBottom: 20,
    },
    cancelButtonText: {
        marginLeft: 5,
        color: "black",
        fontWeight: "bold",
        fontSize: 16,
    },
    postButtonText: {
        marginLeft: 5,
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default styles;

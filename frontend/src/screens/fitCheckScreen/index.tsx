import {
    FlatList,
    View,
    Dimensions,
    ViewToken,
    TextInput,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
    ScrollView,
} from "react-native";
import PostSingle, { PostSingleHandles } from "../../components/general/post";
import { useContext, useEffect, useRef, useState } from "react";
import { getFeed, getPostsByUserId } from "../../services/posts";
import { Post } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/main";
import { HomeStackParamList } from "../../navigation/home";
import {
    CurrentUserProfileItemInViewContext,
    FeedStackParamList,
} from "../../navigation/feed";
import useMaterialNavBarHeight from "../../hooks/useMaterialNavBarHeight";
import { Text } from "react-native";
import { Button } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

// avoid keyboard covering text inputs
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { Keyboard } from "react-native";

import { StyleSheet } from "react-native";

//get dimensions of screen
const { width, height } = Dimensions.get("screen");

export default function FitCheckScreen() {
    const [submitted, setSubmitted] = useState(false);
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <>
            {submitted && (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#262034",
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            position: "absolute",
                            top: 50,
                            left: 10,
                        }}
                    >
                        <Ionicons name="chevron-back-outline" size={40} color="white" />
                    </TouchableOpacity>
                    <View
                        style={{
                            paddingHorizontal: 20,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 23,
                                textAlign: "center",
                                fontFamily: "OpenSans"
                            }}
                        >
                            Voting results for the dress code at...
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#4361EECC",
                                paddingHorizontal: 20,
                                borderRadius: 5,
                                width: 200,
                                height: 50,
                                marginTop: 20,
                                marginBottom: 20,
                            }}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    fontFamily: "OpenSans-Semibold",
                                    fontSize: 28,
                                }}
                            >
                                The Edge
                            </Text>
                        </View>
                    </View>
                    <Image
                        source={require("./assets/poll.png")}
                        style={{
                            width: 300,
                            height: 420,
                        }}
                    />
                    <Button
                        mode="contained"
                        onPress={() => navigation.goBack()}
                        style={{
                            marginTop: 20,
                            backgroundColor: "#4361EECC",
                            borderRadius: 100,
                            paddingHorizontal: 10,
                            width: 300,
                        }}
                        labelStyle={{
                            color: "white",
                            fontFamily: "OpenSans-Semibold",
                            fontSize: 20,
                        }}
                    >
                        Back to Restaurant
                    </Button>
                </View>
            )}
            {!submitted && (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#262034",
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            position: "absolute",
                            top: 50,
                            left: 10,
                        }}
                    >
                        <Ionicons name="chevron-back-outline" size={40} color="white" />
                    </TouchableOpacity>

                    <View
                        style={{
                            paddingHorizontal: 20,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 23,
                                textAlign: "center",
                                fontFamily: "OpenSans"
                            }}
                        >
                            Select what you feel is the suitable dress code
                            for...
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#4361EECC",
                                paddingHorizontal: 20,
                                borderRadius: 5,
                                width: 200,
                                height: 50,
                                marginTop: 20,
                            }}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    fontFamily: "OpenSans-Semibold",
                                    fontSize: 28,
                                }}
                            >
                                The Edge
                            </Text>
                        </View>
                    </View>

                    <SnapScrollView />

                    <Button
                        mode="contained"
                        onPress={() => setSubmitted(true)}
                        style={{
                            marginTop: 20,
                            backgroundColor: "#4361EECC",
                            borderRadius: 100,
                            width: 300,
                        }}
                        labelStyle={{
                            color: "white",
                            fontSize: 20,
                            fontFamily: "OpenSans-Semibold",
                        }}
                    >
                        Vote
                    </Button>
                </View>
            )}
        </>
    );
}

const SnapScrollView = () => {
    const data = [
        { id: "1", text: "./assets/outfit1.png" },
        { id: "2", text: "./assets/outfit2.png" },
        { id: "3", text: "./assets/outfit3.png" },
        { id: "4", text: "./assets/outfit4.png" },
        { id: "5", text: "./assets/outfit5.png" },
        { id: "6", text: "./assets/outfit6.png" },
    ];

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                decelerationRate={0}
                snapToInterval={width}
                snapToAlignment="center"
            >
                {data.map((item) => (
                    <View key={item.id} style={styles.item}>
                        {/* // left arrow icon */}
                        {item.id !== "1" && (
                            <Ionicons
                                name="arrow-back"
                                size={30}
                                color="white"
                                style={{
                                    position: "absolute",
                                    left: 10,
                                }}
                            />
                        )}
                        {item.id === "1" && (
                            <Image source={require("./assets/outfit1.png")} />
                        )}
                        {item.id === "2" && (
                            <Image source={require("./assets/outfit2.png")} />
                        )}
                        {item.id === "3" && (
                            <Image source={require("./assets/outfit3.png")} />
                        )}
                        {item.id === "4" && (
                            <Image source={require("./assets/outfit4.png")} />
                        )}
                        {item.id === "5" && (
                            <Image source={require("./assets/outfit5.png")} />
                        )}
                        {item.id === "6" && (
                            <Image source={require("./assets/outfit6.png")} />
                        )}

                        {item.id !== "6" && (
                            <Ionicons
                                name="arrow-forward"
                                size={30}
                                color="white"
                                style={{
                                    position: "absolute",
                                    right: 10,
                                }}
                            />
                        )}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        height: 400,
    },
    item: {
        width: width - 20 /* Set the width of your item */,
        height: 400, // Set the height as needed
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10, // Adjust spacing between items
        borderRadius: 8,
    },
    text: {
        color: "white",
        fontSize: 18,
    },
});

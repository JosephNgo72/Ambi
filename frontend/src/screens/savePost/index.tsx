import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/slices/postSlice";

import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/main";
import { AppDispatch } from "../../redux/store";
import { HomeStackParamList } from "../../navigation/home";

import { Rating, AirbnbRating } from "react-native-ratings";
import Autocomplete from "react-native-autocomplete-input";
import { Ionicons } from "@expo/vector-icons";

interface SavePostScreenProps {
    route: RouteProp<RootStackParamList, "savePost">;
}

export default function SavePostScreen({ route }: SavePostScreenProps) {
    const [description, setDescription] = useState("");
    const [requestRunning, setRequestRunning] = useState(false);
    const navigation =
        useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
const navigationRoot =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [verified, setVerified] = useState(false);


    const dispatch: AppDispatch = useDispatch();
    const handleSavePost = () => {
        setRequestRunning(true);
        dispatch(
            createPost({
                description,
                video: route.params.source,
                thumbnail: route.params.sourceThumb,
            })
        )
            .then(() => navigation.navigate("feed"))
            .catch(() => setRequestRunning(false));
    };

    if (requestRunning) {
        return (
            <View style={styles.uploadingContainer}>
                <ActivityIndicator color="red" size="large" />
            </View>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text
                    style={{
                        fontSize: 24,
                        fontFamily: "OpenSans-Semibold",
                        color: "white",
                        marginTop: 10,
                        alignSelf: "center",
                    }}
                >
                    Great Video!
                </Text>
                <Text
                    style={{
                        fontSize: 18,
                        fontFamily: "OpenSans",
                        color: "#AEAEAE",
                        marginTop: 3,
                        marginBottom: 10,
                        alignSelf: "center",
                    }}
                >
                    Add a review and caption
                </Text>
                <View style={{flexDirection: "row",}}>
                    <Image
                            style={{aspectRatio: 1,
                            width: 55,
                            resizeMode: "contain",
                            marginLeft: 15}}
                            source={require("./Location.png")}
                        />
                    <TextInput
                        style={{
                            width: "75%",
                            height: 30,
                            zIndex: 1,
                            backgroundColor: "transparent",
                            borderWidth: 1,
                            borderColor: "rgba(238, 238, 238, 0.73)",
                            borderRadius: 5,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 8,
                            marginLeft: 5,
                            color: "white",
                            fontSize: 16,
                            fontFamily: "OpenSans",
                            marginTop: 10
                        }}
                        maxLength={150}
                        onChangeText={(text) => setDescription(text)}
                        placeholder="Enter restaurant name..."
                        placeholderTextColor="rgba(255, 255, 255, 0.85)"
                    />
                </View>

                <View style={styles.formContainer}>
                    <View>
                        <Rating
                            style={{ paddingVertical: 10, alignSelf: "flex-start" }}
                            tintColor="#262034"
                        />
                        <TextInput
                            style={styles.inputText}
                            maxLength={150}
                            multiline
                            onChangeText={(text) => setDescription(text)}
                            placeholder="Let others know what you thought in 2000 characters!"
                            placeholderTextColor="#737373"
                        />
                    </View>
                    <Image
                        style={styles.mediaPreview}
                        source={require("./thumbnail.png")}
                    />
                </View>

                <TouchableOpacity
                    onPress={() => navigationRoot.navigate("QRCamera", {setVerified: setVerified} as any)}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "90%",
                        marginLeft: 20,
                        height: 50,
                        marginBottom: 10,
                    }}
                >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                    >
                    <Text
                        style={{
                            fontSize: 18,
                            fontFamily: "OpenSans-Semibold",
                            color: "white",
                            marginRight: 10,
                        }}
                    >
                        Verify customer status
                    </Text>
{verified &&
                        <Ionicons name="checkmark-circle" size={28} color="green" />
                    }</View>
                    <Ionicons name="arrow-forward" size={28} color="white" />
                </TouchableOpacity>
                {/* <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "90%",
                        marginLeft: 20,
                        height: 50,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "white",
                        }}
                    >
                        Add to word cloud{" "}
                    </Text>
                    <Ionicons name="arrow-forward" size={28} color="white" />
                </View> */}

                <View style={styles.spacer} />

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.cancelButton}
                >
                    <Feather name="x" size={24} color="white" />
                </TouchableOpacity>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        onPress={() => handleSavePost()}
                        style={styles.postButton}
                    >
                        <Feather
                            name="corner-left-up"
                            size={24}
                            color="white"
                        />
                        <Text style={styles.postButtonText}>Post</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

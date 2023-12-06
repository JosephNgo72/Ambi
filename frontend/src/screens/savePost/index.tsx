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

interface SavePostScreenProps {
    route: RouteProp<RootStackParamList, "savePost">;
}

export default function SavePostScreen({ route }: SavePostScreenProps) {
    const [description, setDescription] = useState("");
    const [requestRunning, setRequestRunning] = useState(false);
    const navigation =
        useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

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
                <TextInput
                    style={{
                        width: "90%",
                        height: 50,
                        zIndex: 1,
                        backgroundColor: "#262034",
                        borderWidth: 2,
                        borderColor: "white",
                        borderRadius: 5,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 5,
                        marginLeft: 20,
                        color: "white",
                        fontSize: 20,
                    }}
                    maxLength={150}
                    onChangeText={(text) => setDescription(text)}
                    placeholder="Find the restaurant..."
                    placeholderTextColor="darkgray"
                />

                <View style={styles.formContainer}>
                    <View>
                        <Rating
                            style={{ paddingVertical: 10 }}
                            tintColor="#262034"
                        />
                        <TextInput
                            style={styles.inputText}
                            maxLength={150}
                            multiline
                            onChangeText={(text) => setDescription(text)}
                            placeholder="Let others know what you thought!"
                            placeholderTextColor="#737373"
                        />
                    </View>
                    <Image
                        style={styles.mediaPreview}
                        source={require("./thumbnail.png")}
                    />
                </View>

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

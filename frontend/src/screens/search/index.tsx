import React, { useEffect, useState, useContext } from "react";
import {
    TextInput,
    FlatList,
    View,
    Text,
    Button,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    ScrollView,
} from "react-native";
import { getPostsByUserId } from "../../services/posts";

import {
    CurrentUserProfileItemInViewContext,
    FeedStackParamList,
} from "../../navigation/feed";
import { useUser } from "../../hooks/useUser";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchUserItem from "../../components/search/userItem";
import { queryUsersByEmail } from "../../services/user";
import styles from "./styles";
import { SearchUser } from "../../../types";
//back button
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/main";
//back button icon
import { Ionicons } from "@expo/vector-icons";
import ProfilePostList from "../../components/profile/postList";
import { Post } from "../../../types";

import { Keyboard } from "react-native";

export default function SearchScreen() {
    const [textInput, setTextInput] = useState("");
    const [searchUsers, setSearchUsers] = useState<SearchUser[]>([]);
    const [openNowFilter, setOpenNowFilter] = useState(false);
    const [distanceFilter, setDistanceFilter] = useState(false);
    const [ratingFilter, setRatingFilter] = useState(false);
    const [priceFilter, setPriceFilter] = useState(false);

    useEffect(() => {
        setUserPosts(shuffle(userPosts));
    }, [openNowFilter, distanceFilter, ratingFilter, priceFilter]);

    useEffect(() => {
        queryUsersByEmail(textInput).then((users) => setSearchUsers(users));
    }, [textInput]);

    // back button
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [searched, setSearched] = useState(false);

    useEffect(() => {
        if (searched) {
            Keyboard.dismiss();
        }
    }, [searched]);

    // user posts
    const initialUserId = "xayhPInCttXHxhxGNboPbSzSN2J2";
    const [userPosts, setUserPosts] = useState<Post[]>([]);

    const providerUserId = useContext(CurrentUserProfileItemInViewContext);

    const userQuery = useUser(
        initialUserId
            ? initialUserId
            : providerUserId.currentUserProfileItemInView
    );

    const user = userQuery.data;

    useEffect(() => {
        if (!user) {
            return;
        }

        getPostsByUserId(user?.uid).then((posts) => {
            setUserPosts(posts);
        });
    }, [user]);

    // function that randomizes the order of the posts
    function shuffle(array: Post[]) {
        var currentIndex = array.length,
            randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }

        return array;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Ionicons
                    name="arrow-back"
                    size={30}
                    color="white"
                    onPress={() => navigation.goBack()}
                />
                <TextInput
                    onChangeText={setTextInput}
                    value={textInput}
                    style={styles.textInput}
                    placeholder={"Search"}
                    autoFocus={true}
                />
                <TouchableOpacity
                    onPress={() => {
                        if (textInput.length > 0) {
                            setSearched(true);
                        }
                    }}
                >
                    <Text style={{ color: "#F23288", fontSize: 20 }}>
                        Search
                    </Text>
                </TouchableOpacity>
            </View>

            {searched && (
                <>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginLeft: 5,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#3B3648",
                                borderRadius: 5,
                                padding: 5,
                                height: 35,
                                paddingHorizontal: 15,
                                marginLeft: 5,
                                marginRight: 5,
                                marginBottom: 5,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            onPress={() => setOpenNowFilter(!openNowFilter)}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: openNowFilter ? "#F23288" : "gray",
                                    textAlign: "center",
                                }}
                            >
                                Open now
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#3B3648",
                                borderRadius: 5,
                                padding: 5,
                                height: 35,
                                paddingHorizontal: 15,
                                marginLeft: 5,
                                marginRight: 5,
                                marginBottom: 5,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            onPress={() => setDistanceFilter(!distanceFilter)}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: distanceFilter ? "#F23288" : "gray",
                                    textAlign: "center",
                                }}
                            >
                                Distance
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#3B3648",
                                borderRadius: 5,
                                padding: 5,
                                height: 35,
                                width: 100,
                                marginLeft: 5,
                                marginRight: 5,
                                marginBottom: 5,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            onPress={() => setRatingFilter(!ratingFilter)}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: ratingFilter ? "#F23288" : "gray",
                                    textAlign: "center",
                                }}
                            >
                                Rating
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#3B3648",
                                borderRadius: 5,
                                padding: 5,
                                height: 35,
                                paddingHorizontal: 15,
                                marginLeft: 5,
                                marginRight: 5,
                                marginBottom: 5,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            onPress={() => setPriceFilter(!priceFilter)}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: priceFilter ? "#F23288" : "gray",
                                    textAlign: "center",
                                }}
                            >
                                Price
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        style={{
                            flex: 1,
                            backgroundColor: "#262034",
                        }}
                    >
                        <ProfilePostList posts={userPosts} search={true} />
                    </ScrollView>
                </>
            )}

            {textInput.length == 0 && !searched && (
                <TouchableWithoutFeedback
                    onPress={() => {
                        setTextInput("Korean BBQ");
                    }}
                >
                    <Image
                        source={require("./searchterms.png")}
                        style={{
                            width: "100%",
                            height: 420,
                        }}
                    />
                </TouchableWithoutFeedback>
            )}

            {textInput.length > 0 && !searched && (
                <TouchableWithoutFeedback
                    onPress={() => {
                        setSearched(true);
                    }}
                >
                    <Image
                        source={require("./koreanbbq.png")}
                        style={{
                            width: "100%",
                            height: 450,
                        }}
                    />
                </TouchableWithoutFeedback>
            )}
        </SafeAreaView>
    );
}

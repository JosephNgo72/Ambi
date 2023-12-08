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
    const [searched, setSearched] = useState(false);
    const [userPosts, setUserPosts] = useState<Post[]>([]);
    
    useEffect(() => {
        setUserPosts(shuffle(userPosts));
    }, [openNowFilter, distanceFilter, ratingFilter, priceFilter]);

    useEffect(() => {
        queryUsersByEmail(textInput).then((users) => setSearchUsers(users));
    }, [textInput]);

    // back button
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        if (searched) {
            Keyboard.dismiss();
        }
    }, [searched]);

    // user posts
    const initialUserId = "xayhPInCttXHxhxGNboPbSzSN2J2";

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
                    name="chevron-back-outline"
                    size={40}
                    color="white"
                    onPress={() => navigation.goBack()}
                />
                <Ionicons
                    style={{
                        position: "absolute",
                        top: 20,
                        left: 80,
                        zIndex: 1,
                    }}
                    name="search"
                    size={20}
                    color="white"
                />

                <TextInput
                    style={{
                        // position: "absolute",
                        // top: 45,
                        width: "65%",
                        height: 30,
                        zIndex: 1,
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderWidth: 1,
                        borderColor: "transparent",
                        borderRadius: 5,
                        paddingLeft: 35,
                        color: "white",
                        fontFamily: "OpenSans"
                    }}
                    placeholderTextColor={"white"}
                    maxLength={150}
                    placeholder="Search"
                    placeholderTextColor="rgba(255, 255, 255, 0.3)" 
                    onTouchStart={() => navigation.navigate("search")}
                />
                <TouchableOpacity
                    onPress={() => {
                        if (textInput.length > 0) {
                            setSearched(true);
                        }
                    }}
                >
                    <Text style={{ color: "#F23288", fontSize: 18,  fontFamily: "OpenSans-Semibold"}}>
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
                            justifyContent: "space-evenly",
                            marginLeft: 5,
                            marginRight: 5,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#3B3648",
                                borderRadius: 5,
                                padding: 5,
                                height: 35,
                                paddingHorizontal: 10,
                                marginLeft: 5,
                                marginRight: 5,
                                marginBottom: 8,
                                marginTop: 0,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            onPress={() => setOpenNowFilter(!openNowFilter)}
                        >
                            <Text
                                style={{
                                    fontSize: 14,
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
                                paddingHorizontal: 10,
                                marginLeft: 5,
                                marginRight: 5,
                                marginBottom: 8,
                                marginTop: 0,
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                            }}
                            onPress={() => setDistanceFilter(!distanceFilter)}
                        >
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: distanceFilter ? "#F23288" : "gray",
                                    textAlign: "center",
                                    paddingRight: 5,
                                }}
                            >
                                Distance
                            </Text>
                            <Ionicons
                                name="caret-down-outline"
                                size={12}
                                color={distanceFilter ? "#F23288" : "gray"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#3B3648",
                                borderRadius: 5,
                                padding: 5,
                                height: 35,
                                paddingHorizontal: 10,
                                marginLeft: 5,
                                marginRight: 5,
                                marginBottom: 8,
                                marginTop: 0,
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                            }}
                            onPress={() => setRatingFilter(!ratingFilter)}
                        >
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: ratingFilter ? "#F23288" : "gray",
                                    textAlign: "center",
                                    paddingRight: 5,
                                }}
                            >
                                Rating
                            </Text>
                            <Ionicons
                                name="caret-down-outline"
                                size={12}
                                color={ratingFilter ? "#F23288" : "gray"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#3B3648",
                                borderRadius: 5,
                                padding: 5,
                                height: 35,
                                paddingHorizontal: 10,
                                marginLeft: 5,
                                marginRight: 5,
                                marginBottom: 8,
                                marginTop: 0,
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                            }}
                            onPress={() => setPriceFilter(!priceFilter)}
                        >
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: priceFilter ? "#F23288" : "gray",
                                    textAlign: "center",
                                    paddingRight: 5,
                                }}
                            >
                                Price
                            </Text>
                            <Ionicons
                                name="caret-down-outline"
                                size={12}
                                color={priceFilter ? "#F23288" : "gray"}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginLeft: 20,
                        }}
                    >
                        <Text
                            style={{
                                paddingTop: 15,
                                paddingBottom: 10,
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "white",
                            }}
                        >
                            Found 7 results for{" "}
                        </Text>
                        <Text
                            style={{
                                paddingTop: 15,
                                paddingBottom: 10,
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "#F23288",
                            }}
                        >
                            {textInput}
                        </Text>
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
                            height: 450,
                            resizeMode: "contain",
                            marginLeft: 10
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
                            height: 470,
                            resizeMode: "contain",
                        }}
                    />
                </TouchableWithoutFeedback>
            )}
        </SafeAreaView>
    );
}

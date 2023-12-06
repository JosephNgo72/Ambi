import { ScrollView, View, Text, Image } from "react-native";
import styles from "./styles";
import ProfileNavBar from "../../components/profile/navBar";
import ProfileHeader from "../../components/profile/header";
import RestaurantHeader from "../../components/profile/restaurantHeader";
import ProfilePostList from "../../components/profile/postList";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useContext, useEffect } from "react";
import {
    CurrentUserProfileItemInViewContext,
    FeedStackParamList,
} from "../../navigation/feed";
import { useUser } from "../../hooks/useUser";
import { getPostsByUserId } from "../../services/posts";
import { Post } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/main";
import { HomeStackParamList } from "../../navigation/home";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Tab = createMaterialTopTabNavigator();

const AboutTab = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#262034",
            }}
        >
            <View
                style={{
                    width: "100%",
                    height: 50,
                    justifyContent: "center",
                    alignItems: "flex-start",
                    paddingHorizontal: 10,
                    marginTop: 10,
                }}
            >
                <Text
                    style={{
                        color: "gray",
                        fontSize: 20,
                        fontWeight: "bold",
                        textAlign: "center",
                    }}
                >
                    Ambi-board
                </Text>
            </View>
            <Image
                source={require("./assets/AmbiBoard.png")}
                style={{
                    width: 400,
                    height: 400,
                    resizeMode: "contain",
                }}
            />
            <View
                style={{
                    width: "100%",
                    height: 50,
                    justifyContent: "center",
                    alignItems: "flex-start",
                    paddingHorizontal: 10,
                    marginTop: 20,
                }}
            >
                <Text
                    style={{
                        color: "gray",
                        fontSize: 20,
                        fontWeight: "bold",
                        textAlign: "center",
                    }}
                >
                    Popular Times
                </Text>
            </View>
            <Image
                source={require("./assets/PopularTimes.png")}
                style={{
                    width: 400,
                    height: 180,
                    resizeMode: "contain",
                }}
            />
            <View
                style={{
                    width: "100%",
                    height: 50,
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    paddingHorizontal: 10,
                    marginTop: 30,
                    flexDirection: "row",
                }}
            >
                <Text
                    style={{
                        color: "gray",
                        fontSize: 20,
                        fontWeight: "bold",
                        textAlign: "center",
                    }}
                >
                    Keywords
                </Text>
                <Button
                    style={{
                        backgroundColor: "#6D5D92",
                        borderRadius: 20,
                        width: 100,
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onPress={() => {
                        navigation.navigate("WordReview");
                    }}
                >
                    <Text style={{ color: "white" }}>Review</Text>
                </Button>
            </View>
            <Image
                source={require("./assets/WordMap.png")}
                style={{
                    width: 400,
                    height: 200,
                    resizeMode: "contain",
                }}
            />
            <View
                style={{
                    width: "100%",
                    height: 50,
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    paddingHorizontal: 10,
                    marginTop: 30,
                    flexDirection: "row",
                }}
            >
                <Text
                    style={{
                        color: "gray",
                        fontSize: 20,
                        fontWeight: "bold",
                        textAlign: "center",
                    }}
                >
                    Fit Check
                </Text>
                <Button
                    style={{
                        backgroundColor: "#6D5D92",
                        borderRadius: 20,
                        width: 100,
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onPress={() => {
                        navigation.navigate("FitCheck");
                    }}
                >
                    <Text style={{ color: "white" }}>Vote</Text>
                </Button>
            </View>
            <Image
                source={require("./assets/Fitcheck.png")}
                style={{
                    width: 400,
                    height: 220,
                    resizeMode: "contain",
                }}
            />
        </View>
    );
};

type ProfileScreenRouteProp =
    | RouteProp<RootStackParamList, "profileOther">
    | RouteProp<RootStackParamList, "otherUserProfile">
    | RouteProp<HomeStackParamList, "Me">
    | RouteProp<FeedStackParamList, "feedProfile">;

export default function ProfileScreen({
    route,
}: {
    route: ProfileScreenRouteProp & {
        params: {
            initialUserId: string;
            fromFeed: string;
        };
    };
}) {
    const { initialUserId, fromFeed } = route.params;
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

        getPostsByUserId(user?.uid).then((posts) => setUserPosts(posts));
    }, [user]);

    if (!user) {
        return <></>;
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <ProfileNavBar user={user} /> */}

            {fromFeed === "restaurant" && (
                <>
                    <RestaurantHeader user={user} />

                    <Tab.Navigator
                        screenOptions={({ route }) => ({
                            tabBarStyle: {
                                paddingHorizontal: 5,
                                paddingTop: 0,
                                backgroundColor: "#262034",
                                borderTopWidth: 0,
                            },
                            tabBarActiveTintColor: "white",
                            tabBarPressColor: "white",
                            tabBarIndicatorStyle: {
                                backgroundColor: "white",
                                height: 3,
                            },
                            tabBarInactiveTintColor: "gray",
                        })}
                    >
                        <Tab.Screen name="About">
                            {() => (
                                <ScrollView
                                    style={{
                                        flex: 1,
                                        backgroundColor: "#262034",
                                    }}
                                >
                                    <AboutTab />
                                </ScrollView>
                            )}
                        </Tab.Screen>
                        <Tab.Screen name="Reviews">
                            {() => (
                                <ScrollView
                                    style={{
                                        flex: 1,
                                        backgroundColor: "#262034",
                                    }}
                                >
                                    <ProfilePostList posts={userPosts} />
                                </ScrollView>
                            )}
                        </Tab.Screen>
                    </Tab.Navigator>
                </>
            )}

            {fromFeed === "bayarea_foodies" && (
                <>
                    <ProfileHeader user={user} otherUser={true} />
                    <ScrollView
                        style={{
                            flex: 1,
                            backgroundColor: "#262034",
                        }}
                    >
                        <ProfilePostList posts={userPosts} />
                    </ScrollView>
                </>
            )}

            {!fromFeed && (
                <>
                    {/* {route.params.fromFeed && <RestaurantHeader user={user} />} */}
                    <ProfileHeader user={user} />
                    <ScrollView
                        style={{
                            flex: 1,
                            backgroundColor: "#262034",
                        }}
                    >
                        <ProfilePostList posts={userPosts} />
                    </ScrollView>
                </>
            )}
        </SafeAreaView>
    );
}

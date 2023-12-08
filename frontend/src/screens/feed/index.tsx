import { FlatList, View, Dimensions, ViewToken, TextInput } from "react-native";
import styles from "./styles";
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

type FeedScreenRouteProp =
    | RouteProp<RootStackParamList, "userPosts">
    | RouteProp<HomeStackParamList, "feed">
    | RouteProp<FeedStackParamList, "feedList">;

interface PostViewToken extends ViewToken {
    item: Post;
}

/**
 * Component that renders a list of posts meant to be
 * used for the feed screen.
 *
 * On start make fetch for posts then use a flatList
 * to display/control the posts.
 */
export default function FeedScreen({ route }: { route: FeedScreenRouteProp }) {
    const { setCurrentUserProfileItemInView } = useContext(
        CurrentUserProfileItemInViewContext
    );

    const { creator, profile } = route.params as {
        creator: string;
        profile: boolean;
    };

    const [posts, setPosts] = useState<Post[]>([]);
    const mediaRefs = useRef<Record<string, PostSingleHandles | null>>({});

    useEffect(() => {
        if (profile && creator) {
            getPostsByUserId(creator).then((posts) => setPosts(posts));
        } else {
            getFeed().then((posts) => setPosts(posts));
        }
    }, []);

    /**
     * Called any time a new post is shown when a user scrolls
     * the FlatList, when this happens we should start playing
     * the post that is viewable and stop all the others
     */
    const onViewableItemsChanged = useRef(
        ({ changed }: { changed: PostViewToken[] }) => {
            changed.forEach((element) => {
                const cell = mediaRefs.current[element.key];

                if (cell) {
                    if (element.isViewable) {
                        if (!profile && setCurrentUserProfileItemInView) {
                            setCurrentUserProfileItemInView(
                                element.item.creator
                            );
                        }
                        cell.play();
                    } else {
                        cell.stop();
                    }
                }
            });
        }
    );

    const feedItemHeight =
        Dimensions.get("window").height - useMaterialNavBarHeight(profile);
    /**
     * renders the item shown in the FlatList
     *
     * @param {Object} item object of the post
     * @param {Integer} index position of the post in the FlatList
     * @returns
     */
    const renderItem = ({ item, index }: { item: Post; index: number }) => {
        return (
            <View
                style={{
                    height: feedItemHeight,
                    backgroundColor: "black",
                }}
            >
                <PostSingle
                    item={item}
                    ref={(PostSingeRef) =>
                        (mediaRefs.current[item.id] = PostSingeRef)
                    }
                />
            </View>
        );
    };

    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    // a search bar that hovers over the feed at the top of the screen
    const SearchBar = () => {
        return (
            <View
                style={{
                    // flexDirection: "row",
                    width: "100%",
                    position: "absolute",
                    top: 55,
                    zIndex: 1,
                    height: 40,
                }}
            >
                <Ionicons
                    style={{
                        position: "absolute",
                        top: 4,
                        left: 30,
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
                        width: "90%",
                        height: 30,
                        zIndex: 1,
                        backgroundColor: "transparent",
                        borderWidth: 1,
                        borderColor: "rgba(255, 255, 255, 0.8)",
                        borderRadius: 5,
                        paddingLeft: 20,
                        marginLeft: 20,
                    }}
                    placeholderTextColor={"white"}
                    maxLength={150}
                    placeholder="     Search"
                    onTouchStart={() => navigation.navigate("search")}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <SearchBar />
            <View
                style={{
                    width: "70%",
                    height: 60,
                    position: "absolute",
                    zIndex: 1,
                    top: 90,
                    left: 58,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        borderBottomColor: "white",
                        borderBottomWidth: 2,
                        width: "40%",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            fontFamily: "OpenSans-Bold",
                            color: "white",
                            textAlign: "center"
                        }}
                    >
                        Discover
                    </Text>
                </View>
                <Text
                    style={{
                        fontSize: 20,
                        fontFamily: "OpenSans-Bold",
                        color: "white",
                        textAlign: "center",
                        opacity: 0.7,
                    }}
                >
                    Following
                </Text>
            </View>
            <FlatList
                data={posts}
                windowSize={4}
                initialNumToRender={2}
                maxToRenderPerBatch={2}
                removeClippedSubviews
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 0,
                }}
                renderItem={renderItem}
                pagingEnabled
                keyExtractor={(item) => item.id}
                decelerationRate={"fast"}
                onViewableItemsChanged={onViewableItemsChanged.current}
            />
        </View>
    );
}

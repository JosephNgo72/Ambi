import { useEffect, useMemo, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { Post, User } from "../../../../../types";
import { useDispatch, useSelector } from "react-redux";
import { throttle } from "throttle-debounce";
import { getLikeById, updateLike } from "../../../../services/posts";
import { AppDispatch, RootState } from "../../../../redux/store";
import { openCommentModal } from "../../../../redux/slices/modalSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/main";
import { Avatar } from "react-native-paper";
// open share model on iphone
import * as Sharing from "expo-sharing";
import { LinearGradient } from "expo-linear-gradient";

/**
 * Function that renders a component meant to be overlapped on
 * top of the post with the post info like user's display name and avatar
 * and the post's description
 *
 * @param {User} user that created the post
 * @param {Post} post object
 */
export default function PostSingleOverlay({
    user,
    post,
}: {
    user: User;
    post: Post;
}) {
    const currentUser = useSelector(
        (state: RootState) => state.auth.currentUser
    );
    const dispatch: AppDispatch = useDispatch();
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [currentLikeState, setCurrentLikeState] = useState({
        state: false,
        counter: post.likesCount,
    });
    const [currentCommentsCount, setCurrentCommentsCount] = useState(
        post.commentsCount
    );

    useEffect(() => {
        if (currentUser) {
            getLikeById(post.id, currentUser.uid).then((res) => {
                setCurrentLikeState({
                    ...currentLikeState,
                    state: res,
                });
            });
        }
    }, []);

    /**
     * Handles the like button action.
     *
     * In order to make the action more snappy the like action
     * is optimistic, meaning we don't wait for a response from the
     * server and always assume the write/delete action is successful
     */
    const handleUpdateLike = useMemo(
        () =>
            throttle(500, (currentLikeStateInst: typeof currentLikeState) => {
                setCurrentLikeState({
                    state: !currentLikeStateInst.state,
                    counter:
                        currentLikeStateInst.counter +
                        (currentLikeStateInst.state ? -1 : 1),
                });
                if (currentUser) {
                    updateLike(
                        post.id,
                        currentUser.uid,
                        currentLikeStateInst.state
                    );
                }
            }),
        []
    );

    const handleUpdateCommentCount = () => {
        setCurrentCommentsCount((prevCount) => prevCount + 1);
    };

    return (
        <>
            <LinearGradient
                // Background Linear Gradient
                colors={["rgba(0,0,0,1)", "transparent"]}
                style={{
                    width: "100%",
                    height: 120,
                    position: "absolute",
                    zIndex: 1,
                    bottom: 0,
                }}
                // start at bottom of screen and go up
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
            />

            <View style={styles.container}>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                paddingBottom: 7.5,
                            }}
                            onPress={() =>
                                navigation.navigate("profileOther", {
                                    initialUserId: user?.uid ?? "",
                                    fromFeed: "restaurant",
                                })
                            }
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#314ABD",
                                    borderRadius: 5,
                                    paddingLeft: 10,
                                    height: 30,
                                    width: 120,
                                }}
                            >
                                <Text style={styles.displayName}>The Edge</Text>
                                <Ionicons
                                    color="rgba(255, 255, 255, 80)"
                                    size={20}
                                    name={"chevron-forward-outline"}
                                />
                            </View>
                        </TouchableOpacity>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                marginLeft: 10,
                                paddingBottom: 7.5,
                            }}
                        >
                            <Ionicons color="white" size={15} name={"star"} />
                            <Text
                                style={[styles.displayName, { fontSize: 16, paddingLeft: 4 }]}
                            >
                                {4.2}
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("otherUserProfile", {
                                    initialUserId: user?.uid ?? "",
                                    fromFeed: "bayarea_foodies",
                                })
                            }
                        >
                            <Text
                                style={[
                                    styles.displayName,
                                    { fontSize: 20, marginRight: 5 },
                                ]}
                            >
                                @bayarea_foodies
                            </Text>
                        </TouchableOpacity>
                        <Image
                            source={require("./verified.png")}
                            style={{ width: 20, height: 20 }}
                        />
                    </View>

                    <View
                        style={{
                            width: 300,
                        }}
                    >
                        <Text style={[styles.description, { marginTop: 8 }]}>
                            {post.description}
                        </Text>
                    </View>
                </View>

                <View style={styles.leftContainer}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleUpdateLike(currentLikeState)}
                    >
                        <Ionicons
                            color={currentLikeState.state ? "#F72585" : "white"}
                            // color={"white"}
                            size={42}
                            name={"heart"}
                        />
                        <Text style={styles.actionButtonText}>
                            {currentLikeState.counter}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() =>
                            dispatch(
                                openCommentModal({
                                    open: true,
                                    data: post,
                                    modalType: 0,
                                    onCommentSend: handleUpdateCommentCount,
                                })
                            )
                        }
                    >
                        <Ionicons color="white" size={38} name={"chatbubble"} />
                        <Text style={styles.actionButtonText}>
                            {currentCommentsCount}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.actionButton,
                        ]}
                    >
                        <Ionicons color="white" size={40} name={"bookmark"} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton,
                            { paddingTop: 5},]}>
                        {/* <Ionicons color="white" size={40} name={"share"} /> */}
                        <Ionicons color="white" size={40} name={"arrow-redo"} />
                        <Text style={styles.actionButtonText}>
                            Share
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

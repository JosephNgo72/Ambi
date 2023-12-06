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
                colors={["rgba(0,0,0,)", "transparent"]}
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
                            onPress={() =>
                                navigation.navigate("profileOther", {
                                    initialUserId: user?.uid ?? "",
                                    fromFeed: true,
                                })
                            }
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#314ABD",
                                    paddingHorizontal: 20,
                                    borderRadius: 5,
                                }}
                            >
                                <Text style={styles.displayName}>The Edge</Text>
                                <Ionicons
                                    color="white"
                                    size={30}
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
                            }}
                        >
                            <Ionicons color="white" size={20} name={"star"} />
                            <Text
                                style={[styles.displayName, { fontSize: 20 }]}
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
                                    fromFeed: false,
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
                        <Ionicons
                            name="checkmark-circle-outline"
                            color="green"
                            size={30}
                        />
                    </View>

                    <Text style={[styles.description, { marginTop: 8 }]}>
                        {post.description}
                    </Text>
                </View>

                <View style={styles.leftContainer}>
                    {/* <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("profileOther", {
                            initialUserId: user?.uid ?? "",
                            fromFeed: true,
                        })
                    }
                >
                    {user.photoURL ? (
                        <Image
                            style={styles.avatar}
                            source={{ uri: user.photoURL }}
                        />
                    ) : (
                        <Avatar.Icon
                            style={styles.defaultAvatar}
                            size={50}
                            icon={"account"}
                        />
                    )}
                </TouchableOpacity> */}
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleUpdateLike(currentLikeState)}
                    >
                        <Ionicons
                            color="white"
                            size={40}
                            name={
                                currentLikeState.state
                                    ? "heart"
                                    : "heart-outline"
                            }
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
                        <Ionicons color="white" size={40} name={"chatbubble"} />
                        <Text style={styles.actionButtonText}>
                            {currentCommentsCount}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionButton, { marginTop: 0 }]}
                    >
                        <Ionicons color="white" size={40} name={"share"} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.actionButton,
                            { marginTop: 10, right: 0 },
                        ]}
                    >
                        <Ionicons color="white" size={40} name={"bookmark"} />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

import React, { useEffect, useState } from "react";
import {
    View,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import {
    addComment,
    clearCommentListener,
    commentListener,
} from "../../../services/posts";
import CommentItem from "./item";
import { generalStyles } from "../../../styles";
import { RootState } from "../../../redux/store";
import { Post, Comment } from "../../../../types";
import { Avatar } from "react-native-paper";

import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { Keyboard } from "react-native";

const CommentModal = ({
    post,
    onCommentSend,
}: {
    post: Post;
    onCommentSend?: () => void;
}) => {
    const [comment, setComment] = useState("");
    const [commentList, setCommentList] = useState<Comment[]>([]);
    const currentUser = useSelector(
        (state: RootState) => state.auth.currentUser
    );

    useEffect(() => {
        commentListener(post.id, setCommentList);
        return () => clearCommentListener();
    }, []);

    const handleCommentSend = () => {
        if (comment.length == 0) {
            return;
        }
        setComment("");
        if (currentUser) {
            addComment(post.id, currentUser.uid, comment);
            if (onCommentSend) {
                onCommentSend();
            }
        }
    };

    const renderItem = ({ item }: { item: Comment }) => {
        return <CommentItem item={item} />;
    };

    const [focused, setFocused] = useState(false);

    return (
        //     <TouchableWithoutFeedback
        //     onPress={Keyboard.dismiss}
        //     style={{
        //         flex: 1,
        //         width: "100%",
        //         justifyContent: "center",
        //         alignItems: "center",
        //         backgroundColor: "#262034",
        //     }}
        // >
        //     <KeyboardAvoidingView
        //         style={{
        //             flex: 1,
        //             width: "100%",
        //             justifyContent: "center",
        //             alignItems: "center",
        //             backgroundColor: "#262034",
        //         }}
        //         behavior={Platform.OS === "ios" ? "padding" : "height"}
        //         keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        //     >
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss;
                // setFocused(false);
            }}
            style={styles.container}
        >
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >
                <FlatList
                    data={commentList}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
                <View style={styles.containerInput}>
                    {currentUser && currentUser.photoURL ? (
                        <Image
                            style={generalStyles.avatarSmall}
                            source={{ uri: currentUser.photoURL }}
                        />
                    ) : (
                        <Avatar.Icon size={32} icon={"account"} />
                    )}
                    <TextInput
                        value={comment}
                        onChangeText={setComment}
                        onFocus={() => {
                            setFocused(true);
                        }}
                        onBlur={() => {
                            setFocused(false);
                        }}
                        style={{
                            backgroundColor: "lightgrey",
                            borderRadius: 4,
                            flex: 1,
                            height: 40,
                            marginHorizontal: 10,
                            paddingHorizontal: 10,
                            marginBottom: focused ? 350 : 10,
                        }}
                    />
                    <TouchableOpacity onPress={() => handleCommentSend()}>
                        <Ionicons
                            name="arrow-up-circle"
                            size={34}
                            color={"crimson"}
                        />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default CommentModal;

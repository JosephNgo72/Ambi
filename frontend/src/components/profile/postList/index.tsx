import { View, FlatList, Text } from "react-native";
import ProfilePostListItem from "./item";
import styles from "./styles";
import { RootState } from "../../../redux/store";

export default function ProfilePostList({
    posts,
    search,
}: {
    posts: RootState["post"]["currentUserPosts"];
    search?: boolean;
}) {
    return (
        <View style={styles.container}>
            {posts && posts.length === 0 && (
                <View style={styles.noPostsContainer}>
                    <Text style={styles.noPostsText}>No posts yet!</Text>
                </View>
            )}
            <FlatList
                numColumns={2}
                scrollEnabled={false}
                removeClippedSubviews
                nestedScrollEnabled
                data={posts}
                contentContainerStyle={{paddingLeft: 15, paddingRight: 15}} 
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ProfilePostListItem item={item} search={search} />
                )}
            />
        </View>
    );
}

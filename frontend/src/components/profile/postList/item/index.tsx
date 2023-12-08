import { Image, TouchableOpacity, View, Text } from "react-native";
import styles from "./styles";
import { Post } from "../../../../../types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/main";
import { Ionicons } from "@expo/vector-icons";

export default function ProfilePostListItem({
    item,
    search,
}: {
    item: Post | null;
    search?: boolean;
}) {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        item && (
            <TouchableOpacity
                style={styles.container}
                onPress={() =>
                    navigation.navigate("userPosts", {
                        creator: item.creator,
                        profile: true,
                        home: true,
                    })
                }
            >
                <Image style={styles.image} source={{ uri: item.media[1] }} />
                {search && (
                    <View
                        style={{
                            width: "100%",
                            height: 70,
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            style={{
                                height: 40,
                                width: 40,
                                borderRadius: 25,
                                marginTop: 10,
                            }}
                            source={{ uri: item.media[1] }}
                        />
                        <View style={{ marginLeft: 10 }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontFamily: "OpenSans-Semibold",
                                    color: "white",
                                }}
                            >
                                Korean BBQ R...
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Ionicons name="star" size={14} color="white" />
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: "white",
                                        fontFamily: "OpenSans",
                                        paddingLeft: 3,
                                    }}
                                >
                                    4.0 (593)
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: "gray",
                                        marginLeft: 10,
                                        fontFamily: "OpenSans",
                                    }}
                                >
                                    1.2 mi
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
            </TouchableOpacity>
        )
    );
}

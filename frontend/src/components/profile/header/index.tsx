import { View, Text, Image, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { buttonStyles } from "../../../styles";
import styles from "./styles";
import { RootState } from "../../../redux/store";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/main";
import { FIREBASE_AUTH } from "../../../../firebaseConfig";
import { useFollowing } from "../../../hooks/useFollowing";
import { Feather } from "@expo/vector-icons";
import { useFollowingMutation } from "../../../hooks/useFollowingMutation";
import { useEffect, useState } from "react";
//import backbutton icon
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
// import link
import { Linking } from "react-native";

/**
 * Renders the header of the user profile and
 * handles all of the actions within it like follow, unfollow and
 * routing to the user settings.
 *
 * @param {Object} props
 * @param {Object} props.user information of the user to display
 * @returns
 */
// export function RestaurantHeader({
//     user,
// }: {
//     user: RootState["auth"]["currentUser"];
// }) {
//     const navigation =
//         useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//     const [followersCount, setFollowersCount] = useState(
//         user?.followersCount || 0
//     );

//     useEffect(() => {
//         setFollowersCount(user?.followersCount || 0);
//     }, [user]);

//     const followingData = useFollowing(
//         FIREBASE_AUTH.currentUser?.uid ?? null,
//         user?.uid ?? null
//     );
//     const isFollowing =
//         FIREBASE_AUTH.currentUser?.uid && user?.uid && followingData.data
//             ? followingData.data
//             : false;

//     const isFollowingMutation = useFollowingMutation();

//     return (
//         user && (
//             <View style={styles.container}>
//                 <TouchableOpacity
//                     style={{
//                         position: "absolute",
//                         top: 5,
//                         left: 10,
//                         zIndex: 1,
//                     }}
//                     onPress={() => navigation.goBack()}
//                 >
//                     <Ionicons name="arrow-back" size={30} color="white" />
//                 </TouchableOpacity>

//                 <View
//                     style={{
//                         flexDirection: "row",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         width: "80%",
//                         marginLeft: 100,
//                     }}
//                 >
//                     {user.photoURL ? (
//                         <Image
//                             style={styles.avatar}
//                             source={{ uri: user.photoURL }}
//                         />
//                     ) : (
//                         <Avatar.Icon size={80} icon={"account"} />
//                     )}

//                     <View
//                         style={{
//                             marginLeft: 10,
//                             width: "100%",
//                         }}
//                     >
//                         <Text style={styles.emailText}>
//                             {user.displayName || user.email}
//                         </Text>
//                         <Text style={styles.addressText}>
//                             2.6 mi • 4149 18th St, San Francisco, CA
//                         </Text>
//                     </View>
//                 </View>

//                 <View
//                     style={{
//                         marginTop: 10,
//                         width: "100%",
//                         marginLeft: 100,
//                     }}
//                 >
//                     <Text style={styles.descriptionText}>
//                         Bar • 5439 reviews
//                     </Text>
//                     <Text style={styles.descriptionText}>
//                         $$$$ • Open until 2 AM
//                     </Text>

//                     <Text
//                         style={styles.linkText}
//                         onPress={() => Linking.openURL("http://edgesf.com/")}
//                     >
//                         http://edgesf.com/
//                     </Text>
//                 </View>
//                 {/* {FIREBASE_AUTH.currentUser?.uid === user.uid ? (
//                     <TouchableOpacity
//                         style={buttonStyles.grayOutlinedButton}
//                         onPress={() => navigation.navigate("editProfile")}
//                     >
//                         <Text style={buttonStyles.grayOutlinedButtonText}>
//                             Edit Profile
//                         </Text>
//                     </TouchableOpacity>
//                 ) : (
//                     renderFollowButton()
//                 )} */}
//             </View>
//         )
//     );
// }

export default function ProfileHeader({
    user,
}: {
    user: RootState["auth"]["currentUser"];
}) {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [followersCount, setFollowersCount] = useState(
        user?.followersCount || 0
    );

    useEffect(() => {
        setFollowersCount(user?.followersCount || 0);
    }, [user]);

    const followingData = useFollowing(
        FIREBASE_AUTH.currentUser?.uid ?? null,
        user?.uid ?? null
    );
    const isFollowing =
        FIREBASE_AUTH.currentUser?.uid && user?.uid && followingData.data
            ? followingData.data
            : false;

    const isFollowingMutation = useFollowingMutation();

    return (
        user && (
            <View style={styles.container}>
                {user.photoURL ? (
                    <Image
                        style={{
                            height: 150,
                            width: 150,
                            borderRadius: 100,
                        }}
                        source={{ uri: user.photoURL }}
                    />
                ) : (
                    <Avatar.Icon size={150} icon={"account"} />
                )}
                <Text style={[{ marginTop: 10 }, styles.emailText]}>
                    {user.displayName || user.email}
                </Text>

                {/* <TouchableOpacity
                    style={[{ marginTop: 10 }, buttonStyles.grayOutlinedButton]}
                    onPress={() => navigation.navigate("editProfile")}
                >
                    <Text
                        style={{
                            color: "white",
                            fontWeight: "700",
                        }}
                    >
                        Edit Profile
                    </Text>
                </TouchableOpacity> */}
            </View>
        )
    );
}

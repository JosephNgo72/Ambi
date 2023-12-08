import {
    FlatList,
    View,
    Dimensions,
    ViewToken,
    TextInput,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
} from "react-native";
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

// avoid keyboard covering text inputs
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { Keyboard } from "react-native";

export default function WordReviewScreen() {
    const [submitted, setSubmitted] = useState(false);
    
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <>
            {submitted && (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#262034",
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: 22,
                            textAlign: "center",
                            fontFamily: "OpenSans"
                        }}
                    >
                        Thank you for your review!
                    </Text>
                    <Button
                        mode="contained"
                        onPress={() => navigation.goBack()}
                        style={{
                            marginTop: 20,
                            backgroundColor: "#4361EECC",
                            borderRadius: 100,
                            paddingHorizontal: 10,
                            width: 300,
                        }}
                        labelStyle={{
                            color: "white",
                            fontSize: 20,
                            fontFamily: "OpenSans-Semibold"
                        }}
                    >
                        Back to Restaurant
                    </Button>
                </View>
            )}
            {!submitted && (
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#262034",
                    }}
                >
                    <KeyboardAvoidingView
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#262034",
                        }}
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{
                                position: "absolute",
                                top: 50,
                                left: 10,
                            }}
                        >
                            <Ionicons
                                name="arrow-back"
                                size={30}
                                color="white"
                            />
                        </TouchableOpacity>
                        <View
                            style={{
                                width: "100%",
                                paddingHorizontal: 20,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: 23,
                                    fontFamily: "OpenSans",
                                    textAlign: "center",
                                }}
                            >
                                Leave your own one-word review about the
                                ambiance of...
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#4361EECC",
                                paddingHorizontal: 20,
                                borderRadius: 5,
                                width: 185,
                                height: 45,
                                marginTop: 20,
                            }}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: 28,
                                    fontFamily: "OpenSans-Semibold",
                                }}
                            >
                                The Edge
                            </Text>
                        </View>
                        <Image
                            source={require("../profile/assets/WordMap.png")}
                            style={{
                                width: 400,
                                height: 200,
                                resizeMode: "contain",
                                marginTop: 30,
                                marginBottom: 30
                            }}
                        />
                        <TextInput
                            style={{
                                width: 300,
                                height: 40,
                                backgroundColor: "white",
                                borderRadius: 10,
                                paddingHorizontal: 10,
                            }}
                            placeholderTextColor={"rgba(115, 115, 115, 0.90)"}
                            placeholder="Write your one-word review here..."
                        />
                        <Button
                            mode="contained"
                            onPress={() => setSubmitted(true)}
                            style={{
                                marginTop: 20,
                                backgroundColor: "#4361EECC",
                                borderRadius: 100,
                                paddingHorizontal: 10,
                                width: 300,
                            }}
                            labelStyle={{
                                color: "white",
                                fontSize: 20,
                                fontFamily: "OpenSans-Semibold",
                            }}
                        >
                            Submit
                        </Button>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            )}
        </>
    );
}
//             <View
//                 style={{
//                     flex: 1,
//                     justifyContent: "center",
//                     alignItems: "center",
//                     backgroundColor: "#262034",
//                 }}
//             >
//                 <Text
//                     style={{
//                         color: "white",
//                         fontSize: 28,
//                         textAlign: "center",
//                     }}
//                 >
//                     Thank you for your review!
//                 </Text>
//                 <Button
//                     mode="contained"
//                     onPress={() => navigation.goBack()}
//                     style={{
//                         marginTop: 20,
//                         backgroundColor: "#314ABD",
//                         borderRadius: 100,
//                         paddingHorizontal: 10,
//                         width: 300,
//                     }}
//                     labelStyle={{
//                         color: "white",
//                         fontSize: 20,
//                         fontWeight: "bold",
//                     }}
//                 >
//                     Back to Home
//                 </Button>
//             </View>
//         }
//         <TouchableWithoutFeedback
//             onPress={Keyboard.dismiss}
//             style={{
//                 flex: 1,
//                 justifyContent: "center",
//                 alignItems: "center",
//                 backgroundColor: "#262034",
//             }}
//         >
//             <KeyboardAvoidingView
//                 style={{
//                     flex: 1,
//                     justifyContent: "center",
//                     alignItems: "center",
//                     backgroundColor: "#262034",
//                 }}
//                 behavior={Platform.OS === "ios" ? "padding" : "height"}
//                 keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
//             >
//                 <TouchableOpacity
//                     onPress={() => navigation.goBack()}
//                     style={{
//                         position: "absolute",
//                         top: 50,
//                         left: 10,
//                     }}
//                 >
//                     <Ionicons name="arrow-back" size={30} color="white" />
//                 </TouchableOpacity>
//                 <View
//                     style={{
//                         width: "100%",
//                         paddingHorizontal: 20,
//                         justifyContent: "center",
//                         alignItems: "center",
//                     }}
//                 >
//                     <Text
//                         style={{
//                             color: "white",
//                             fontSize: 28,
//                             textAlign: "center",
//                         }}
//                     >
//                         Leave our own one-word review about the ambiance of...
//                     </Text>
//                 </View>
//                 <View
//                     style={{
//                         flexDirection: "row",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         backgroundColor: "#314ABD",
//                         paddingHorizontal: 20,
//                         borderRadius: 5,
//                         width: 200,
//                         height: 50,
//                         marginTop: 20,
//                     }}
//                 >
//                     <Text
//                         style={{
//                             color: "white",
//                             fontWeight: "bold",
//                             fontSize: 36,
//                         }}
//                     >
//                         The Edge
//                     </Text>
//                 </View>
//                 <Image
//                     source={require("../profile/assets/WordMap.png")}
//                     style={{
//                         width: 300,
//                         height: 250,
//                         resizeMode: "contain",
//                     }}
//                 />
//                 <TextInput
//                     style={{
//                         width: 300,
//                         height: 50,
//                         backgroundColor: "white",
//                         borderRadius: 10,
//                         paddingHorizontal: 10,
//                     }}
//                     placeholderTextColor={"darkgrey"}
//                     placeholder="Write your one-word review here..."
//                 />
//                 <Button
//                     mode="contained"
//                     onPress={() => console.log("Pressed")}
//                     style={{
//                         marginTop: 20,
//                         backgroundColor: "#314ABD",
//                         borderRadius: 100,
//                         paddingHorizontal: 10,
//                         width: 300,
//                     }}
//                     labelStyle={{
//                         color: "white",
//                         fontSize: 20,
//                         fontWeight: "bold",
//                     }}
//                 >
//                     Submit
//                 </Button>
//             </KeyboardAvoidingView>
//         </TouchableWithoutFeedback>
//     );
// }

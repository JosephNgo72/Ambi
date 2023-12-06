import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAuthStateListener } from "../../redux/slices/authSlice"; // Make sure the path is correct
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../../screens/auth";
import { AppDispatch, RootState } from "../../redux/store";
import HomeScreen from "../home";
import { View } from "react-native";
import SavePostScreen from "../../screens/savePost";
import EditProfileScreen from "../../screens/profile/edit";
import EditProfileFieldScreen from "../../screens/profile/edit/field";
import Modal from "../../components/modal";
import FeedScreen from "../../screens/feed";
import ProfileScreen from "../../screens/profile";
import ChatSingleScreen from "../../screens/chat/single";
import SearchScreen from "../../screens/search";
import WordReviewScreen from "../../screens/wordReview";
import FitCheckScreen from "../../screens/fitCheckScreen";
import InitialScreen from "../../components/auth/onboarding/initial";
import LoginDetailsScreen from "../../components/auth/onboarding/loginDetails";

import { login, register } from "../../redux/slices/authSlice";

export type RootStackParamList = {
    home: undefined;
    userPosts: { creator: string; profile: boolean };
    profileOther: {
        initialUserId: string;
        fromFeed: string;
    };
    otherUserProfile: {
        initialUserId: string;
        fromFeed: string;
    };
    savePost: { source: string; sourceThumb: string };
    editProfile: undefined;
    editProfileField: { title: string; field: string; value: string };
    chatSingle: { chatId?: string; contactId?: string };
    search: undefined;
    WordReview: undefined;
    FitCheck: undefined;
    initial: undefined;
    loginDetails: undefined;
    signupDeatils: undefined;
    accountCreated: undefined;
    chooseYourInterest: undefined;
    enableLocation: undefined;
    intro1: undefined;
    intro2: undefined;
    intro3: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Route() {
    const currentUserObj = useSelector((state: RootState) => state.auth);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(userAuthStateListener());
    }, [dispatch]);

    if (!currentUserObj.loaded) {
        return <View></View>;
    }

    // auth stuff

    const [email, setEmail] = useState("s");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        dispatch(login({ email, password }))
            .unwrap()
            .then(() => console.log("login successful"))
            .catch(() => console.log("login unsuccessful"));
    };

    const handleRegister = () => {
        dispatch(register({ email, password }))
            .unwrap()
            .then(() => {
                console.log("register successful");
            })
            .catch(() => console.log("register unsuccessful"));
    };

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {currentUserObj.currentUser == null ? (
                    <>
                        <Stack.Screen
                            name="initial"
                            component={InitialScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="loginDetails"
                            options={{ headerShown: false }}
                        >
                            {(props) => (
                                <LoginDetailsScreen
                                    {...props}
                                    setEmail={setEmail}
                                    setPassword={setPassword}
                                    handleLogin={handleLogin}
                                    handleRegister={handleRegister}
                                />
                            )}
                        </Stack.Screen>
                    </>
                ) : (
                    // <Stack.Screen
                    //     name="auth"
                    //     component={AuthScreen}
                    //     options={{ headerShown: false }}
                    // />
                    <>
                        <Stack.Screen
                            name="home"
                            component={HomeScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="savePost"
                            component={SavePostScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="userPosts"
                            component={FeedScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="profileOther"
                            component={ProfileScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="otherUserProfile"
                            component={ProfileScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="WordReview"
                            component={WordReviewScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="FitCheck"
                            component={FitCheckScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="editProfile"
                            component={EditProfileScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="editProfileField"
                            component={EditProfileFieldScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="chatSingle"
                            component={ChatSingleScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="search"
                            component={SearchScreen}
                            options={{ headerShown: false }}
                        />
                    </>
                )}
            </Stack.Navigator>
            <Modal />
        </NavigationContainer>
    );
}

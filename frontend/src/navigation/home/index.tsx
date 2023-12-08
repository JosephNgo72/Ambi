import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Feather } from "@expo/vector-icons";
import CameraScreen from "../../screens/camera";
import ProfileScreen from "../../screens/profile";
import SearchScreen from "../../screens/search";
import FeedNavigation from "../feed";
import { FIREBASE_AUTH } from "../../../firebaseConfig";
import ChatScreen from "../../screens/chat/list";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Add, Home, Person } from "@mui/icons-material";
import QRCameraScreen from "../../screens/qrCamera";

export type HomeStackParamList = {
    feed: undefined;
    Discover: undefined;
    Add: undefined;
    Inbox: undefined;
    Me: { initialUserId: string; fromFeed: string };
};

const Tab = createMaterialBottomTabNavigator<HomeStackParamList>();

export default function HomeScreen() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: {
                fontFamily: 'OpenSans',
                },
            }}
            barStyle={{ backgroundColor: "black", height: 100, }}
            initialRouteName="feed"
            activeColor="white"
            inactiveColor="white"
        >
            <Tab.Screen
                name="feed"
                component={FeedNavigation}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View>
                            <Ionicons name={focused ? "home" : "home-outline"} size={30} color={color} />
                        </View>
                    ),
                    tabBarLabel: "Home",
                }}
            />
            <Tab.Screen
                name="Add"
                component={CameraScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View>
                            <Ionicons name={focused ? "add-circle" : "add-circle-outline"} size={30} color={color} />
                        </View>
                    ),
                    tabBarLabel: "Post",
                }}
            />
            <Tab.Screen
                name="Me"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View>
                            <Ionicons name={focused ? "person-circle" : "person-circle-outline"} size={30} color={color} />
                        </View>
                    ),
                    tabBarLabel: "Profile",
                }}
                initialParams={{
                    initialUserId: FIREBASE_AUTH.currentUser?.uid ?? "",
                }}
            />
        </Tab.Navigator>
    );
}

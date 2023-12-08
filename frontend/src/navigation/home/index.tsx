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
            barStyle={{ backgroundColor: "black", height: 100 }}
            initialRouteName="feed"
            activeColor="black"
            inactiveColor="white"
        >
            <Tab.Screen
                name="feed"
                component={FeedNavigation}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View>
                            <Ionicons name="home" size={24} color={color} />
                        </View>
                    ),
                    tabBarLabel: "",
                }}
            />
            <Tab.Screen
                name="Add"
                component={CameraScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="plus-square" size={30} color={color} />
                    ),
                    tabBarLabel: "",
                }}
            />
            <Tab.Screen
                name="Me"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View style={{}}>
                            <Feather name="user" size={24} color={color} />
                        </View>
                    ),
                    tabBarLabel: "",
                }}
                initialParams={{
                    initialUserId: FIREBASE_AUTH.currentUser?.uid ?? "",
                }}
            />
        </Tab.Navigator>
    );
}

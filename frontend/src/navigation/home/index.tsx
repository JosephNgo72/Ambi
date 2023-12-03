import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Feather } from "@expo/vector-icons";
import CameraScreen from "../../screens/camera";
import ProfileScreen from "../../screens/profile";
import SearchScreen from "../../screens/search";
import FeedNavigation from "../feed";
import { FIREBASE_AUTH } from "../../../firebaseConfig";
import ChatScreen from "../../screens/chat/list";
import { useChats } from "../../hooks/useChats";
import { Text, View } from "react-native";

export type HomeStackParamList = {
    feed: undefined;
    Discover: undefined;
    Add: undefined;
    Inbox: undefined;
    Me: { initialUserId: string };
};

const Tab = createMaterialBottomTabNavigator<HomeStackParamList>();

export default function HomeScreen() {
    useChats();

    return (
        <Tab.Navigator
            barStyle={{ backgroundColor: "#262034", height: 100 }}
            initialRouteName="feed"
        >
            <Tab.Screen
                name="feed"
                component={FeedNavigation}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View>
                            <Feather name="home" size={24} color={"white"} />
                        </View>
                    ),
                    tabBarLabel: "",
                }}
            />
            {/* <Tab.Screen
        name="Discover"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={24} color={color} />
          ),
        }}
      /> */}
            <Tab.Screen
                name="Add"
                component={CameraScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="plus-square" size={30} color={"white"} />
                    ),
                    tabBarLabel: "",
                }}
            />
            {/* <Tab.Screen
        name="Inbox"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="message-square" size={24} color={color} />
          ),
        }}
      /> */}
            <Tab.Screen
                name="Me"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View style={{}}>
                            <Feather name="user" size={24} color={"white"} />
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

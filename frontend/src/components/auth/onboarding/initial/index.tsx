import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/main";

export default function InitialScreen() {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <View
            style={{
                flex: 1,
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#262034",
            }}
        >
            <View
                style={{
                    paddingTop: 110,
                    flex: 0,
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}
            >
                <Image
                    style={{
                        height: 350,
                        aspectRatio: 1,
                        resizeMode: 'contain',
                        justifyContent: "flex-start",
                    }}
                    source={require("../assets/logo_name.png")}
                />
                
                <Text
                        style={{
                            paddingTop: 18,
                            fontSize: 22,
                            color: "white",
                            fontFamily: 'OpenSans-Italic'
                        }}
                    >
                        vibe before you arrive.
                    </Text>
                
            </View>
            <View
                style={{
                    flex: 0,
                    alignItems: "center",
                    width: "100%",
                    paddingBottom: 60,
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: "#4361EE",
                        width: "80%",
                        height: 50,
                        borderRadius: 100,
                        justifyContent: "center",
                        alignItems: "center",
                        margin: 10,
                    }}
                    onPress={() => console.log("signup")}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            color: "white",
                            fontFamily: 'OpenSans-Semibold'
                        }}
                    >
                        Sign Up
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor: "transparent",
                        borderWidth: 2,
                        borderColor: "#4361EE",
                        width: "80%",
                        height: 50,
                        borderRadius: 100,
                        justifyContent: "center",
                        alignItems: "center",
                        margin: 10,
                    }}
                    onPress={() => navigation.navigate("loginDetails")}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            color: "white",
                            fontFamily: 'OpenSans-Semibold'
                        }}
                    >
                        Log In
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

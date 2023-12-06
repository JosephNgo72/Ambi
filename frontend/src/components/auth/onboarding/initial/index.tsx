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
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#262034",
            }}
        >
            <View
                style={{
                    flex: 4,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Image
                    style={{
                        width: 200,
                        height: 300,
                    }}
                    source={require("../assets/logo.png")}
                />
            </View>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
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
                    onPress={() => navigation.navigate("loginDetails")}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "white",
                        }}
                    >
                        Login
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
                    onPress={() => console.log("signup")}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "white",
                        }}
                    >
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

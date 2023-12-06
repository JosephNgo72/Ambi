import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
} from "react-native";
import { Dispatch, SetStateAction } from "react";
import { Feather } from "@expo/vector-icons";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/main";

import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { Keyboard } from "react-native";

export default function LoginDetailsScreen({
    setEmail,
    setPassword,
    handleLogin,
    handleRegister,
}: {
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    handleLogin: () => void;
    handleRegister: () => void;
}) {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            style={{
                flex: 1,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#262034",
            }}
        >
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    width: "100%",
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
                    <Ionicons name="arrow-back" size={30} color="white" />
                </TouchableOpacity>
                <View
                    style={{
                        // justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 50,
                            fontWeight: "bold",
                            color: "white",
                            marginTop: 100,
                        }}
                    >
                        Log in
                    </Text>

                    <View style={styles.container}>
                        <View
                            style={{
                                width: "80%",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    color: "white",
                                    marginTop: 100,
                                }}
                            >
                                Username
                            </Text>
                            <TextInput
                                onChangeText={(text) => setEmail(text)}
                                style={styles.textInput}
                                placeholder="Email"
                            />
                        </View>
                        <View
                            style={{
                                width: "80%",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    color: "white",
                                }}
                            >
                                Password
                            </Text>
                            <TextInput
                                onChangeText={(text) => setPassword(text)}
                                style={styles.textInput}
                                secureTextEntry
                                placeholder="Password"
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        style={{
                            backgroundColor: "#4361EE",
                            width: "80%",
                            height: 50,
                            borderRadius: 100,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onPress={() => handleLogin()}
                    >
                        <Text style={styles.buttonText}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

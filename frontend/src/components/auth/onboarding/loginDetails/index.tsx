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
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#262034",
            }}
        >
            <KeyboardAvoidingView
                style={{
                    flex: 0,
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#262034",
                }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        top: 60,
                        left: 10,
                        bottom: 0
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back-outline" size={40} color="white" />
                </TouchableOpacity>
                <View
                    style={{
                        
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 64,
                            fontWeight: "bold",
                            color: "white",
                            marginTop: 100,
                            fontFamily: 'OpenSans-Semibold'
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
                                    fontFamily: 'OpenSans-Semibold',
                                    color: "white",
                                    marginTop: 100,
                                }}
                            >
                                Username
                            </Text>
                            <TextInput
                                onChangeText={(text) =>
                                    setEmail("joseph.ngo72@gmail.com")
                                }
                                style={styles.textInput}
                                placeholder="Username"
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
                                    fontFamily: 'OpenSans-Semibold',
                                    color: "white",
                                }}
                            >
                                Password
                            </Text>
                            <TextInput
                                onChangeText={(text) => setPassword("password")}
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

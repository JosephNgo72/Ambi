import { Dispatch, SetStateAction, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import styles from "./styles";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { login, register } from "../../../redux/slices/authSlice";
import { AppDispatch } from "../../../redux/store";

import InitialScreen from "../onboarding/initial";

export interface AuthDetailsProps {
    authPage: 0 | 1;
    setAuthPage: Dispatch<SetStateAction<0 | 1>>;
    setMenuMessage: Dispatch<SetStateAction<string>>;
    setDetailsPage: Dispatch<SetStateAction<boolean>>;
}

export type RootStackParamList = {
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

export interface AuthMenuProps {
    authPage: number;
    setAuthPage: Dispatch<SetStateAction<0 | 1>>;
    menuMessage: string;
    setMenuMessage: Dispatch<SetStateAction<string>>;
    setDetailsPage: Dispatch<SetStateAction<boolean>>;
}

export default function AuthMenu({
    authPage,
    setAuthPage,

    menuMessage,
    setMenuMessage,

    setDetailsPage,
}: AuthMenuProps) {
    const [email, setEmail] = useState("s");
    const [password, setPassword] = useState("");

    const dispatch: AppDispatch = useDispatch();

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
                setDetailsPage(false);
                setAuthPage(1);
                setMenuMessage("Creating account...");
            })
            .catch(() => console.log("register unsuccessful"));
    };

    return (
        <View style={styles.container}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="initial"
                        component={InitialScreen}
                        options={{ headerShown: false }}
                    />
                    {/* <Stack.Screen
                        name="loginDetails"
                        component={LoginDetailsScreen}
                        options={{ headerShown: false }}
                    /> */}
                    {/* <Stack.Screen
                        name="signupDeatils"
                        component={SignupDetailsScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="accountCreated"
                        component={AccountCreatedScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="chooseYourInterest"
                        component={ChooseYourInterestScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="enableLocation"
                        component={EnableLocationScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="intro1"
                        component={Intro1Screen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="intro2"
                        component={Intro2Screen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="intro3"
                        component={Intro3Screen}
                        options={{ headerShown: false }}
                    /> */}
                </Stack.Navigator>
            </NavigationContainer>

            {/* <View style={styles.containerMain}>
        <Text style={styles.headerText}>
          {authPage == 0 ? "Sign In" : "Sign Up"}
        </Text>
        {menuMessage && <Text style={styles.menuMessage}>{menuMessage}</Text>}
        <TouchableOpacity
          style={styles.providerButton}
          onPress={() => setDetailsPage(true)}
        >
          <Feather name="user" size={24} color="black" />
          <Text style={styles.providerButtonText}>Use Email</Text>
          <View />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.containerBottomButton}
        onPress={() => (authPage == 0 ? setAuthPage(1) : setAuthPage(0))}
      >
        {authPage == 0 ? (
          <Text>
            Don't have an account?{" "}
            <Text style={styles.bottomButtonText}>Sign Up</Text>
          </Text>
        ) : (
          <Text>
            Already have an account?{" "}
            <Text style={styles.bottomButtonText}>Sign In</Text>
          </Text>
        )}
      </TouchableOpacity> */}
        </View>
    );
}

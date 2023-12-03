import React, { useEffect, useState } from "react";
import { TextInput, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchUserItem from "../../components/search/userItem";
import { queryUsersByEmail } from "../../services/user";
import styles from "./styles";
import { SearchUser } from "../../../types";
//back button
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/main";
//back button icon
import { Ionicons } from "@expo/vector-icons";

export default function SearchScreen() {
    const [textInput, setTextInput] = useState("");
    const [searchUsers, setSearchUsers] = useState<SearchUser[]>([]);

    useEffect(() => {
        queryUsersByEmail(textInput).then((users) => setSearchUsers(users));
    }, [textInput]);

    // back button
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Ionicons
                    name="arrow-back"
                    size={30}
                    color="white"
                    onPress={() => navigation.goBack()}
                />
                <TextInput
                    onChangeText={setTextInput}
                    style={styles.textInput}
                    placeholder={"Search"}
                />
            </View>
            <FlatList
                data={searchUsers}
                renderItem={({ item }) => <SearchUserItem item={item} />}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    );
}

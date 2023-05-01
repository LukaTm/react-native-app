import { useState } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native";
import { TextInput } from "react-native";
import { View } from "react-native";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function AddUser() {
    const [input, setInput] = useState();

    const sendReq = async () => {
        const token = await AsyncStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        try {
            const response = await axios.get(
                "http://192.168.0.67:8080/api/post/addUserToViewer",
                { headers }
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Name"
                style={[styles.numberInput, { paddingTop: 20, margin: 10 }]}
                onChangeText={setInput}
                value={input}
            />
            <Button title="send" onPress={sendReq}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 16,
        borderBottomWidth: 1,
        color: "red",
        marginVertical: 8,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default AddUser;

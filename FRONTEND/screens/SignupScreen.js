import axios from "axios";
import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";

//  automatically passed to the child components of the navigator
const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSignup = async () => {
        try {
            const response = await axios.post(
                "http://192.168.0.67:8080/api/signup",
                {
                    email,
                    password,
                    name,
                }
            );
            // NAVIGATE TO LOGIN
            navigation.navigate("Login");
        } catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCompleteType="password"
                textContentType="password"
            />
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                textContentType="name"
            />
            <Button title="Sign up" onPress={handleSignup} />
        </View>
    );
};

export default SignupScreen;

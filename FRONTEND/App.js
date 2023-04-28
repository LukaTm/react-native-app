import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import LoginScreen from "./screens/LoginScreen";
import MainAppScreen from "./screens/MainAppScreen";
import SignupScreen from "./screens/SignupScreen";

const Stack = createStackNavigator();

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is already logged in
        const checkLoggedInStatus = async () => {
            try {
                const value = await AsyncStorage.getItem("isLoggedIn");
                if (value === "true") {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false);
        };

        checkLoggedInStatus();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("isLoggedIn");
        } catch (error) {
            console.error(error);
        }
        setIsLoggedIn(false);
    };

    if (isLoading) {
        return null;
    }

    return (
        <NavigationContainer>
            {isLoggedIn ? (
                <MainAppScreen onLogout={handleLogout} />
            ) : (
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Signup" component={SignupScreen} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}

export default App;

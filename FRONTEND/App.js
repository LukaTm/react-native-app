import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";

import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import { Button, View } from "react-native";
import AddUser from "./screens/AddUser";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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

    function CustomDrawerContent(props) {
        return (
            <View style={{ flex: 1 }}>
                {/* Scrollable area  */}
                <DrawerContentScrollView {...props}>
                    {/* used to render the list of navigation items in the drawer */}
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
                <View style={{ margin: 16 }}>
                    <Button title="Log out" onPress={handleLogout} />
                </View>
            </View>
        );
    }

    const handleLoginSuccess = async () => {
        try {
            await AsyncStorage.setItem("isLoggedIn", "true");
            setIsLoggedIn(true);
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) {
        return null;
    }

    return (
        <NavigationContainer>
            {isLoggedIn ? (
                <Drawer.Navigator
                    drawerContent={(props) => (
                        <CustomDrawerContent {...props} />
                    )}
                >
                    <Drawer.Screen name="haah" component={HomeScreen} />
                    <Drawer.Screen name="Add user" component={AddUser} />
                </Drawer.Navigator>
            ) : (
                <Stack.Navigator>
                    <Stack.Screen name="Login">
                        {(props) => (
                            <LoginScreen
                                // All props like - navigation
                                {...props}
                                handleLoginSuccess={handleLoginSuccess}
                            />
                        )}
                    </Stack.Screen>
                    <Stack.Screen name="Signup" component={SignupScreen} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}

export default App;

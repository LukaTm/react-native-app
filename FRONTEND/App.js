import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import SignupScreen from "./screens/SignupScreen";
import LoginScreen from "./screens/LoginScreen";

const AppNavigator = createStackNavigator({
    Signup: { screen: SignupScreen },
    Login: { screen: LoginScreen },
});

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
    return <AppContainer />;
}

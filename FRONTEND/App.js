import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/LoginScreen";
import MainAppScreen from "./screens/MainAppScreen";
import SignupScreen from "./screens/SignupScreen";

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="Main App" component={MainAppScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;

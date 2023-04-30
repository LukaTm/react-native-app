import "react-native-gesture-handler";
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Button } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import TodoModal from "../modals/TodoModal";
import HomeScreen from "./HomeScreen";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { DrawerItemList } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

function MainAppScreen({ onLogout }) {
    function CustomDrawerContent(props) {
        return (
            <View style={{ flex: 1 }}>
                {/* Scrollable area  */}
                <DrawerContentScrollView {...props}>
                    {/* used to render the list of navigation items in the drawer */}
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
                <View style={{ margin: 16 }}>
                    <Button title="Log out" onPress={onLogout} />
                </View>
            </View>
        );
    }

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Home" component={HomeScreen} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    pressed: {
        color: "#ff0000",
    },
    pressable: {
        opacity: 0.75,
    },
});

export default MainAppScreen;

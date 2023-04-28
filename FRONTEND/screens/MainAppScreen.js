import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import TodoModal from "../modals/TodoModal";

function MainAppScreen() {
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <>
            <TodoModal
                modalVisible={modalVisible}
                toggleModal={toggleModal}
            ></TodoModal>
            <View
                style={{
                    flex: 9,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text>Main App Screen</Text>
            </View>
            <View style={{ alignSelf: "flex-end", flex: 1 }}>
                <Pressable
                    style={({ pressed }) =>
                        pressed
                            ? [styles.pressed, styles.pressable]
                            : styles.pressed
                    }
                    onPress={toggleModal}
                >
                    <Ionicons name="add-circle" size={64} color="black" />
                </Pressable>
            </View>
        </>
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

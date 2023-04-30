import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import TodoModal from "../modals/TodoModal";

export default function HomeScreen() {
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <View style={{ flex: 1 }}>
            <TodoModal modalVisible={modalVisible} toggleModal={toggleModal} />
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
                <Pressable onPress={toggleModal}>
                    <Ionicons name="add-circle" size={64} color="black" />
                </Pressable>
            </View>
        </View>
    );
}

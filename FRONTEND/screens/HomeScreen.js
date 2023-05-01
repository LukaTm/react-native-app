import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import TodoModal from "../modals/TodoModal";

export default function HomeScreen() {
    const [modalVisible, setModalVisible] = useState(false);

    const [fakeData, setFakeData] = useState(["maluka", "kapuka", "1", "haha"]);

    const setData = (newData) => {
        setFakeData((prevData) => [...prevData, newData]);
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const renderItems = ({ item }) => {
        return <Text>{item}</Text>;
    };

    return (
        <View style={{ flex: 1 }}>
            <TodoModal
                modalVisible={modalVisible}
                toggleModal={toggleModal}
                setData={setData}
            />
            <View
                style={{
                    flex: 9,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <View>
                    <FlatList
                        data={fakeData}
                        renderItem={renderItems}
                    ></FlatList>
                </View>
            </View>
            <View style={{ alignSelf: "flex-end", flex: 1 }}>
                <Pressable onPress={toggleModal}>
                    <Ionicons name="add-circle" size={64} color="black" />
                </Pressable>
            </View>
        </View>
    );
}

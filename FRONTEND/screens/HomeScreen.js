import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import TodoModal from "../modals/TodoModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

export default function HomeScreen() {
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const [posts, setPosts] = useState([]);

    const [refreshData, setRefreshData] = useState(false);

    const refreshNewData = () => {
        setRefreshData(!refreshData);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const token = await AsyncStorage.getItem("token");

            const headers = {
                Authorization: `Bearer ${token}`,
            };
            try {
                const response = await axios.get(
                    "http://192.168.0.67:8080/api/post/gettododata",
                    { headers }
                );

                const posts = response.data.posts.map((post) => post.content);
                setPosts(posts);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPosts();
    }, [refreshData]);

    const renderItems = ({ item }) => {
        return <Text>{item}</Text>;
    };

    return (
        <View style={{ flex: 1 }}>
            <TodoModal
                modalVisible={modalVisible}
                toggleModal={toggleModal}
                refreshNewData={refreshNewData}
            />
            <View
                style={{
                    flex: 9,
                    margin: 10,
                }}
            >
                <View>
                    <FlatList data={posts} renderItem={renderItems}></FlatList>
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

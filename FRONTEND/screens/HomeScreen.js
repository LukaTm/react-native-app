import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import TodoModal from "../modals/TodoModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

export default function HomeScreen() {
    const [modalVisible, setModalVisible] = useState(false);

    const [fakeData, setFakeData] = useState(["maluka", "kapuka", "1", "haha"]);

    const setData = (newData) => {
        setFakeData((prevData) => [...prevData, newData]);
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const [posts, setPosts] = useState([]);

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
                setPosts([]);
                const posts = response.data.posts.map((post) =>
                    setPosts((prevData) => [...prevData, post.content])
                );
            } catch (error) {
                console.log(error);
            }
        };
        fetchPosts();
    }, []);

    const renderItems = ({ item }) => {
        return <Text>{item}</Text>;
    };

    // return (
    //     <View>
    //         {posts.map((post) => (
    //             <Text key={post._id}>{post.content}</Text>
    //         ))}
    //     </View>
    // );

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

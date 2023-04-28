import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Pressable,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

function MainAppScreen() {
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={toggleModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>
                                This is the modal content!
                            </Text>
                        </View>
                        <TouchableOpacity onPress={toggleModal}>
                            <View
                                style={{
                                    backgroundColor: "#3f3636",
                                    padding: 5,
                                    borderRadius: 5,
                                    marginBottom: 10,
                                }}
                            >
                                <Text style={{ color: "white" }}>
                                    Close Modal
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: "#dad5d5",
        borderRadius: 10,
        height: 200,
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    modalText: {
        textAlign: "center",
        marginBottom: 20,
    },
    pressed: {
        color: "#ff0000",
    },
    pressable: {
        opacity: 0.75,
    },
});

export default MainAppScreen;

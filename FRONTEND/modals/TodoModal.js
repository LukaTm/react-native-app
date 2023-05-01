import { useState } from "react";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Pressable,
    TextInput,
    Button,
} from "react-native";

function TodoModal({ modalVisible, toggleModal, setData }) {
    const [enteredName, setEnteredName] = useState("");

    function modalConfirm() {
        toggleModal();
        setData(enteredName);
        setEnteredName("");
    }

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
                        <View style={{ alignItems: "center" }}>
                            <View>
                                <TextInput
                                    placeholder="Name"
                                    style={[
                                        styles.numberInput,
                                        { paddingTop: 15 },
                                    ]}
                                    onChangeText={setEnteredName}
                                    value={enteredName}
                                />
                            </View>
                            <Pressable onPress={modalConfirm}>
                                <View
                                    style={{
                                        backgroundColor: "#c7c39f",
                                        paddingHorizontal: 8,
                                        paddingVertical: 5,
                                        borderRadius: 5,
                                    }}
                                >
                                    <Text>Confirm</Text>
                                </View>
                            </Pressable>
                        </View>
                        <Pressable onPress={toggleModal}>
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
                        </Pressable>
                    </View>
                </View>
            </Modal>
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
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 18,
        borderBottomWidth: 2,
        color: "red",
        marginVertical: 8,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default TodoModal;

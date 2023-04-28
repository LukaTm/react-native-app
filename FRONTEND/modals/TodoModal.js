import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

function TodoModal({ modalVisible, toggleModal }) {
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
});

export default TodoModal;

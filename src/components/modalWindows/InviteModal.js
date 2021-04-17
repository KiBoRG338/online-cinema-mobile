import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { inviteToRoom } from "../../store/actions/roomActions";
import { THEME } from "../../theme";

const InviteModal = ({ inviteModal, setInviteModal }) => {
  const dispatch = useDispatch();
    const [text, setText] = useState('')

    const inviteRoom = () => {
      dispatch(inviteToRoom(text));
      setText('');
      setInviteModal(false);
  }

  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={inviteModal}
    onRequestClose={() => {
        setInviteModal(!inviteModal);
    }}
    >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Enter invite code</Text>
                <TextInput 
                    style={styles.textarea} 
                    placeholder="Enter a code..." 
                    value={text} 
                    onChangeText={setText}
                />
                <View style={styles.buttons}>
            <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => setInviteModal(!inviteModal)}
      >
        <Text style={styles.textStyle}>Close</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonOk]}
        onPress={() => {}}
      >
        <Text style={styles.textStyle} onPress={inviteRoom}>Ok</Text>
      </Pressable>
      </View>
    </View>
  </View>
</Modal>
  );
};

const styles = StyleSheet.create({
    center: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 5,
        padding: 5,
        elevation: 2,
        margin: 10,
        marginTop: 20,
        width: 75
      },
      buttons: {
          flexDirection: 'row', 
      },
      buttonClose: {
        backgroundColor: THEME.DANGER_COLOR,
      },
      buttonOk: {
        backgroundColor: THEME.MAIN_COLOR,
      },
      textStyle: {
        color: "white",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})

export default InviteModal;
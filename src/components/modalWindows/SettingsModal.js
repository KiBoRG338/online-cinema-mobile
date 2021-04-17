import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View, TextInput, Button } from "react-native";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

import { THEME } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { renameRoom } from "../../store/actions/roomActions";
import { ENDPOINT } from "../../config/config";

const SettingsModal = ({ settingsModal, toggleSettings, roomId, roomName, confirmDeleteRoom, confirmLeaveRoom }) => {
    const dispatch = useDispatch();

    const room = useSelector(
      state => state.roomStore.rooms.find(r => r._id === roomId)
    );

    const userId = useSelector(
      state => state.userStore.user.userId
    );

    const ownerBool = room.owner === userId;

    const [name, setName] = useState(roomName);
    const [invite, setInvite] = useState('Click the button for get code.')

    getInvite = async () => {
      await axios({
        method: 'patch',
        url: ENDPOINT + `/api/v1/invites/${roomId}`,
        headers: {
          Authorization: (await SecureStore.getItemAsync("secure_token"))
        }
      })
        .then(response => {
          setInvite(`Reusable code: ${response.data}`)
        })
    }

    const editRoom = (room, newName) => {
      dispatch(renameRoom(room, newName));  
    }

  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={settingsModal}
    onRequestClose={() => {
        toggleSettings();
    }}
    >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Settings</Text>
              {
              ownerBool ? 
              (<View>
                <Text style={styles.inputNames}>Room name:</Text>
                <TextInput 
                  style={styles.textarea} 
                  placeholder="Enter a room name..." 
                  value={name} 
                  onChangeText={setName}
                />
                <Pressable
                  style={[styles.button, styles.leaveOrDelete]}
                  onPress={confirmDeleteRoom}
                >
                  <Text style={{textAlign: 'center'}}>Delete room</Text>              
                </Pressable>
                  <Button title="Generate invite" onPress={getInvite}/>  
                  <Text>{invite}</Text>
              </View>)
                  :
                  (<Pressable
                    style={[styles.button, styles.leaveOrDelete]}
                    onPress={confirmDeleteRoom}
                  >
                    <Text style={{textAlign: 'center'}}>Leave</Text>              
                  </Pressable>)
                  }
              <View style={styles.buttons}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={toggleSettings}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
                 <Pressable
                  style={[styles.button, styles.buttonOk]}
                  onPress={() => editRoom(roomId, name)}
                >
                  <Text style={styles.textStyle}>Ok</Text>
                </Pressable>
              </View>
          </View>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputNames: {
    marginRight: 50
  },
  textarea: {
    margin: 5
  },
  leaveOrDelete: {
    width: 130,
    marginBottom: 20,
    backgroundColor: THEME.GREY_COLOR
  },
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
    marginTop: 20
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
    textAlign: "center",
    fontWeight: 'bold'
  }
})

export default SettingsModal;
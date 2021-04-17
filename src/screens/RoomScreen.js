import React, { useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TextInput, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Video } from 'expo-av';
import io from "socket.io-client";

import { editUrl, playingVideo, playedTime, loadMessages, addMessage, leaveRoom, deleteRoom } from '../store/actions/roomActions.js';
import AppHeaderIcon from '../components/AppHeaderIcon';
import { THEME } from '../theme';
import { ENDPOINT } from '../config/config.js';
import SettingsModal from '../components/modalWindows/SettingsModal.js';
import Chat from '../components/chatRoom/index.jsx';

export default RoomScreen = ({ navigation }) => {
    const socket = io(ENDPOINT);
    const dispatch = useDispatch();
    const roomId = navigation.getParam('roomId');

    const video = useRef(null);
    const [settingsModal, setSettingsModal] = React.useState(false);
    const [url, setUrl] = React.useState('');
    const [status, setStatus] = React.useState(false);
    // const [messages, setMessages] = React.useState([])

    const room = useSelector(
        state => state.roomStore.rooms.find(r => r._id === roomId)
    ) || {};

    useEffect(() => {
        dispatch(loadMessages(roomId));
    }, [])

    const messages = useSelector(
        state => state.roomStore.messages
    );
    
    socket.on('updateRoomUrl', (newUrl) => {
        dispatch(editUrl({url: newUrl, roomId}));
        setUrl(newUrl)
    })

    socket.on('updatePlayerStatus', (status) => {
        dispatch(playingVideo({status, roomId}));
        // setStatus(status)
        if(video !== null){
            video.current.setStatusAsync({shouldPlay: status})
        }
        console.log("updatePlayerStatus", status);
    })

    socket.on('updatePlayedTime', (time) => {
        dispatch(playedTime({time, roomId}));
        if(video !== null){
            video.current.setPositionAsync(time * 1000)
        }
    })

    socket.on('msgToClient', () => {
        dispatch(loadMessages(roomId))
    })

    useEffect(() => {
        if(url === ''){
            setUrl(room.url)
        }

        if(room) {
            // setStatus(room.playerStatus)
            // setTime(room.playedTime);

            console.log('joining room');
            socket.emit('onEnterRoom', roomId);
        }

    })

    sendMessage = (text) => {
        dispatch(addMessage(text, roomId));
        // const message = {
        //     _id: response.data._id,
        //     username: response.data.username,
        //     text: response.data.text,
        //     roomId: response.data.roomId
        //   }
        //   this.receivedMessage(message);
        // socket.emit('msgToServer', message);
        // setUrl(room.url)
    }

    handleUpdateUrl = (newUrl) => {
        dispatch(editUrl({url: newUrl, roomId}));
        setUrl(room.url)
        socket.emit('onEditUrl', { roomId, newUrl });
    }

    onPlaying = (status) => {
        socket.emit('onPause', { roomId, status: status.shouldPlay });
        if (room.playedTime !== 0 && !status) {
            socket.emit('onPlayedTime', { roomId, playedTime: status.positionMillis });
        }
    }

    const toggleSettings = useCallback(() => {
        setSettingsModal(!settingsModal)
    }, [dispatch, settingsModal])

    useEffect(() => {
        navigation.setParams({ roomName: room.name })
        navigation.setParams({ toggleSettings })
    }, [room.name, toggleSettings])

    const confirmLeaveRoom = () => {
        Alert.alert(
            "Leaving room",
            "Are you really want to leave from room?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { 
                    text: "Leave", 
                    style: 'destructive', 
                    onPress() {
                        navigation.navigate('Main');
                        dispatch(leaveRoom(roomId, userId, navigation));
                    }
                }
            ],
            { cancelable: false }
        )
    }

    const confirmDeleteRoom = () => {
        Alert.alert(
          "Removing room",
          "Are you really want to remove room?",
          [
              {
                  text: "Cancel",
                  style: "cancel"
              },
              { 
                  text: "Remove", 
                  style: 'destructive', 
                  onPress() {
                    navigation.navigate('Main');
                    dispatch(deleteRoom(roomId, navigation));
                  }
              }
          ],
          { cancelable: false }
      )
      }

    if(!room){
        return null
    }

    return (
        <ScrollView>
            <TextInput 
                style={styles.input} 
                placeholder="Enter a url..."
                onChangeText={(text) => handleUpdateUrl(text)} 
                value={url}
            />
            <View style={styles.textWrap}>
                <Video
                ref={video}
                style={styles.video}
                source={{
                    uri: `${url}`
                }}
                shouldPlay={status}
                useNativeControls={true}
                resizeMode="stretch"
                // onPlaybackStatusUpdate={(status) => onPlaying(status)}
                volume={1.0}
            />
            </View>
            {/* <Button title="Поток" color={THEME.DANGER_COLOR} onPress={() => handleUpdateUrl("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4")}/> */}
            
            <Chat messages={messages} sendMessage={sendMessage}/>


            <SettingsModal 
                settingsModal={settingsModal} 
                toggleSettings={toggleSettings} 
                roomId={roomId} 
                roomName={room.name} 
                confirmDeleteRoom={confirmDeleteRoom} 
                confirmLeaveRoom={confirmLeaveRoom}
            />
        </ScrollView>
    )
}

RoomScreen.navigationOptions = ({ navigation }) => {
    const roomName = navigation.getParam('roomName');
    const toggleSettings = navigation.getParam('toggleSettings');

    return {
        headerTitle: () => <Text style={styles.header}>{roomName}</Text>,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item 
                    title="Settings" 
                    iconName="settings" 
                    onPress={toggleSettings}
                />
            </HeaderButtons>
        ),
    }
}

const styles = StyleSheet.create({
    input: {
        width: '90%',
        margin: 15,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 1
    },
    textWrap: {
        padding: 10
    },
    title: {
        fontFamily: 'open-regular'
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    video: {
        alignSelf: 'center',
        width: '100%',
        height: 200,
    },
    header: {
        color: 'white',
        fontSize: 20
    }
})
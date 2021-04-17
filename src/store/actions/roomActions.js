import axios from "axios";
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import io from 'socket.io-client';

import { ENDPOINT } from "../../config/config";

export const EDIT_URL = "EDIT_URL";
export const PLAYER_STATUS = "PLAYER_STATUS";
export const PLAYED_TIME = "PLAYED_TIME";
export const ROOMS_LOAD = "ROOMS_LOAD";
export const ROOM_LOAD = "ROOM_LOAD";
export const ROOM_RENAME = "ROOM_RENAME";
export const ROOM_LEAVE = "ROOM_LEAVE";
export const ROOM_DELETE = "ROOM_DELETE";
export const MESSAGES_LOAD = "MESSAGES_LOAD";

const socket = io(ENDPOINT);

export const loadRooms = () => {
    return async dispatch => {
        let rooms; 
        await axios({
            method: 'GET',
            url: ENDPOINT + '/api/v1/rooms',
            headers: {
              Authorization: (await SecureStore.getItemAsync("secure_token"))
            }
          })
            .then(response => {
                rooms = response.data;
            })

        dispatch({
            type: ROOMS_LOAD,
            payload: rooms
        })
    }
}

export const loadRoom = (roomId) => {
    return async dispatch => {
        let room; 
        await axios({
            method: 'GET',
            url: ENDPOINT + '/api/v1/rooms/' + roomId,
            headers: {
              Authorization: (await SecureStore.getItemAsync("secure_token"))
            }
          })
            .then(response => {
                room = response.data;
            })

        dispatch({
            type: ROOM_LOAD,
            payload: room
        })
    }
}

export const loadMessages = (roomId) => {
    return async dispatch => {
        console.log('roomId load messages', roomId)
        let messages = []; 
        await axios({
            method: 'GET',
            url: ENDPOINT + `/api/v1/messages/room/${roomId}`,
            headers: {
              Authorization: (await SecureStore.getItemAsync("secure_token"))
            }
          })
            .then(response => {
                messages = response.data;
            })

        dispatch({
            type: MESSAGES_LOAD,
            payload: messages
        })
    }
}


export const addRoom = (name) => {
    return async dispatch => {
    console.log('addRoom')
    axios({
        method: 'POST',
        url: ENDPOINT + `/api/v1/rooms`,
        headers: {
          'Authorization': (await SecureStore.getItemAsync("secure_token"))
        },
        data: {
          name
        }
      })
        .then(response => {
            dispatch(loadRooms());
        })
        .catch(error => Alert.alert(
            "Error",
            "Room with this name is already exists",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        ))

    }
}

export const addMessage = (text, roomId) => {
    return async dispatch => {
    axios({
        method: 'POST',
        url: ENDPOINT + `/api/v1/messages/room/${roomId}`,
        headers: {
          'Authorization': (await SecureStore.getItemAsync("secure_token"))
        },
        data: {
          text
        }
      })
        .then(response => {
        dispatch(loadMessages(roomId))
        const message = {
            _id: response.data._id,
            username: response.data.username,
            text: response.data.text,
            roomId: response.data.roomId
          }
          socket.emit('msgToServer', message);
        //   socket.emit('msgToServer');
        })
        .catch(error => Alert.alert(
            "Error",
            "The message was not sent.",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        ))

    }
}

export const inviteToRoom = (code) => {
    return async dispatch => {
        axios({
            method: 'patch',
            url: ENDPOINT + `/api/v1/rooms/join`,
            headers: {
              'Authorization': (await SecureStore.getItemAsync("secure_token"))
            },
            data: {
              invite: code
            }
          })
            .then(response => {
            //   this.props.roomAdd({ id: response.data._id, name: response.data.name })
              Alert.alert(
                "Success",
                `You have successfully entered to the room "${response.data.name}"`,
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            )
            //   this.updateInviteState();
            })
            .catch(error => Alert.alert(
                "Error",
                "Room with this invite code is not exists",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            ));

            dispatch(loadRooms());
    }
}

export const renameRoom = (roomId, roomName) => {
  return async dispatch => {
      let name; 
      axios({
        method: 'patch',
        url: ENDPOINT + `/api/v1/rooms/${roomId}/edit`,
        headers: {
          Authorization: (await SecureStore.getItemAsync("secure_token"))
        },
        data: {
          name: roomName
        }
      })
          .then(response => {
              room = response.data;
          })

      dispatch({
          type: ROOM_RENAME,
          payload: {roomId, name}
      })
  }
}

export const leaveRoom = (roomId, userId) => {
  return async dispatch => {
      await axios({
        method: 'patch',
        url: ENDPOINT + `/api/v1/rooms/${roomId}/leave`,
        headers: {
          Authorization: (await SecureStore.getItemAsync("secure_token"))
        }
      })
        .then(response => {

        })

        dispatch({
          type: ROOM_LEAVE,
          payload: {roomId, userId}
        })

      dispatch(loadRooms());
  }
}

export const deleteRoom = (roomId) => {
  return async dispatch => {
    await axios({
      method: 'delete',
      url: ENDPOINT + `/api/v1/rooms/${roomId}/delete`,
      headers: {
        Authorization: (await SecureStore.getItemAsync("secure_token"))
      }
    })
      .then(response => {

      })

      dispatch({
        type: ROOM_DELETE,
        payload: roomId
      })

      dispatch(loadRooms());
  }
}


export const editUrl = (data) => {
    return async dispatch => {
        
        dispatch({ 
            type: EDIT_URL,
            payload: data
        })
    }
}

export const playingVideo = (data) => {
    return async dispatch => {
        dispatch({ 
            type: PLAYER_STATUS,
            payload: data
        })
    }
}

export const playedTime = (data) => {
    return async dispatch => {
        dispatch({ 
            type: PLAYED_TIME,
            payload: data
        })
    }
}
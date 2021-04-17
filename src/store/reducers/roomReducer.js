import { initialStateRoom } from "../initialState";
import { EDIT_URL, PLAYER_STATUS, PLAYED_TIME, ROOM_ADD, ROOMS_LOAD, MESSAGES_LOAD, ROOM_RENAME, ROOM_LEAVE, ROOM_DELETE } from "../actions/roomActions";

function roomReducer(state = initialStateRoom, action) {
    let data;
    switch (action.type) {
        case ROOMS_LOAD:
            return {
                ...state, 
                rooms: action.payload
            }
        case MESSAGES_LOAD:
            console.log('reducermessagesload')
            return Object.assign({}, state, {
                ...state, 
                messages: action.payload
            })
        case ROOM_LEAVE:
            data = action.payload;
            console.log('reducerleave')
            const roomsAfterLeave = state.rooms.filter( (room) => room._id !== data.roomId);
            return Object.assign({}, state, {
                ...state,
                rooms: roomsAfterLeave
            })
        case ROOM_DELETE:
            data = action.payload;
            console.log('reducerDelete')
            const roomsAfterDelete = state.rooms.filter( (room) => room._id !== data);
            return Object.assign({}, state, {
                ...state,
                rooms: roomsAfterDelete
            })
        case ROOM_RENAME:
            data = action.payload;
            console.log('reducerEditName')
            const renamedRooms = state.rooms.map( (room) => {
                if(room._id === data.roomId) {
                    room.name = data.name;
                    return room;
                }
                return room;
            })
            return Object.assign({}, state, {
                rooms: renamedRooms
            })
        case EDIT_URL:
            data = action.payload;
            console.log('reducerEditUrl')
            const newRooms = state.rooms.map( (room) => {
                if(room._id === data.roomId) {
                    room.url = data.url;
                    return room;
                }
                return room;
            })
            return Object.assign({}, state, {
                rooms: newRooms
            })
        case PLAYER_STATUS:
            data = action.payload;
            console.log('reducerPlayerStatus')
            const editedRoomsPS = state.rooms.map((room) => {
                if(room._id === data.roomId) {
                    room.playerStatus = data.playerStatus;
                    return room;
                }
                return room;
            })
            return Object.assign({}, state, {
                rooms: editedRoomsPS
            })
        case PLAYED_TIME:
            data = action.payload;
            console.log('reducerPlayedTime')
            const editedRoomsPT = state.rooms.map((room) => {
                if(room._id === data.roomId) {
                    room.playedTime = data.playedTime;
                    return room;
                }
                return room;
            })
            return Object.assign({}, state, {
                rooms: editedRoomsPT
            })
        // case ROOM_ADD:
        //     return Object.assign({}, state, {
        //         rooms: [
        //             ...state.rooms, 
        //             action.payload
        //         ]
        //     })
      default:
        return state
    }
  }

  export default roomReducer;

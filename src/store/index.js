import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import roomStore from './reducers/roomReducer';
import userStore from './reducers/userReducer';

const rootReducer = combineReducers({
    roomStore,
    userStore
})

export default createStore(rootReducer, applyMiddleware(thunk))
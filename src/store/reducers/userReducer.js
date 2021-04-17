import { initialStateAuth } from "../initialState";
import { LOGOUT_USER, LOGIN_USER } from "../actions/userActions";

function userReducer(state = initialStateAuth, action) {
    switch (action.type) {
      case LOGIN_USER:
        console.log("LOGIN_USER")
        return Object.assign({}, state, {
          loggedIn: true,
          user: action.payload
        })
      case LOGOUT_USER:
        console.log("LOGOUT_USER")
        return Object.assign({}, state, {
          loggedIn: false,
          user: {}
        })
      default:
        return state
    }
  }

  export default userReducer;
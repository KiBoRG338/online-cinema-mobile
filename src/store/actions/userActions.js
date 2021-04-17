import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { ENDPOINT } from "../../config/config";

export const LOGIN_USER = "LOGIN_USER";
export const SET_USER = "SET_USER";
export const LOGOUT_USER = "LOGOUT_USER";
  
export const userPostFetch = user => {
    return dispatch => {
      return fetch(ENDPOINT + "/api/v1/users", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(user)
      })
        .then(resp => resp.json())
        .then(response => {
            if (response.message) {
              Alert.alert(
                "Error",
                "User with that email or username is exists",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
            } else {
              Alert.alert(
                "Error",
                "You have successfully registered!",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
            }
        })
    }
  }

  export const userLoginFetch = (user, navigation) => {
    console.log("user", user)
    return dispatch => {
      return fetch(ENDPOINT + "/api/v1/users/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(resp => resp.json())
        .then(response => {
          if (response.message) {
            Alert.alert(
                "Error",
                "Login or password is incorrect",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
          } else {
            console.log("token", response.data.token)
            SecureStore.setItemAsync("secure_token", response.data.token);
            dispatch(loginUser(response.data.user));
            navigation.navigate('Main')
          } 
        })
    }
  }

  // export const getProfileFetch = (navigation) => {
  //   return dispatch => {
  //     const token = SecureStore.getItemAsync("secure_token");
  //     if (token) {
  //       return fetch(ENDPOINT + "/api/v1/users/me", {
  //         method: "GET",
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Accept: 'application/json',
  //           'Authorization': token 
  //         }
  //       })
  //           .then(resp => resp.json())
  //           .then(response => {
  //           if (response.message) {
  //               SecureStore.deleteItemAsync("secure_token");
  //               Alert.alert(
  //                 "Error",
  //                 "You are not authorized",
  //                 [
  //                   { text: "OK", onPress: () => console.log("OK Pressed") }
  //                 ]
  //               );
  //             navigation.navigate('Auth')
  //           } else {
  //               dispatch(loginUser({id: response.data._id, username: response.data.username, type: response.data.type}))
  //           }
  //         })
  //     }
  //   }
  // }
  
  export const loginUser = user => ({
      type: LOGIN_USER,
      payload: user
  })

  export const logoutUser = () => ({
    type: LOGOUT_USER
  })
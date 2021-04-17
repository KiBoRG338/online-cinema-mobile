import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

import { THEME } from '../theme';
import { userLoginFetch, userPostFetch } from '../store/actions/userActions';

export default AuthScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userStore);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [login, setLogin] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    

    const signIn = () => {
        dispatch(userLoginFetch({username: login, password: loginPassword}, navigation));
        setLoginPassword('');
    }

    const signUp = () => {
        dispatch(userPostFetch({email, username, password: regPassword}, navigation))
        setEmail('');
        setUsername('');
        setRegPassword('');
    }
    console.log(user)

    if(user.loggedIn){
        navigation.navigate('Main');
    }

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.wrapper}>
                <Text style={styles.title}>Sign in</Text>
                    <TextInput 
                        style={styles.textarea} 
                        placeholder="Enter a login..." 
                        value={login} 
                        onChangeText={setLogin}
                    />
                    <TextInput 
                        style={styles.textarea} 
                        placeholder="Enter a password..." 
                        value={loginPassword} 
                        onChangeText={setLoginPassword}
                    />
                    <Button 
                        title="Login" 
                        color={THEME.MAIN_COLOR} 
                        onPress={signIn}
                        disabled={!login && !loginPassword}
                    />
                    <View
                        style={{
                            borderBottomColor: THEME.MAIN_COLOR,
                            borderBottomWidth: 3,
                            marginTop: 20
                        }}
                    />
                    <Text style={styles.title}>Sign up</Text>
                    <TextInput 
                        style={styles.textarea} 
                        placeholder="Enter an email..." 
                        value={email} 
                        onChangeText={setEmail}
                    />
                    <TextInput 
                        style={styles.textarea} 
                        placeholder="Enter an username..." 
                        value={username} 
                        onChangeText={setUsername}
                    />
                    <TextInput 
                        style={styles.textarea} 
                        placeholder="Enter a password..." 
                        value={regPassword} 
                        onChangeText={setRegPassword}
                    />
                    <Button 
                        title="Register" 
                        color={THEME.MAIN_COLOR} 
                        onPress={signUp}
                        disabled={!email && !username && !regPassword}
                    />
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

AuthScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Sign in / Sign up',
    tabBarVisible: false
})

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'open-bold',
        marginVertical: 10
    },
    textarea: {
        padding: 10, 
        marginBottom: 10
    }
})
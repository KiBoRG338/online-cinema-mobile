import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { THEME } from '../../../theme';
import moment from 'moment';
import { useSelector } from 'react-redux';


export default Message = ({ message }) => {

    const username = useSelector(
        state => state.userStore.username
    )

    return (
        <View style={{marginVertical: 5}}>
            <Text style={ message.user === username ? styles.user : styles.recipient}>{message.username}</Text>
            <View style={styles.textWrap}>
                <Text style={styles.text}>{message.text}</Text>
            </View>
            <Text style={styles.date}>{moment(message.date).format('DD.MM.YYYY hh:mm')}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    textWrap: {
        backgroundColor: THEME.MAIN_COLOR,
        paddingVertical: 5,
        paddingLeft: 5,
        width: '100%',
        overflow: 'hidden',
        borderWidth: 1,
        borderRadius: 10
    },
    user: {
        color: 'blue',
        fontFamily: 'open-regular'
    },
    recipient: {
        color: 'red',
        fontFamily: 'open-regular'
    },
    text: {
        color: 'white',
        fontFamily: 'open-regular'
    },
    date: {
        color: 'darkgray',
        fontFamily: 'open-regular'
    }
})
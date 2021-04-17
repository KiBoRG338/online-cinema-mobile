import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { THEME } from '../theme';

export default Room = ({ room, onOpen }) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(room)}>
            <View style={styles.textWrap}>
                <Text style={styles.title}>{room.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    textWrap: {
        backgroundColor: THEME.MAIN_COLOR,
        paddingVertical: 10,
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
        overflow: 'hidden'
    },
    title: {
        color: 'white',
        fontFamily: 'open-regular'
    }
})
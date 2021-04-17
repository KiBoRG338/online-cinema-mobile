import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import AppHeaderIcon from '../components/AppHeaderIcon';
import { THEME } from '../theme';
import { addRoom } from '../store/actions/roomActions';

export default CreateScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const createRoom = () => {
        dispatch(addRoom(name));
        navigation.navigate('Main')
        setName('');
    }

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>New room</Text>
                    <TextInput 
                        style={styles.textarea} 
                        placeholder="Enter a room name..." 
                        value={name} 
                        onChangeText={setName}
                        multiline
                    />
                    <Button 
                        title="Create room" 
                        color={THEME.MAIN_COLOR} 
                        onPress={createRoom}
                        disabled={!name}
                    />
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

CreateScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Create room',
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item 
                title="Toggle drawer" 
                iconName='ios-menu' 
                onPress={() => navigation.toggleDrawer()}
            />
        </HeaderButtons>
    ),
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
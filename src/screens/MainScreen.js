import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux'

import AppHeaderIcon from '../components/AppHeaderIcon';
import InviteModal from '../components/modalWindows/InviteModal';
import RoomList from '../components/RoomList';
import { loadRooms } from '../store/actions/roomActions';
import { THEME } from '../theme';

export default MainScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userStore)
  
    if(!user.loggedIn){
      navigation.navigate('Auth')
    }

    const [inviteModal, setInviteModal] = useState(false);

    const openRoomHandler = (room) => {
        navigation.navigate('Room', { 
            roomId: room._id
        })
    }

    useEffect(() => {
        navigation.setParams({ setInviteModal })
        dispatch(loadRooms())
    }, [setInviteModal])

    const allRooms = useSelector(state => state.roomStore.rooms);
    const loading = useSelector(state => state.roomStore.loading);

    if(loading){
        return (
            <View style={styles.center}>
                <ActivityIndicator color={THEME.MAIN_COLOR}/>
            </View>
        )
    }


    return (
        <View>
            <RoomList data={allRooms} onOpen={openRoomHandler}/>
            <InviteModal inviteModal={inviteModal} setInviteModal={setInviteModal} />
        </View>
    )
}

MainScreen.navigationOptions = ({ navigation }) => {
    const setInviteModal = navigation.getParam('setInviteModal');
    return {
        headerTitle: 'My rooms',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item 
                    title="Enter code" 
                    iconName='add' 
                    onPress={() => setInviteModal(true)}
                />
            </HeaderButtons>
        ),
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item 
                    title="Toggle drawer" 
                    iconName='ios-menu' 
                    onPress={() => navigation.toggleDrawer()}
                />
            </HeaderButtons>
        ),
    }
}

const styles = StyleSheet.create({
    center: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    }
})
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Room from './Room';

export default RoomList = ({ data = [], onOpen }) => {

    if(!data.length){
        return (
            <View style={styles.wrapper}>
                <Text style={styles.noItems}>
                    Постов пока нет
                </Text>
            </View>
        )
    }

    return(
        <ScrollView style={styles.wrapper}>
            <FlatList  
                data={data}
                keyExtractor={item => item._id}
                renderItem={ ({item}) => <Room room={item} onOpen={onOpen}/>}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    noItems: {
        fontFamily: 'open-regular',
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 18
    }
})
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import AppHeaderIcon from '../components/AppHeaderIcon';

export default AboutScreen = () => {
    return (
        <View style={styles.center}>
            <Text>App to view content together.</Text>
            <Text>Version <Text style={styles.version}>1.0.0</Text></Text>
        </View>
    )
}

AboutScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'About app',
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
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    version: {
        fontFamily: 'open-bold'
    }
})
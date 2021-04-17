import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Platform } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import MainScreen from '../screens/MainScreen';
import RoomScreen from '../screens/RoomScreen';
import { THEME } from '../theme';
import CreateScreen from '../screens/CreateScreen';
import AboutScreen from '../screens/AboutScreen';
import AuthScreen from '../screens/AuthScreen';
import LogoutScreen from '../screens/LogoutScreen';

const navigatorOptions = {    
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
        },
        headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR
    }
}

const AppNavigator = createStackNavigator(
    {
        Auth: AuthScreen,
        Main: MainScreen,
        Room: RoomScreen
    },
    navigatorOptions 
)

// const RoomNavigator = createStackNavigator(
//     {
//         Main: MainScreen,
//         Room: RoomScreen
//     },
//     navigatorOptions 
// )

// const ChatNavigator = createStackNavigator(
//     {
//         Chat: ChatScreen,
//         Room: RoomScreen
//     },
//     navigatorOptions 
// )

// const bottomTabsConfig = {
//     Room: {
//         screen: RoomNavigator,
//         navigationOptions: {
//             tabBarLabel: 'Room',
//             tabBarIcon: info => <Ionicons name='ios-albums' size={25} color={info.tintColor} />
//         }
//     },
//     Chat: {
//         screen: ChatNavigator,
//         navigationOptions: {
//             tabBarLabel: 'Chat room',
//             tabBarIcon: info => <Ionicons name='ios-star' size={25} color={info.tintColor} />
//         }
//     }
// }

// const BottomNavigator = 
//     Platform.OS === 'android'
//     ? createMaterialBottomTabNavigator(bottomTabsConfig, {
//         activeTintColor: '#fff',
//         shifting: true,
//         barStyle: {
//             backgroundColor: THEME.MAIN_COLOR
//         }
//     }) 
//     : createBottomTabNavigator(bottomTabsConfig, {
//         tabBarOptions: {
//             activeTintColor: THEME.MAIN_COLOR
//         }
//     })

const AboutNavigator = createStackNavigator({
    About: AboutScreen
}, navigatorOptions)

const CreateNavigator = createStackNavigator({
    Create: CreateScreen
}, navigatorOptions)

const MainNavigator = createDrawerNavigator({
    RoomTabs: {
        screen: AppNavigator,
        navigationOptions: {
            drawerLabel: 'Rooms',
            drawerIcon: () => <Ionicons name='home' size={25} color={THEME.MAIN_COLOR} />
        }
    },
    Create: {
        screen: CreateNavigator,
        navigationOptions: {
            drawerLabel: 'Create room',
            drawerIcon: () => <Ionicons name='ios-create-outline' size={25} color={THEME.MAIN_COLOR} />
        }
    },
    About: {
        screen: AboutNavigator,
        navigationOptions: {
            drawerLabel: 'About',
            drawerIcon: () => <Ionicons name='information-circle-outline' size={25} color={THEME.MAIN_COLOR} />
        }
    },
    Logout: {
        screen: LogoutScreen,
        navigationOptions: {
            drawerLabel: 'Logout',
            drawerIcon: () => <AntDesign name='logout' size={25} color={THEME.MAIN_COLOR} />,
        },
    }
}, {
    contentOptions: {
        activeTintColor: THEME.MAIN_COLOR,
        labelStyle: {
            fontFamily: 'open-bold'
        }
    }
})

export default AppNavigation = createAppContainer(MainNavigator)
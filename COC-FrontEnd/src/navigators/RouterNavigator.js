'use strict';
import React from 'react';
//Screens
import ProfileScreen from '@screens/Profile';
import {Image, Animated} from 'react-native'
import ScheduleScreen from '@screens/Schedule';
import MaintenanceScreen from '@screens/Maintenance';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';


const style = {
    headerStyle: {
        backgroundColor: '#103c68',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginRight: 50,
    },
};
const Tab = createMaterialBottomTabNavigator();
const AuthStack = createStackNavigator();


const MaintenanceStackScreen = () => (
    <AuthStack.Navigator screenOptions={style}>
        <AuthStack.Screen name={'Mantenimiento'} component={MaintenanceScreen} options={{
            title: 'Mantenimiento',
            headerShown: false,
            headerTitleStyle: {
                textAlign: 'center',

            },
        }}/>
    </AuthStack.Navigator>
);


const ScheduleStackScreen = () => (
    <AuthStack.Navigator screenOptions={style}>
        <AuthStack.Screen name={'Cronograma'} component={ScheduleScreen} options={{
            title: 'Cronograma',
            headerShown: false,
            headerTitleStyle: {
                textAlign: 'center'
            },
        }}/>
    </AuthStack.Navigator>
);

const ProfileStackScreen = () => (

    <AuthStack.Navigator screenOptions={style}>
        <AuthStack.Screen name={'Perfil'} component={ProfileScreen} options={{
            title: 'Perfil',
            headerShown: false
        }}/>
    </AuthStack.Navigator>

);


export default function Root() {
    return (

        <Tab.Navigator activeColor="#fff" inactiveColor="#2c6aa0" barStyle={{backgroundColor: '#103c68'}}>

            <Tab.Screen name={'Maintenance'} component={MaintenanceStackScreen} options={{
                title: false, tabBarIcon: (focused) => (
                    <Image source={require('../assets/iconos/gear.png')} style={{width: 40, height: 40}}/>
                ),
            }}/>


            <Tab.Screen name={'Schedule'} component={ScheduleStackScreen} options={{
                title: false, tabBarIcon: () => (
                    <Image source={require('../assets/iconos/calendar.png')}
                           style={{width: 40, height: 40}}/>
                ),
            }}/>

            <Tab.Screen name={'Perfil'} component={ProfileStackScreen} options={{
                title: false, tabBarIcon: () => (
                    <Image source={require('../assets/iconos/profile.png')} style={{width: 40, height: 40}}/>
                ),
            }}/>

        </Tab.Navigator>
    )
}


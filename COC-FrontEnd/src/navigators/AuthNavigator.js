'use strict'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native';
import login from "@screens/login";
import Root from './RouterNavigator';
import ModificarPerfil from '../components/ModificarPerfil/modificar'
import MaintenanceForm from '../components/RegistrarMantenimiento/MaintenanceForm'

const RootStack = createStackNavigator();

export default function RootStackScreen({View}) {
    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName={View} mode={'modal'} screenOptions={({}) => {
                return {
                    gestureEnabled: true,
                    cardOverlayEnabled: true,
                    animationEnabled: true,
                    headerShown: false
                }
            }}>
                <RootStack.Screen name={'LoginScreen'} options={{headerShown: false}} component={login}/>
                <RootStack.Screen name={'Main'} component={Root}/>
                <RootStack.Screen name={'MantenimientoNuevo'} component={MaintenanceForm}/>
                <RootStack.Screen name={'ModificarPerfil'} component={ModificarPerfil}/>
            </RootStack.Navigator>
        </NavigationContainer>
    )
}




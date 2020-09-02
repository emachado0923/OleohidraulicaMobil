'use strict'
import React from 'react';
import {View, ActivityIndicator, Image} from "react-native";
import Logo from './src/assets/fotos/Logo.png'
//index
import Inicio from './src/';
//Redux
import {Provider} from "react-redux";
import store from './src/store/store'


export default function App() {

    const [isLoading, setIsLoading] = React.useState(true)


    React.useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 200)
    }, [])

    if (isLoading) {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <Image source={Logo} style={{width: 150, height: 150}}/>
                <ActivityIndicator style={{margin: 50}} color={'#2879b8'} size={'large'}/>
            </View>
        )
    }

    return (
        <Provider store={store}>
            <Inicio/>
        </Provider>
    );
}



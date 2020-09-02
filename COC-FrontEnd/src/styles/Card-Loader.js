import {StyleSheet, Dimensions, View} from 'react-native';
import React from "react";

export default StyleSheet.create({

    modalView: {
        margin: 40,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    borderCard: {
        width: 300,
        margin: 5,
        alignItems: 'stretch',
        justifyContent: 'center'

    }, centerButton: {
        fontWeight: 'bold',
        justifyContent: 'center'
    }, container1: {
        backgroundColor: '#2d4471',
        alignItems: 'center',
        padding: 0,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
    countContainer: {
        alignItems: 'center',
        padding: 5,
    }, container: {
        width: '90%',
        height: 40,
        padding: 3,
        borderColor: 'rgba(0,0,0,0.97)',
        borderWidth: 3,
        borderRadius: 25,
        marginTop: 10,
        justifyContent: 'center',
    },
    inner: {
        width: '90%',
        height: 30,
        borderRadius: 15,
        backgroundColor: '#2d4471',
    },
    label: {
        fontSize: 20,
        color: '#fff',
        position: 'absolute',
        zIndex: 1,
        alignSelf: 'center',
    },
    loaderStyle: {
        alignItems: 'center',
        backgroundColor: 'rgba(16,6,6,0.55)',
        borderRadius: 25,
        margin: 5,
        marginTop: 100,
        padding: 20,
    }, LineaSeparadora: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    }
});

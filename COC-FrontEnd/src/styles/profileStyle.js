import {StyleSheet} from 'react-native';


export default StyleSheet.create({
    container: {

        borderWidth: 0,
        flex: 1,
        margin: 0,
        padding: 0,
        backgroundColor: "#596771",

    },
    headerBackgroundImage: {

        padding: 40,
        alignItems: 'center',
        backgroundColor: '#c6ccd5'

    },
    text: {

        fontFamily: "HelveticaNeue",
        color: "#000",
        fontWeight: '200',
        fontSize: 12

    },
    name: {

        fontSize: 22,
        color: "#000",
        fontWeight: 'bold',
        textAlign: 'center'
    },
    profileImage: {

        width: 130,
        height: 130,
        marginBottom: 10,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "#000",

    },
    IconItem: {

        width: 40,
        height: 40,
        right: 10

    }, card: {

        width: '100%',
        height: '10%',
        padding: 20,
        margin: 10,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#000',
        backgroundColor: "#f3efef",
        flexDirection: 'row',
        shadowColor: 'black',
        shadowOpacity: .2,

    },
    buttonBack: {

        width: '70%',
        padding: 5,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#dddfe7',
        backgroundColor: '#000',


    }, buttonEdit: {

        padding: 5,
        width: '70%',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#dddfe7',
        backgroundColor: '#182465',

    }, infoProfile: {

        flexDirection: 'row',
        flexWrap: 'wrap',
    },Titulo:{
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 17
    }

})

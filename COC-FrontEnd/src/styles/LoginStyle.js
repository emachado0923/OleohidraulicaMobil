import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
    },
    loginContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.8,
        borderRadius: 10,
        backgroundColor: 'rgba(177,157,157,0.03)',
    },
    logo: {
        width: 350,
        height: 120,
        borderRadius: 10,
        opacity: 0.8,

    },
    title: {
        top: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
    },
    ButtonLogin: {
        width: 111 * 2,
        height: 40,
        borderRadius: 25,
        justifyContent: 'center',
        backgroundColor: '#1c73c1',
        marginTop: 17,
    }, textButton: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ffffff',
    },
    Input: {
        width: 110 * 2,
        fontSize: 16,
        borderRadius: 17,
        backgroundColor: 'rgba(0,0,0,.25)',
        color: 'rgb(0,0,0)',
        paddingLeft: 35,
        opacity: 0.5,

    }, IconsStyle: {
        position: 'relative',
        top: '50%',
        left: 10,
    }, IconPassword: {
        position: 'absolute',
        top: '50%',
        right: 10,
    },
    dangerMessage: {
        borderWidth: 1,
        borderColor: '#dc1a1a',
        padding: 5,
        borderRadius: 10,
        justifyContent: 'center',
        margin: 5,
        backgroundColor: '#e21212'
    }
});

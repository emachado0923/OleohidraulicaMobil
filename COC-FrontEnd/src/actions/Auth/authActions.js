import {
    AUTENTICADO,
    ERROR_DE_AUTENTICACION,
    NO_AUTENTICADO,
    DATOS_USUARIO,
    CARGANDO
} from '../../Constants/AuthConstants'
import AsyncStorage from "@react-native-community/async-storage";
import Axios from "axios";


const Url = 'http://192.168.1.58:3000';

export const cargando = loader => ({
    type: CARGANDO,
    loader
});

export const token = token => ({
    type: AUTENTICADO,
    token
});

export const datosUsuario = usuario => ({
    type: DATOS_USUARIO,
    usuario
});

export const SaveToken = (key, value) => async dispatch => {

    try {

        await AsyncStorage.setItem(key, value)
        console.log('Guardado con exito')

    } catch (e) {

        console.log('Error de Almacenamiento' + e)
        dispatch({
            type: ERROR_DE_AUTENTICACION,
            payload: 'Error de autenticación!: ' + e
        });

    }
}

export const getToken = () => async dispatch => {


    async function AUTH(link, token) {
        Axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
        let peticion = await Axios.get(Url + link).then((res) => {
            return res;
        })
        return peticion
    }

    try {
        const TOKEN = await AsyncStorage.getItem('token')
        if (TOKEN !== null) {
            await AUTH(`/autorization/token`, TOKEN).then(({data}) => {
                dispatch(token(TOKEN))
                dispatch(datosUsuario(data))
            })
            dispatch(cargando(false))
        }
    } catch (e) {
        DeleteToken()
        dispatch(cargando(false));
        dispatch({
            type: ERROR_DE_AUTENTICACION,
            payload: 'Error de Permisos!: ' + e
        })
    }

}

export const DeleteToken = () => async dispatch => {

    try {
        await AsyncStorage.removeItem('token')
        dispatch({
            type: NO_AUTENTICADO,
            payload: [
                token(`${false}`),
                datosUsuario(null
                )
            ]
        })
    } catch (e) {
        dispatch({
            type: ERROR_DE_AUTENTICACION,
            payload: 'Error de Permisos!: ' + e
        })
    }
}


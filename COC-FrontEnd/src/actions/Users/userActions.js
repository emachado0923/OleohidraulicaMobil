import axios from 'axios'
import AsyncStorage from "@react-native-community/async-storage";
import {GET_USERS, CARGANDO, ERROR} from "../../Constants/UserConstants";

const Url = 'http://192.168.1.58:3000';

export const obtenerUsuarios = () => async (dispatch) => {
    dispatch({
        type: CARGANDO
    })
    try {
        const GetUsers = await axios.get(`${Url}/sistema`)
        dispatch({
            type: GET_USERS,
            payload: await AsyncStorage.setItem('Users', JSON.stringify(GetUsers.data[8]))
        })

    } catch (e) {
        console.log(e)
        dispatch({
            type: ERROR,
            payload: 'Información no disponible!'
        })
    }


}


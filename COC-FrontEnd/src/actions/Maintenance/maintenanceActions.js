import axios from 'axios'

import {LISTAR_MANTENIMIENTOS,CARGANDO, ERROR} from '../../Constants/MaintenanceConstants'
import AsyncStorage from "@react-native-community/async-storage";

const Url = 'http://192.168.1.55:3000/api';

export const ListarMantenimientos = () => async (dispatch) => {
    dispatch({
        type: CARGANDO
    })
    try {

        const Maintenance = await axios.get(`${Url}/mantenimiento`)
        dispatch({
            type: LISTAR_MANTENIMIENTOS,
            payload: Maintenance.data
        })

    } catch (e) {
        console.log(e)
        dispatch({
            type: ERROR,
            payload: 'Información no disponible'
        })
    }
}


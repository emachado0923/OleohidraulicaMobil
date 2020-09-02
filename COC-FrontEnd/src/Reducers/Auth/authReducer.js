import {AUTENTICADO, ERROR_DE_AUTENTICACION, DATOS_USUARIO, CARGANDO} from "../../Constants/AuthConstants";


const INITIAL_STATE = {
    token: false,
    usuario: {},
    loader: false
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTENTICADO:
            return {
                ...state,
                token: action.token
            }
        case DATOS_USUARIO:
            return {
                ...state,
                usuario: action.usuario
            }
        case CARGANDO:
            return {
                ...state,
                loader: action.loader
            }
        case ERROR_DE_AUTENTICACION:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

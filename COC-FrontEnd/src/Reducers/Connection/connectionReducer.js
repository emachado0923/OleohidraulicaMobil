import {VERIFICANDO_CONEXION, CONEXION_DISPONIBLE, SIN_CONEXION} from '../../Constants/ConnectionConstants';

const INITIAL_STATE = {
    conexionDisponible: false,
    sinConexion: false,
    verificando: false,

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CONEXION_DISPONIBLE:
            return {
                ...state,
                conexionDisponible: action.conexionDisponible,
                verificando: false,
            };
        case SIN_CONEXION:
            return {
                ...state,
                sinConexion: action.sinConexion,
                verificando: false,
            };
        case VERIFICANDO_CONEXION:
            return {
                ...state,
                verificando: true,
            };
        default:
            return state;
    }
}

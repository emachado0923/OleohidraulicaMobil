import {LISTAR_COMPONENTES, CARGANDO, ERROR} from '../../Constants/ItemsConstants';

const INITIAL_STATE = {
    data: [],
    loading: false,
    error: ''
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case LISTAR_COMPONENTES:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: ''
            }

        case CARGANDO:
            return {
                ...state, loading: true
            }
        case ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}

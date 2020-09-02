import {GET_USERS, CARGANDO, ERROR} from '../../Constants/UserConstants'

const INITIAL_STATE = {

    users: [],
    loading: false,
    error: ''
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case GET_USERS:
            return {
                ...state,
                users: action.payload,
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

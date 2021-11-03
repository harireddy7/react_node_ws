import { GET_USER_FAILURE, GET_USER_LOADING, GET_USER_SUCCESS, SET_LOGGED_USER } from '../types';

const INTI_STORE = {
    data: null,
    loading: false,
    error: false,
};

function userReducer(state = INTI_STORE, { type, payload }) {
    switch(type) {
        case SET_LOGGED_USER:
            return {
                ...state,
                loading: false,
                error: false,
                data: payload,
            }
        case GET_USER_LOADING:
            return {
                ...state,
                loading: true,
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                user: payload,
            }
        case GET_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            }
        default:
            return state;
    }
}

export default userReducer;
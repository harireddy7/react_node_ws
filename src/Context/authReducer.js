import { GET_USER_FAILURE, GET_USER_LOADING, GET_USER_SUCCESS, SET_LOGGED_USER } from './AuthActions';

const authReducer = (state, { type, payload }) => {
    switch(type) {
        case SET_LOGGED_USER:
            return {
                ...state,
                loading: false,
                error: false,
                user: payload,
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

export default authReducer;
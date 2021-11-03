import { axiosInstance } from '../../config/axiosInstance';
import { SET_LOGGED_USER, GET_USER_LOADING, GET_USER_SUCCESS, GET_USER_FAILURE } from '../types';

export const fetchLoggedUser = (id, history) => (dispatch) => {
    dispatch({
        type: GET_USER_LOADING,
    });
    axiosInstance.get(`/user/${id}`).then(response => {
        const userObj = response.data?.data;
        localStorage.setItem('user', JSON.stringify(userObj));
        dispatch({
            type: GET_USER_SUCCESS,
            payload: userObj
        });
        history.push('/');
    }).catch(err => {
        console.log(err);
        dispatch({
            type: GET_USER_FAILURE,
        });
    })
}

export const setLoggedUser = payload => ({
    type: SET_LOGGED_USER,
    payload,
});

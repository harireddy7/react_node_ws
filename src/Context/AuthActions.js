import { axiosInstance } from '../config/axiosInstance';

export const SET_LOGGED_USER = 'SET_LOGGED_USER';

export const GET_USER_LOADING = 'GET_USER_LOADING';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';


export const fetchLoggedUser = (id, history, dispatch) => {
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

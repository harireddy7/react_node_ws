import { axiosInstance } from '../../config/axiosInstance';
import { SET_ACTIVE_CONTACT, SET_CONTACTS_FAILURE, SET_CONTACTS_LOADING, SET_CONTACTS_SUCCESS } from '../types';

export const fetchContacts = () => (dispatch) => {
    dispatch({
        type: SET_CONTACTS_LOADING,
    });
    axiosInstance.get('/contacts').then(response => {
        const contacts = response.data?.data;
        dispatch({
            type: SET_CONTACTS_SUCCESS,
            payload: contacts
        });
    }).catch(err => {
        console.log(err);
        dispatch({
            type: SET_CONTACTS_FAILURE,
        });
    })
}

export const setActiveContact = (payload) => {
    return {
        type: SET_ACTIVE_CONTACT,
        payload
    }
}
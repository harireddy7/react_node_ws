import { axiosInstance } from '../../config/axiosInstance';
import {
    SET_ACTIVE_CONTACT,
    SET_CONTACTS_FAILURE,
    SET_CONTACTS_LOADING,
    SET_CONTACTS_SUCCESS,
    SET_ADD_CONTACT_LOADING,
    SET_ADD_CONTACT_SUCCESS,
    SET_ADD_CONTACT_FAILURE,
    RESET_CONTACTS
} from '../types';

export const fetchContacts = (id) => (dispatch) => {
    dispatch({
        type: SET_CONTACTS_LOADING,
    });
    axiosInstance.get(`/contacts/${id}`).then(response => {
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

export const createNewContact = (data) => (dispatch) => {
    dispatch({
        type: SET_ADD_CONTACT_LOADING,
    });
    axiosInstance.post(`/contacts`, data).then(response => {
        const contacts = response.data?.data;
        dispatch({
            type: SET_ADD_CONTACT_SUCCESS,
            payload: contacts
        });
    }).catch(err => {
        console.log(err);
        dispatch({
            type: SET_ADD_CONTACT_FAILURE,
            payload: err?.response?.data?.message
        });
    })
}

export const setActiveContact = (payload) => {
    return {
        type: SET_ACTIVE_CONTACT,
        payload
    }
}

export const resetContacts = () => {
    return {
        type: RESET_CONTACTS,
    }
}
import { SET_ACTIVE_CONTACT, SET_CONTACTS_FAILURE, SET_CONTACTS_LOADING, SET_CONTACTS_SUCCESS } from '../types';

const INTI_STORE = {
    loading: false,
    data: [],
    error: false,
};
/*
    contacts: [],
    loading: false,
    error: false

*/

function contactsReducer(state = INTI_STORE, { type, payload }) {
    switch(type) {
        case SET_CONTACTS_LOADING:
            return {
                ...state,
                loading: true,
            }
        case SET_CONTACTS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: payload,
            }
        case SET_CONTACTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
                data: []
            }
        case SET_ACTIVE_CONTACT: {
            return {
                ...state,
                activeContact: payload,
            }
        }
        default:
            return state;
    }
}

export default contactsReducer;
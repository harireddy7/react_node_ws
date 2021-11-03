import { axiosInstance } from '../../config/axiosInstance';
import { insertIntoMessages } from '../../utils';
import {
    SET_ACTIVE_CHAT,
    SET_CHATS_LOADING,
    SET_CHATS_SUCCESS,
    SET_CHATS_FAILURE
} from '../types';

export const fetchChats = (id) => (dispatch) => {
    dispatch({
        type: SET_CHATS_LOADING,
    });
    axiosInstance.get(`/chats/${id}`).then(response => {
        const chats = response.data?.data;
        dispatch({
            type: SET_CHATS_SUCCESS,
            payload: chats
        });
    }).catch(err => {
        console.log(err);
        dispatch({
            type: SET_CHATS_FAILURE,
        });
    })
}

export const setActiveChat = (payload) => {
    return {
        type: SET_ACTIVE_CHAT,
        payload
    }
}

export const updateChatMessages = payload => {
    const revisedChats = insertIntoMessages(payload);

    return {
        type: SET_CHATS_SUCCESS,
        payload: revisedChats,
    };
}
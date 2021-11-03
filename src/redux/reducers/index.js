import { combineReducers } from 'redux';
import userReducer from './userReducer';
import contactsReducer from './contactsReducer';
import chatsReducer from './chatsReducer';

export default combineReducers({
    user: userReducer,
    contacts: contactsReducer,
    chats: chatsReducer,
})
import { combineReducers } from 'redux';
import contactsReducer from './contactsReducer';
import chatsReducer from './chatsReducer';

export default combineReducers({
    contacts: contactsReducer,
    chats: chatsReducer,
})
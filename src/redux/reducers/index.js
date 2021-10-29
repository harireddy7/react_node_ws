import { combineReducers } from 'redux';
import userReducer from './userReducer';
import contactsReducer from './contactsReducer';

export default combineReducers({
    user: userReducer,
    contacts: contactsReducer,
})
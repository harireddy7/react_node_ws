import {
	SET_ACTIVE_CONTACT,
	SET_CONTACTS_FAILURE,
	SET_CONTACTS_LOADING,
	SET_CONTACTS_SUCCESS,
	SET_ADD_CONTACT_LOADING,
	SET_ADD_CONTACT_SUCCESS,
	SET_ADD_CONTACT_FAILURE,
	RESET_CONTACTS,
} from '../types';

const INTI_STORE = {
	loading: false,
	data: null,
	error: false,
    activeContact: null,
    addContact: {
        loading: false,
		error: false,
		done: false,
    }
};

function contactsReducer(state = INTI_STORE, { type, payload }) {
	switch (type) {
		case SET_CONTACTS_LOADING:
			return {
				...state,
				loading: true,
			};
		case SET_CONTACTS_SUCCESS:
			return {
				...state,
				loading: false,
				data: payload,
			};
		case SET_CONTACTS_FAILURE:
			return {
				...state,
				loading: false,
				error: true,
				data: [],
			};
		case SET_ADD_CONTACT_LOADING:
			return {
				...state,
				addContact: {
                    ...state.addContact,
                    loading: true,
                }
			};
		case SET_ADD_CONTACT_SUCCESS:
			return {
				...state,
                ...payload && { data: payload },
				addContact: {
                    loading: false,
					error: false,
					done: true,
                },
			};
		case SET_ADD_CONTACT_FAILURE:
			return {
				...state,
                addContact: {
                    loading: false,
                    error: payload,
                }
			};
		case SET_ACTIVE_CONTACT: {
			return {
				...state,
				activeContact: payload,
			};
		}
		case RESET_CONTACTS: {
			return INTI_STORE;
		}
		default:
			return state;
	}
}

export default contactsReducer;

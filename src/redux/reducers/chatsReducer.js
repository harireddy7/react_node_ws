import {
	SET_ACTIVE_CHAT,
	SET_CHATS_FAILURE,
	SET_CHATS_LOADING,
	SET_CHATS_SUCCESS,
	RESET_CHATS,
} from '../types';

const INTI_STORE = {
	loading: false,
	data: null,
	error: false,
	activeChat: null,
};

function chatsReducer(state = INTI_STORE, { type, payload }) {
	switch (type) {
		case SET_CHATS_LOADING:
			return {
				...state,
				loading: true,
			};
		case SET_CHATS_SUCCESS:
			return {
				...state,
				loading: false,
				data: payload,
			};
		case SET_CHATS_FAILURE:
			return {
				...state,
				loading: false,
				error: true,
			};
		case SET_ACTIVE_CHAT: {
			return {
				...state,
				activeChat: payload,
			};
		}
		case RESET_CHATS: {
			return INTI_STORE;
		}
		default:
			return state;
	}
}

export default chatsReducer;

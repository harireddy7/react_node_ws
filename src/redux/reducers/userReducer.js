const INTI_STORE = {};

export default function(state = INTI_STORE, { type, payload }) {
    switch(type) {
        case 'SET_USER':
            return {
                ...state,
                ...payload,
            }
        default:
            return state;
    }
}
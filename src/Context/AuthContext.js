import { useEffect, createContext, useReducer } from 'react';
import authReducer from './authReducer';

const INIT_STATE = {
	user: JSON.parse(localStorage.getItem('user')) || null,
	loading: false,
	error: false,
};

export const AuthContext = createContext(INIT_STATE);

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, INIT_STATE);

	useEffect(() => {
		if (state.user) {
			localStorage.setItem('user', JSON.stringify(state.user));
		} else {
			localStorage.removeItem('user');
		}
	}, [state.user]);

	return (
		<AuthContext.Provider
			value={{
				...state,
				setUserContext: dispatch,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

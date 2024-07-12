import { User, UserAction, UserActionTypes } from './types';

export const userInitState: User = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

export const userReducer = (state = userInitState, action: UserAction) => {
	switch (action.type) {
		case UserActionTypes.ADD_USER:
			return action.payload;
		case UserActionTypes.REMOVE_USER:
			return userInitState;
		default:
			return state;
	}
};

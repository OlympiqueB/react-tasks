import { AuthorType, AuthorsAction, AuthorsActionTypes } from './types';

export const authorsInitialState: AuthorType[] = [];

export const authorsReducer = (
	state = authorsInitialState,
	action: AuthorsAction
) => {
	switch (action.type) {
		case AuthorsActionTypes.SAVE_AUTHORS:
			return action.payload;
		case AuthorsActionTypes.ADD_AUTHOR:
			return [...state, action.payload];
		default:
			return state;
	}
};

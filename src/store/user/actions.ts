import { User, UserActionTypes, AddUser, RemoveUser } from './types';

export const addUserAction = (user: User): AddUser => ({
	type: UserActionTypes.ADD_USER,
	payload: user,
});

export const removeUserAction = (): RemoveUser => ({
	type: UserActionTypes.REMOVE_USER,
});

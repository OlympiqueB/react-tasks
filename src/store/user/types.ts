export const enum UserActionTypes {
	ADD_USER = 'ADD_USER',
	REMOVE_USER = 'REMOVE_USER',
}

export interface User {
	isAuth: boolean;
	name: string;
	email: string;
	token: string;
	role: string;
}

export interface AddUser {
	type: UserActionTypes.ADD_USER;
	payload: User;
}

export interface RemoveUser {
	type: UserActionTypes.REMOVE_USER;
}

export type UserAction = AddUser | RemoveUser;

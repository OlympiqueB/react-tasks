import { UnknownAction } from '@reduxjs/toolkit';
import { RootState, ThunkAction } from '..';
import { getUserData, userLogin, userLogout } from '../../services';
import {
	GetUserDataResponse,
	LoginDataType,
	LoginResponseType,
} from '../../servicesTypes';
import { User, UserActionTypes } from './types';
import { NavigateFunction } from 'react-router-dom';

export const fetchUserThunk =
	(): ThunkAction<void, RootState, unknown, UnknownAction> =>
	async (dispatch) => {
		const response: GetUserDataResponse | null = await getUserData();

		if (response?.successful) {
			const newUserState: User = {
				isAuth: response.successful,
				name: response.result.name,
				email: response.result.email,
				token: localStorage.getItem('userToken')!,
				role: response.result.role,
			};
			dispatch({ type: UserActionTypes.ADD_USER, payload: newUserState });
		} else {
			console.log(response);
		}
	};

export const userLoginThunk =
	(
		user: LoginDataType,
		navigate: NavigateFunction
	): ThunkAction<void, RootState, unknown, UnknownAction> =>
	async (dispatch) => {
		const response: LoginResponseType | null = await userLogin(user);

		if (response?.successful) {
			localStorage.setItem('userToken', response.result);

			// the login response doesn't contain the role, so I'll just immediately fetch the user
			dispatch(fetchUserThunk());
			navigate('/courses');
		} else {
			console.log(response);
		}
	};

export const userLogoutThunk =
	(): ThunkAction<void, RootState, unknown, UnknownAction> =>
	async (dispatch) => {
		const response: Response | null = await userLogout();

		if (response.ok) {
			dispatch({ type: UserActionTypes.REMOVE_USER });
			localStorage.removeItem('userToken');
		} else {
			console.log(response);
		}
	};

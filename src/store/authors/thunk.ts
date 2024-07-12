import { UnknownAction } from '@reduxjs/toolkit';
import { RootState, ThunkAction } from '..';
import {
	AddNewAuthorResponseType,
	GetAllAuthorsResponse,
} from '../../servicesTypes';
import { AuthorType, AuthorsActionTypes } from './types';
import { addNewAuthor, getAllAuthors } from '../../services';

export const fetchAuthorsThunk =
	(): ThunkAction<void, RootState, unknown, UnknownAction> =>
	async (dispatch) => {
		const data: GetAllAuthorsResponse = await getAllAuthors();
		if (data.successful) {
			dispatch({ type: AuthorsActionTypes.SAVE_AUTHORS, payload: data.result });
		} else {
			console.log(data);
		}
	};

export const addAuthorThunk =
	(author: AuthorType): ThunkAction<void, RootState, unknown, UnknownAction> =>
	async (dispatch) => {
		const response: AddNewAuthorResponseType = await addNewAuthor(author);
		if (response.successful) {
			dispatch({
				type: AuthorsActionTypes.ADD_AUTHOR,
				payload: response.result,
			});
		} else {
			console.log(response);
		}
	};

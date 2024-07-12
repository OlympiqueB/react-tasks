import {
	AddAuthor,
	AuthorType,
	AuthorsActionTypes,
	SaveAuthors,
} from './types';

export const addAuthorAction = (authorData: AuthorType): AddAuthor => ({
	type: AuthorsActionTypes.ADD_AUTHOR,
	payload: authorData,
});

export const saveAuthorsAction = (allAuthors: AuthorType[]): SaveAuthors => ({
	type: AuthorsActionTypes.SAVE_AUTHORS,
	payload: allAuthors,
});

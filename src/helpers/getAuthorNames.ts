import { AuthorType } from '../store/authors/types';

export const getAuthorNames = (
	authorIds: string[],
	authors: AuthorType[]
): string => {
	const names = [];

	for (const id of authorIds) {
		const author = authors.find((author) => author.id === id);

		if (author) {
			names.push(author.name);
		}
	}

	return names.join(', ');
};

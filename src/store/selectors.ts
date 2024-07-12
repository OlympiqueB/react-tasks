import { RootState } from '.';

export const getCourses = (state: RootState) => state.courses;
export const getAuthors = (state: RootState) => state.authors;
export const getUser = (state: RootState) => state.user;

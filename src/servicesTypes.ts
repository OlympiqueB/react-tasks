import { AuthorType } from './store/authors/types';
import { CourseType } from './store/courses/types';

// get requests

export interface GetAllAuthorsResponse {
	result: AuthorType[];
	successful: boolean;
}

export interface GetAllCoursesResponse {
	result: CourseType[];
	successful: boolean;
}

export interface GetUserDataResponse {
	result: {
		name: string;
		email: string;
		password: string;
		role: string;
		id: string;
	};
	successful: boolean;
}

// post requests

export interface RegistrationUserType {
	name: string;
	email: string;
	password: string;
}

export interface RegistrationResponseType {
	errors: string[];
	successful: boolean;
}

export interface LoginDataType {
	email: string;
	password: string;
}

export interface LoginResponseType {
	result: string;
	successful: boolean;
	user: { email: string; name: string };
}

export interface AddNewCourseResponseType {
	result: CourseType;
	successful: boolean;
}

export interface AddNewAuthorResponseType {
	result: AuthorType;
	successful: boolean;
}

// put requests

// delete requests

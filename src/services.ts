import {
	AddCourseType,
	UpdateCourseType,
} from './components/CreateCourse/CreateCourse.type';
import {
	AddNewAuthorResponseType,
	AddNewCourseResponseType,
	GetAllAuthorsResponse,
	GetAllCoursesResponse,
	GetUserDataResponse,
	LoginDataType,
	LoginResponseType,
	RegistrationResponseType,
	RegistrationUserType,
} from './servicesTypes';
import { AuthorType } from './store/authors/types';

export const API_BASE_URL: string = 'http://localhost:4000';

// get requests

export const getAllCourses = async (): Promise<GetAllCoursesResponse> => {
	const response = await fetch(`${API_BASE_URL}/courses/all`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const result = await response.json();
	return result;
};

export const getAllAuthors = async (): Promise<GetAllAuthorsResponse> => {
	const response = await fetch(`${API_BASE_URL}/authors/all`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const result = await response.json();
	return result;
};

export const getUserData = async (): Promise<GetUserDataResponse | null> => {
	const userToken = localStorage.getItem('userToken');

	if (userToken) {
		const response = await fetch(`${API_BASE_URL}/users/me`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${userToken}`,
			},
		});

		return await response.json();
	} else {
		return null;
	}
};

// post requests

export const registerNewUser = async (
	user: RegistrationUserType
): Promise<RegistrationResponseType> => {
	const response = await fetch(`${API_BASE_URL}/register`, {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return await response.json();
};

export const userLogin = async (
	loginData: LoginDataType
): Promise<LoginResponseType> => {
	const response = await fetch(`${API_BASE_URL}/login`, {
		method: 'POST',
		body: JSON.stringify(loginData),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return await response.json();
};

export const addNewCourse = async (
	course: AddCourseType
): Promise<AddNewCourseResponseType> => {
	const response = await fetch(`${API_BASE_URL}/courses/add`, {
		method: 'POST',
		body: JSON.stringify(course),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${localStorage.getItem('userToken')}`,
		},
	});

	return await response.json();
};

export const addNewAuthor = async (
	author: AuthorType
): Promise<AddNewAuthorResponseType> => {
	const response = await fetch(`${API_BASE_URL}/authors/add`, {
		method: 'POST',
		body: JSON.stringify(author),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${localStorage.getItem('userToken')}`,
		},
	});

	return await response.json();
};

// put requests

export const updateCourse = async (
	course: AddCourseType
): Promise<Response> => {
	const updatedCourse: UpdateCourseType = {
		title: course.title,
		description: course.description,
		duration: course.duration,
		authors: course.authors,
	};

	const response: Response = await fetch(
		`${API_BASE_URL}/courses/${course.id}`,
		{
			method: 'PUT',
			body: JSON.stringify(updatedCourse),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${localStorage.getItem('userToken')}`,
			},
		}
	);

	return response;
};

// delete requests

export const userLogout = async (): Promise<Response> => {
	const response = await fetch(`${API_BASE_URL}/logout`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${localStorage.getItem('userToken')}`,
		},
	});

	return response;
};

export const deleteCourse = async (id: string): Promise<Response> => {
	const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${localStorage.getItem('userToken')}`,
		},
	});

	return response;
};

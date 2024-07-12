import { ThunkAction, UnknownAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { GetAllCoursesResponse } from '../../servicesTypes';
import { getAllCourses } from '../../services';

export type CourseType = {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
};

export const enum CoursesActionTypes {
	SAVE_COURSES = 'SAVE_COURSES',
	ADD_COURSE = 'ADD_COURSE',
	DELETE_COURSE = 'DELETE_COURSES',
	UPDATE_COURSE = 'UPDATE_COURSE',
	FETCH_COURSES = 'FETCH_COURSES',
}

export interface SaveCourses {
	type: CoursesActionTypes.SAVE_COURSES;
	payload: CourseType[];
}

export interface AddCourse {
	type: CoursesActionTypes.ADD_COURSE;
	payload: CourseType;
}

export interface UpdateCourse {
	type: CoursesActionTypes.UPDATE_COURSE;
	payload: CourseType;
}

export interface DeleteCourse {
	type: CoursesActionTypes.DELETE_COURSE;
	payload: string;
}

export interface FetchCourses {
	type: CoursesActionTypes.FETCH_COURSES;
	payload: CourseType[];
}

export const fetchCourses =
	(): ThunkAction<void, RootState, unknown, UnknownAction> =>
	async (dispatch) => {
		const data: GetAllCoursesResponse = await getAllCourses();
		if (data.successful) {
			dispatch({
				type: CoursesActionTypes.SAVE_COURSES,
				payload: data.result,
			});
		} else {
			console.log(data);
		}
	};

export type CoursesAction =
	| SaveCourses
	| AddCourse
	| DeleteCourse
	| UpdateCourse
	| FetchCourses;

import { UnknownAction } from '@reduxjs/toolkit';
import { RootState, ThunkAction } from '..';
import {
	AddNewCourseResponseType,
	GetAllCoursesResponse,
} from '../../servicesTypes';
import {
	addNewCourse,
	deleteCourse,
	getAllCourses,
	updateCourse,
} from '../../services';
import { CourseType, CoursesActionTypes } from './types';
import { AddCourseType } from '../../components/CreateCourse/CreateCourse.type';

export const fetchCoursesThunk =
	(): ThunkAction<void, RootState, unknown, UnknownAction> =>
	async (dispatch) => {
		const data: GetAllCoursesResponse = await getAllCourses();
		if (data.successful) {
			dispatch({ type: CoursesActionTypes.SAVE_COURSES, payload: data.result });
		} else {
			console.log(data);
		}
	};

export const addCourseThunk =
	(
		course: AddCourseType
	): ThunkAction<void, RootState, unknown, UnknownAction> =>
	async (dispatch) => {
		const response: AddNewCourseResponseType = await addNewCourse(course);
		if (response) {
			dispatch({
				type: CoursesActionTypes.ADD_COURSE,
				payload: response.result,
			});
			console.log(response);
		} else {
			console.log(response);
		}
	};

export const updateCourseThunk =
	(course: CourseType): ThunkAction<void, RootState, unknown, UnknownAction> =>
	async (dispatch) => {
		const response = await updateCourse(course);

		if (response.ok) {
			dispatch({
				type: CoursesActionTypes.UPDATE_COURSE,
				payload: course,
			});
		} else {
			console.log(response);
		}
	};

export const deleteCourseThunk =
	(id: string): ThunkAction<void, RootState, unknown, UnknownAction> =>
	async (dispatch) => {
		const response = await deleteCourse(id);

		if (response.ok) {
			dispatch({
				type: CoursesActionTypes.DELETE_COURSE,
				payload: id,
			});
		} else {
			console.log(response);
		}
	};

import {
	AddCourse,
	CourseType,
	CoursesActionTypes,
	DeleteCourse,
	SaveCourses,
	UpdateCourse,
} from './types';

export const saveCoursesAction = (allCourses: CourseType[]): SaveCourses => ({
	type: CoursesActionTypes.SAVE_COURSES,
	payload: allCourses,
});

export const addNewCourseAction = (courseData: CourseType): AddCourse => ({
	type: CoursesActionTypes.ADD_COURSE,
	payload: courseData,
});

export const updateCourseAction = (courseData: CourseType): UpdateCourse => ({
	type: CoursesActionTypes.UPDATE_COURSE,
	payload: courseData,
});

export const deleteCourseAction = (id: string): DeleteCourse => ({
	type: CoursesActionTypes.DELETE_COURSE,
	payload: id,
});

import { CourseType, CoursesAction, CoursesActionTypes } from './types';

const initCoursesState: CourseType[] = [];

export const coursesReducer = (
	state = initCoursesState,
	action: CoursesAction
) => {
	switch (action.type) {
		case CoursesActionTypes.SAVE_COURSES:
			return action.payload;
		case CoursesActionTypes.ADD_COURSE:
			return [...state, action.payload];
		case CoursesActionTypes.UPDATE_COURSE:
			return state.map((course) =>
				course.id === action.payload.id ? action.payload : course
			);
		case CoursesActionTypes.DELETE_COURSE:
			return state.filter((course) => course.id !== action.payload);
		default:
			return state;
	}
};

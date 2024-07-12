import { CourseType } from '../store/courses/types';

export const getCourseById = (
	id: string,
	courseList: CourseType[]
): CourseType => {
	return courseList.find((course) => course.id === id)!;
};

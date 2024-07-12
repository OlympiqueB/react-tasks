export interface AddCourseType {
	id: string;
	title: string;
	description: string;
	duration: number;
	authors: string[];
}

export interface UpdateCourseType {
	title: string;
	description: string;
	duration: number;
	authors: string[];
}

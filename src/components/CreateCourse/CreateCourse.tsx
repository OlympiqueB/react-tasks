import { ChangeEvent, FormEventHandler, useState } from 'react';
import {
	ErrorObject,
	FieldErrors,
	fieldRequired,
	minLength,
	validateField,
	validateForm,
} from '../../helpers/validators';
import Input from '../../common/Input/Input';
import ValidationErrorMessage from '../../common/ValidationErrorMessage/ValidationErrorMessage';
import Button from '../../common/Button/Button';
import { getCourseDuration } from '../../helpers/getCourseDuration';
import './CreateCourse.css';
import { v4 as uuidv4 } from 'uuid';
import AuthorItem from './components/AuthorItem/AuthorItem';
import { AuthorType } from '../../store/authors/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { getAuthors, getCourses } from '../../store/selectors';
import { AddCourseType } from './CreateCourse.type';
import { addCourseThunk, updateCourseThunk } from '../../store/courses/thunk';
import { addAuthorThunk } from '../../store/authors/thunk';
import { useParams } from 'react-router-dom';

const CreateCourse = () => {
	const params = useParams();
	const courses = useSelector(getCourses);
	const courseIdToUpdate = params.courseId;

	const courseToUpdate = courses.find(
		(course) => course.id === courseIdToUpdate
	);

	const dispatch = useDispatch<AppDispatch>();
	const authorList = useSelector(getAuthors);

	const [title, setTitle] = useState(courseToUpdate?.title || '');
	const [description, setDescription] = useState(
		courseToUpdate?.description || ''
	);
	const [duration, setDuration] = useState(
		courseToUpdate?.duration?.toString() || ''
	);
	const [author, setAuthor] = useState('');

	const getCourseAuthors = () => {
		const res: AuthorType[] = [];
		if (courseToUpdate) {
			courseToUpdate.authors?.forEach((a: string) => {
				const author = authorList.find((author) => author.id === a);
				if (author) {
					res.push(author);
				}
			});
		}

		return res;
	};

	const [courseAuthors, setCourseAuthors] =
		useState<AuthorType[]>(getCourseAuthors());

	const [formErrors, setFormErrors] = useState<ErrorObject>();
	const [authorError, setAuthorError] = useState<FieldErrors>();

	const handleSubmit: FormEventHandler = (e): void => {
		e.preventDefault();
		const errors: ErrorObject | false = validateForm(
			{
				input: title,
				fieldName: 'title',
				validators: [fieldRequired],
			},
			{
				input: description,
				fieldName: 'description',
				validators: [fieldRequired],
			},
			{
				input: duration,
				fieldName: 'duration',
				validators: [fieldRequired],
			}
		);

		if (errors) {
			setFormErrors(errors);
		} else {
			const newCourse: AddCourseType = {
				id: uuidv4(),
				title: title.trim(),
				description: description.trim(),
				duration: Number(duration),
				authors: courseAuthors.map((author) => author.id),
			};
			if (!courseToUpdate) {
				dispatch(addCourseThunk(newCourse));
			} else {
				const updatedCourse = {
					...newCourse,
					creationDate: courseToUpdate.creationDate,
					id: courseToUpdate.id,
				};
				dispatch(updateCourseThunk(updatedCourse));
			}
			setTitle('');
			setDescription('');
			setDuration('');
			setAuthor('');
			setCourseAuthors([]);
		}
	};

	const onCreateAuthorClick = () => {
		const errors = validateField(author.trim(), [minLength(2)]);

		if (errors) {
			setAuthorError(errors);
		} else {
			const newAuthor: AuthorType = {
				id: uuidv4(),
				name: author.trim(),
			};

			dispatch(addAuthorThunk(newAuthor));
			setAuthor('');
			setAuthorError(undefined);
		}
	};

	const onAddCourseAuthorClick = (id: string): void => {
		const newAddedAuthor = authorList.find((author) => author.id === id)!;
		const newCourseAuthors = [...courseAuthors, newAddedAuthor];
		setCourseAuthors(newCourseAuthors);
	};

	const onDeleteCourseAuthorClick = (id: string): void => {
		const newCourseAuthors = courseAuthors.filter(
			(author) => author.id !== id
		)!;
		setCourseAuthors(newCourseAuthors);
	};

	return (
		<div className='container-sm py-5'>
			<h3 className='open-sans mb-5'>
				{courseToUpdate ? 'Edit Course' : 'Add New Course'}
			</h3>
			<div className='d-flex flex-column bg-white p-5 reg-form-width reg-form-border col-12'>
				<div className=''>
					<form
						className='flex-column bg-white gap-4'
						id='createCourseForm'
						onSubmit={handleSubmit}
					>
						<p className='fw-bold fs-5'>Main Info</p>

						<Input
							id='title'
							label='Title'
							valid={!formErrors?.title}
							value={title}
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								setTitle(e.target.value);
							}}
						/>
						{formErrors?.title && (
							<div className='col-12'>
								<ValidationErrorMessage
									field='Title'
									fieldErrors={formErrors?.title}
								/>
							</div>
						)}

						<label htmlFor='description' className='form-label fw-bold'>
							Description
						</label>
						<textarea
							id='description'
							placeholder='Input text'
							rows={6}
							className={`input-group-text resize-none h-100 text-start w-100 textarea-wrap ${!formErrors?.description ? '' : 'border-danger'}`}
							value={description}
							onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
								setDescription(e.target.value);
							}}
						/>
						{formErrors?.description && (
							<ValidationErrorMessage
								field='Description'
								fieldErrors={formErrors?.description}
							/>
						)}

						<p className='fw-bold fs-5 mt-3'>Duration</p>
						<div className='col-10'>
							<div className='d-flex flex-wrap justify-content-start align-items-center'>
								<label htmlFor='duration' className='form-label fw-bold'>
									Duration
								</label>
								<div className='break'></div>
								<div className='col-6'>
									<Input
										id='duration'
										valid={!formErrors?.duration}
										value={duration}
										type='text'
										onChange={(e: ChangeEvent<HTMLInputElement>) => {
											if (
												/^[1-9]\d*$/.test(e.target.value) ||
												e.target.value === ''
											) {
												setDuration(e.target.value);
											}
										}}
									/>
								</div>
								<div className='fw-bold ms-2'>
									{'Duration: '}
									<span className='fw-normal'>
										{getCourseDuration(Number(duration))}
									</span>
								</div>
							</div>
							{formErrors?.duration && (
								<ValidationErrorMessage
									field='Duration'
									fieldErrors={formErrors?.duration}
								/>
							)}
						</div>

						<div className='row'>
							<div className='col-10'>
								<p className='fw-bold fs-5 mt-3'>Authors</p>
								<label htmlFor='author' className='form-label fw-bold'>
									Author
								</label>
								<div className='row'>
									<div className='col-6'>
										<Input
											id='author'
											valid={!authorError}
											value={author}
											onChange={(e: ChangeEvent<HTMLInputElement>) => {
												setAuthor(e.target.value.trimStart());
											}}
										/>
									</div>
									<div className='col-3'>
										<Button
											text='Create Author'
											onClick={onCreateAuthorClick}
										/>
									</div>
								</div>
								{authorError && (
									<ValidationErrorMessage
										field='Author'
										fieldErrors={authorError}
									/>
								)}
							</div>
							<div className='col-2 mt-3 text-center d-flex flex-column align-items-center'>
								<p className='fw-bold fs-5'>Course Authors</p>
								{courseAuthors.length === 0 && (
									<span>Author list is empty</span>
								)}
								<div className='w-auto'>
									{courseAuthors.length > 0 &&
										courseAuthors.map((author) => (
											<AuthorItem
												key={author.id}
												name={author.name}
												id={author.id}
												onDeleteClick={onDeleteCourseAuthorClick}
											/>
										))}
								</div>
							</div>
						</div>
						<div className='row'>
							<p className='fw-bold fs-5 mt-3'>Authors List</p>
							{authorList.length === 0 && <span>Author list is empty</span>}
							<div className='w-auto'>
								{authorList.length > 0 &&
									authorList.map((author) => {
										return (
											<AuthorItem
												key={author.id}
												name={author.name}
												id={author.id}
												isAddDisabled={courseAuthors.some(
													(a) => a.id === author.id
												)}
												onAddClick={onAddCourseAuthorClick}
											/>
										);
									})}
							</div>
						</div>
					</form>
				</div>
			</div>
			<div className='mt-3 d-flex justify-content-end gap-3 button-width'>
				<Button text='Cancel' />
				<Button
					text={courseToUpdate ? 'Update Course' : 'Create Course'}
					type='submit'
					form='createCourseForm'
				/>
			</div>
		</div>
	);
};

export default CreateCourse;

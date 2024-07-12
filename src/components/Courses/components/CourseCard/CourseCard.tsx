import Button from '../../../../common/Button/Button';
import { formatCreationDate } from '../../../../helpers/formatCreationDate';
import { getAuthorNames } from '../../../../helpers/getAuthorNames';
import { getCourseDuration } from '../../../../helpers/getCourseDuration';
import { CourseCardProps } from './CourseCard.types';
import './CourseCard.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store';
import { getAuthors, getUser } from '../../../../store/selectors';
import { deleteCourseThunk } from '../../../../store/courses/thunk';

const CourseCard = (props: CourseCardProps) => {
	const { id, title, description, authors, duration, creationDate } = props;
	const authorsList = useSelector(getAuthors);
	const dispatch = useDispatch<AppDispatch>();

	const user = useSelector(getUser);
	const isUserAdmin = user.role === 'admin';

	const onDeleteClick = (id: string): void => {
		dispatch(deleteCourseThunk(id));
	};

	return (
		<div className='w-100 row bg-body p-3 border-start border-5 border-black rounded-1 card-shadow my-3'>
			<h4 className='fw-bold'>{title}</h4>
			<div className='col-8'>
				<p className=' small'>{description}</p>
			</div>
			<div className='col-4'>
				<ul className='list-group'>
					<li className='list-group'>
						<span>
							<span className='fw-bold'>Authors: </span>
							{getAuthorNames(authors, authorsList)}
						</span>
					</li>
					<li className='list-group'>
						<span>
							<span className='fw-bold'>Duration: </span>
							{getCourseDuration(duration)}
						</span>
					</li>
					<li className='list-group'>
						<span>
							<span className='fw-bold'>Created: </span>
							{formatCreationDate(creationDate)}
						</span>
					</li>
				</ul>
				<div className='d-flex justify-content-between mt-4 gap-2'>
					<Link to={`/courses/${id}`}>
						<Button text='Show course' />
					</Link>
					{isUserAdmin && (
						<>
							<Button
								text={
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='16'
										height='16'
										fill='currentColor'
										className='bi bi-trash3'
										viewBox='0 0 16 16'
									>
										<path d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5' />
									</svg>
								}
								onClick={() => onDeleteClick(id)}
							/>
							<Link to={`/courses/update/${id}`}>
								<Button
									text={
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='16'
											height='16'
											fill='currentColor'
											className='bi bi-pencil'
											viewBox='0 0 16 16'
										>
											<path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325' />
										</svg>
									}
								/>
							</Link>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default CourseCard;

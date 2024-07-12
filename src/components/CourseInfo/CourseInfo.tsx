import Button from '../../common/Button/Button';
import { formatCreationDate } from '../../helpers/formatCreationDate';
import { getAuthorNames } from '../../helpers/getAuthorNames';
import { getCourseDuration } from '../../helpers/getCourseDuration';
import './CourseInfo.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCourseById } from '../../helpers/getCourseById';
import { useSelector } from 'react-redux';
import { getAuthors, getCourses } from '../../store/selectors';

export const CourseInfo = () => {
	const params = useParams();
	const navigate = useNavigate();

	const courses = useSelector(getCourses);
	const authors = useSelector(getAuthors);

	const courseId = params.courseId;

	const courseToShow = courseId ? getCourseById(courseId, courses) : null;

	if (courseToShow) {
		return (
			<div className='container-sm py-5'>
				<div className='d-flex flex-column px-5'>
					<h3>{courseToShow.title}</h3>
					<div className='bg-white border border-2 rounded-1 p-5 my-3 row d-flex justify-content-center'>
						<div className='col-7 courseinfo-border-divider'>
							<p className=' fw-bold'>Description:</p>
							<p>{courseToShow.description}</p>
						</div>
						<div className='col-5 d-flex'>
							<ul className='list-group borderless fw-bold'>
								<li className='list-group-item'>ID:</li>
								<li className='list-group-item'>Duration:</li>
								<li className='list-group-item'>Created:</li>
								<li className='list-group-item'>Authors:</li>
							</ul>
							<ul className='list-group borderless'>
								<li className='list-group-item'>{courseToShow.id}</li>
								<li className='list-group-item'>
									{getCourseDuration(courseToShow.duration)}
								</li>
								<li className='list-group-item'>
									{formatCreationDate(courseToShow.creationDate)}
								</li>
								<li className='list-group-item'>
									{getAuthorNames(courseToShow.authors, authors)}
								</li>
							</ul>
						</div>
					</div>
					<div className='text-end'>
						<Link to='/courses'>
							<Button text='Back' />
						</Link>
					</div>
				</div>
			</div>
		);
	} else {
		navigate('/courses');
		return <></>;
	}
};

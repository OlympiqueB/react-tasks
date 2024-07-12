import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import './Courses.css';
import { useSelector } from 'react-redux';
import EmptyCourseList from '../EmptyCourseList/EmptyCourseList';
import { getCourses } from '../../store/selectors';

const Courses = () => {
	const courses = useSelector(getCourses);

	return courses.length > 0 ? (
		<div className='container-sm py-5'>
			<div className='d-flex flex-column justify-content-center align-items-center px-5'>
				<div className='d-flex w-100'>
					<div className='col-6'>
						<SearchBar />
					</div>
					<div className='col-6 text-end'>
						<Link to='/courses/add'>
							<Button text='Add new course' />
						</Link>
					</div>
				</div>
				<div className='d-flex flex-column justify-content-center align-items-center mt-4 w-100'>
					{courses.map((card) => {
						return <CourseCard key={card.id} {...card} />;
					})}
				</div>
			</div>
		</div>
	) : (
		<EmptyCourseList />
	);
};

export default Courses;

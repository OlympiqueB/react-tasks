import { useSelector } from 'react-redux';
import Button from '../../common/Button/Button';
import './EmptyCourseList.css';
import { getUser } from '../../store/selectors';
import { useNavigate } from 'react-router-dom';

const EmptyCourseList = () => {
	const user = useSelector(getUser);
	const navigate = useNavigate();

	const isUserAdmin = user.role === 'admin';

	const onAddNewCourseClick = () => {
		if (isUserAdmin) {
			navigate('/courses/add');
		}
	};

	return (
		<div className='main'>
			<div className='content'>
				<h3>Your List is Empty</h3>
				{isUserAdmin ? (
					<>
						<p>Please use ’Add New Course’ button to add your first course</p>
						<Button text='Add new course' onClick={onAddNewCourseClick} />
					</>
				) : (
					<p>
						You don't have permissions to create a course. Please log in as
						admin.
					</p>
				)}
			</div>
		</div>
	);
};

export default EmptyCourseList;

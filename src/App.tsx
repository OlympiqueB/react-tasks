import './App.css';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import { useEffect } from 'react';
import { CourseInfo } from './components/CourseInfo/CourseInfo';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CreateCourse from './components/CreateCourse/CreateCourse';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import { fetchUserThunk } from './store/user/thunk';
import { fetchAuthorsThunk } from './store/authors/thunk';
import { fetchCoursesThunk } from './store/courses/thunk';
import PrivateRoute from './common/PrivateRoute/PrivateRoute';

function App() {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('userToken');
		if (token) {
			dispatch(fetchUserThunk());
			navigate('/courses');
		} else {
			navigate('/login');
		}
		dispatch(fetchAuthorsThunk());
		dispatch(fetchCoursesThunk());
	}, []);

	return (
		<div className='d-flex flex-column min-vh-100'>
			<Header />
			<div className='bg-grey main-min-height'>
				<Routes>
					<Route path='/courses' element={<Courses />}></Route>
					<Route path='/courses/:courseId' element={<CourseInfo />}></Route>
					<Route path='/registration' element={<Registration />}></Route>
					<Route path='/login' element={<Login />}></Route>
					<Route
						path='/courses/add'
						element={
							<PrivateRoute>
								<CreateCourse />
							</PrivateRoute>
						}
					></Route>
					<Route
						path='/courses/update/:courseId'
						element={
							<PrivateRoute>
								<CreateCourse />
							</PrivateRoute>
						}
					></Route>
				</Routes>
			</div>
		</div>
	);
}

export default App;

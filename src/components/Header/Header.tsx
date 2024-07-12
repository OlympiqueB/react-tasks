import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { getUser } from '../../store/selectors';
import { userLogoutThunk } from '../../store/user/thunk';

const Header = () => {
	const location = useLocation();
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const user = useSelector(getUser);

	const showLogout =
		location.pathname !== '/login' && location.pathname !== '/registration';

	const onLogoutClick = () => {
		dispatch(userLogoutThunk());
		navigate('/login');
	};

	return (
		<header className='d-flex justify-content-between align-items-center p-4 border-top border-bottom border-2 border-dark-subtle header-height header-shadow'>
			<Link to='/courses'>
				<Logo />
			</Link>
			<div className='d-flex justify-content-center align-items-center'>
				{user.isAuth && showLogout && <p className='m-0 mx-3'>{user.name}</p>}
				{user.isAuth && showLogout && (
					<Button text='Logout' onClick={onLogoutClick} />
				)}
				{!user.isAuth && showLogout && (
					<Link to='/login'>
						<Button text='Login' />
					</Link>
				)}
			</div>
		</header>
	);
};

export default Header;

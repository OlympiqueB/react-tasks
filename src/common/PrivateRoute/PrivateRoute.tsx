import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUser } from '../../store/selectors';
import { PrivateRouteProps } from './PrivateRoute.types';

const PrivateRoute = ({ children }: PrivateRouteProps) => {
	const user = useSelector(getUser);
	return user.role === 'admin' ? <>{children}</> : <Navigate to='/courses' />;
};

export default PrivateRoute;

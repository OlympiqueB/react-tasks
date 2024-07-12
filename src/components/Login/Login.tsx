import { ChangeEvent, FormEventHandler, useState } from 'react';
import {
	ErrorObject,
	fieldRequired,
	validateEmail,
	validateForm,
} from '../../helpers/validators';
import Input from '../../common/Input/Input';
import ValidationErrorMessage from '../../common/ValidationErrorMessage/ValidationErrorMessage';
import Button from '../../common/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { LoginDataType } from '../../servicesTypes';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { userLoginThunk } from '../../store/user/thunk';

const Login = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [formErrors, setFormErrors] = useState<ErrorObject>();

	const handleSubmit: FormEventHandler = async (e) => {
		e.preventDefault();

		const errors: ErrorObject | false = validateForm(
			{
				input: email,
				fieldName: 'email',
				validators: [fieldRequired, validateEmail],
			},
			{
				input: password,
				fieldName: 'password',
				validators: [fieldRequired],
			}
		);

		if (errors) {
			setFormErrors(errors);
		} else {
			const loginData: LoginDataType = {
				email: email,
				password: password,
			};

			dispatch(userLoginThunk(loginData, navigate));
		}
	};

	return (
		<div className='d-flex flex-column align-items-center py-5'>
			<h3 className='open-sans mb-5'>Login</h3>
			<div className='d-flex flex-column align-items-center bg-white py-5 reg-form-width reg-form-border'>
				<div className='w-50'>
					<form className='flex-column bg-white gap-4' onSubmit={handleSubmit}>
						<Input
							id='email'
							label='Email'
							valid={!formErrors?.email}
							value={email}
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								setEmail(e.target.value.trim());
							}}
						/>
						{formErrors?.email && (
							<ValidationErrorMessage
								field='Email'
								fieldErrors={formErrors.email}
							/>
						)}
						<Input
							id='password'
							label='Password'
							type='password'
							valid={!formErrors?.password}
							value={password}
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								setPassword(e.target.value);
							}}
						/>
						{formErrors?.password && (
							<ValidationErrorMessage
								field='Password'
								fieldErrors={formErrors.password}
							/>
						)}
						<div className='mt-3 w-100 h-100 btn-w-100'>
							<Button text='Login' onClick={() => {}} type='submit' />
						</div>
					</form>
					<p className='mt-4 text-center'>
						If you don't have an account, you may{' '}
						<Link to='/registration' className='link fw-bold'>
							Create an account
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};
export default Login;

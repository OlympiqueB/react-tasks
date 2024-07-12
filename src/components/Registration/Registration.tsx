import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import './Registration.css';
import ValidationErrorMessage from '../../common/ValidationErrorMessage/ValidationErrorMessage';
import { ChangeEvent, FormEventHandler, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	ErrorObject,
	fieldRequired,
	minLength,
	validateEmail,
	// validateEmail,
	validateForm,
} from '../../helpers/validators';
import { registerNewUser } from '../../services';
import { RegistrationUserType } from '../../servicesTypes';

const Registration = () => {
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [formErrors, setFormErrors] = useState<ErrorObject>();

	const handleSubmit: FormEventHandler = async (e) => {
		e.preventDefault();
		const errors: ErrorObject | false = validateForm(
			{
				input: name,
				fieldName: 'name',
				validators: [fieldRequired],
			},
			{
				input: email,
				fieldName: 'email',
				validators: [fieldRequired, validateEmail],
			},
			{
				input: password,
				fieldName: 'password',
				validators: [fieldRequired, minLength(6)],
			}
		);

		if (errors) {
			setFormErrors(errors);
		} else {
			const newUser: RegistrationUserType = {
				name: name,
				email: email,
				password: password,
			};

			const registrationReply = await registerNewUser(newUser);

			if (registrationReply.successful) {
				navigate('/login');
			} else {
				console.log(registrationReply);
			}
		}
	};

	return (
		<div className='d-flex flex-column align-items-center py-5'>
			<h3 className='open-sans mb-5'>Registration</h3>
			<div className='d-flex flex-column align-items-center bg-white py-5 reg-form-width reg-form-border'>
				<form
					className='flex-column bg-white w-50 gap-4'
					onSubmit={handleSubmit}
				>
					<Input
						id='name'
						label='Name'
						valid={!formErrors?.name}
						value={name}
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							setName(e.target.value.trimStart());
						}}
					/>
					{formErrors?.name && (
						<ValidationErrorMessage
							field='Name'
							fieldErrors={formErrors.name}
						/>
					)}
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
							fieldErrors={formErrors?.password}
						/>
					)}
					<div className='mt-3 w-100 h-100 btn-w-100'>
						<Button text='Sign up' onClick={() => {}} type='submit' />
					</div>
				</form>
				<p className='mt-4'>
					If you have an account you may{' '}
					<Link to='/login' className='link fw-bold'>
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Registration;

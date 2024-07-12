import { MinLengthError } from '../../helpers/validators';
import { ValidationErrorMessageProps } from './ValidationErrorMessage.types';

const ValidationErrorMessage = ({
	field,
	fieldErrors,
}: ValidationErrorMessageProps) => {
	const errorMessages: string[] = [];

	if (fieldErrors.fieldRequired === false) {
		errorMessages.push(`${field} is required`);
	} else {
		for (const [key, value] of Object.entries(fieldErrors)) {
			switch (key) {
				case 'minLength':
					errorMessages.push(
						`${field} needs to be at least ${(value as MinLengthError).value} characters`
					);
					break;
				case 'validateEmail':
					errorMessages.push('Invalid email address');
			}
		}
	}

	return (
		<>
			{errorMessages.map((error, i) => {
				return (
					<div key={i}>
						<small className='text-danger'>{error}</small>
					</div>
				);
			})}
		</>
	);
};

export default ValidationErrorMessage;

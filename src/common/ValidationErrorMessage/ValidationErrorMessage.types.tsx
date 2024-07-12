import { FieldErrors } from '../../helpers/validators';

export interface ValidationErrorMessageProps {
	field: string;
	fieldErrors: FieldErrors;
}

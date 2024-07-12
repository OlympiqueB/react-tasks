export interface ErrorObject {
	[field: string]: FieldErrors;
}

export interface FieldErrors {
	[field: string]: boolean | MinLengthError;
}

export type MinLengthError = {
	minLength: boolean;
	value: number;
};

type ValidatorFunction = (
	input: string,
	...args: (string | number)[]
) => boolean | MinLengthError;

interface ValidateFormArg {
	input: string;
	fieldName: string;
	validators: ValidatorFunction[];
}

const runValidators = (input: string, validators: ValidatorFunction[]) => {
	const errors: FieldErrors = {};
	validators.forEach((validatorFn) => {
		const isValid = validatorFn(input);
		if (!isValid || typeof isValid !== 'boolean') {
			errors[validatorFn.name] = isValid;
		}
	});
	return Object.keys(errors).length ? errors : null;
};

export const validateField = (
	input: string,
	validators: ValidatorFunction[]
): FieldErrors | null => {
	const errors = runValidators(input, validators);
	return errors;
};

export const validateForm = (
	...args: ValidateFormArg[]
): ErrorObject | false => {
	const errors: ErrorObject = {};

	args.forEach((arg) => {
		const inputErrors: FieldErrors | null = validateField(
			arg.input,
			arg.validators
		);

		if (inputErrors) {
			errors[arg.fieldName] = inputErrors;
		}
	});
	return Object.keys(errors).length ? errors : false;
};

// validator functions

export const validateEmail = (input: string): boolean => {
	return /^[A-Za-z0-9. _%-]+@[A-Za-z0-9. -]+\.[A-Za-z]{2,4}$/.test(input);
};

export const minLength = (length: number) => {
	const validator = (input: string): boolean | MinLengthError => {
		return input.length >= length
			? true
			: ({
					minLength: input.length >= length,
					value: length,
				} as MinLengthError);
	};
	Object.defineProperty(validator, 'name', { value: 'minLength' });
	return validator;
};

export const fieldRequired = (input: string): boolean => {
	return input.length > 0;
};

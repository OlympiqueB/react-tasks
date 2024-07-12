import { ChangeEvent } from 'react';

export interface InputProps {
	id: string;
	value?: string;
	type?: string;
	label?: string;
	valid?: boolean;
	onChange(e: ChangeEvent<HTMLInputElement>): void;
	placeholder?: string;
}

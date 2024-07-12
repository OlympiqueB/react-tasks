import { ReactNode } from 'react';

export interface ButtonProps {
	text: ReactNode;
	onClick?(): void;
	type?: 'submit' | 'reset' | 'button' | undefined;
	form?: string;
}

import { ButtonProps } from './Button.types';
import './Button.css';

const Button = ({ text, onClick, type = 'button', form }: ButtonProps) => {
	return (
		<button
			className='default-btn text-white open-sans'
			onClick={onClick}
			type={type}
			form={form}
		>
			{typeof text === 'string' ? text.toLocaleUpperCase() : text}
		</button>
	);
};

export default Button;

import { InputProps } from './Input.types';

const Input = ({
	id,
	label,
	valid = true,
	value,
	type = 'text',
	onChange,
	placeholder = 'Input text',
}: InputProps) => {
	return (
		<div className='h-100'>
			{/* only show label if labelText is not empty */}
			{label && (
				<label htmlFor={id} className='form-label fw-bold'>
					{label}
				</label>
			)}
			<input
				type={type}
				id={id}
				value={value}
				placeholder={placeholder}
				className={`input-group-text h-100 text-start w-100 ${valid ? '' : 'border-danger'}`}
				onChange={onChange}
			/>
		</div>
	);
};

export default Input;

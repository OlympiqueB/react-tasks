import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';
import './SearchBar.css';

const SearchBar = () => {
	return (
		<div className='d-flex gap-3'>
			<div className='input-width'>
				<Input id='search' onChange={() => {}} />
			</div>
			<div className=''>
				<Button text='Search' onClick={() => {}} />
			</div>
		</div>
	);
};

export default SearchBar;

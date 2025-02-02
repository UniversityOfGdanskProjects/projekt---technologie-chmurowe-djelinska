import { PiMagnifyingGlassThin, PiXThin } from 'react-icons/pi';

import { useSearch } from '../context/SearchContext';
import { useState } from 'react';

const SearchBar = () => {
	const { searchParams, setSearch } = useSearch();
	const [searchInput, setSearchInput] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (searchInput !== searchParams.query) {
			setSearch({ query: searchInput });
		}
	};

	const handleReset = () => {
		setSearchInput('');
	};

	return (
		<div className='flex items-center gap-4 py-2 border-b border-primary-black'>
			<PiMagnifyingGlassThin />
			<form
				onSubmit={handleSubmit}
				className='flex items-center gap-4 justify-between flex-1'
			>
				<input
					name='query'
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
					placeholder='Search products'
					className='bg-transparent border-none w-full focus:outline-none focus:ring-0 p-0'
				/>
				<div className='flex items-center gap-4'>
					{searchInput && (
						<button type='button' onClick={handleReset}>
							<PiXThin />
						</button>
					)}
					<button
						type='submit'
						disabled={searchInput.trim() == ''}
						className='button bg-primary-black text-primary-gray py-2 px-4'
					>
						Search
					</button>
				</div>
			</form>
		</div>
	);
};

export default SearchBar;

import { useEffect, useState } from 'react';

import { useSearch } from '../context/SearchContext';

const SearchSortBy = () => {
	const { searchParams, setSortOption, resetSearch } = useSearch();
	const [sort, setSort] = useState(
		`${searchParams.sortBy}-${searchParams.sortOrder}`
	);

	const handleSortChange = (option) => {
		setSort(option);

		const sortBy = option.split('-')[0];
		const sortOrder = option.split('-')[1];

		setSortOption({ sortBy, sortOrder });
	};

	useEffect(() => {
		setSort('price-asc');
		resetSearch();
	}, [searchParams.query]);

	return (
		<select
			name='sortBy'
			value={sort}
			onChange={(e) => handleSortChange(e.target.value)}
			className='uppercase text-sm bg-transparent border outline-none focus:border-transparent focus:ring-1 focus:ring-accent-green'
		>
			<option value='price-asc'>Price: Low to High</option>
			<option value='price-desc'>Price: High to Low</option>
		</select>
	);
};

export default SearchSortBy;

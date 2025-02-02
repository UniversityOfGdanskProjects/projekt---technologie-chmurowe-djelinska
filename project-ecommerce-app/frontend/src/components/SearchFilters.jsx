import { useEffect, useState } from 'react';

import { productCategories } from '../config/product-category-config';
import { useSearch } from '../context/SearchContext';

const SearchFilters = () => {
	const { searchParams, setFilters, resetSearch } = useSearch();
	const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedMinPrice, setSelectedMinPrice] = useState('');
	const [selectedMaxPrice, setSelectedMaxPrice] = useState('');

	const handleFilterSubmit = () => {
		setFilters({
			category: selectedCategory,
			minPrice: selectedMinPrice,
			maxPrice: selectedMaxPrice,
		});
	};

	const handleFiltersReset = () => {
		setSelectedCategory('');
		setSelectedMinPrice('');
		setSelectedMaxPrice('');
		resetSearch();
	};

	useEffect(() => {
		handleFiltersReset();
	}, [searchParams.query]);

	return (
		<div>
			<div className='tracking-wider text-2xl mb-6'>Filter</div>
			<div className='uppercase text-sm pb-2 mb-2 tracking-wide border-b border-b-primary-gray'>
				Category
			</div>
			{productCategories.map((category) => (
				<div
					key={category}
					onClick={() => setSelectedCategory(category)}
					className={
						category == selectedCategory
							? 'bg-accent-green text-primary-white p-1 cursor-pointer'
							: 'p-1 cursor-pointer'
					}
				>
					{category}
				</div>
			))}
			<div className='uppercase text-sm pb-2 mt-6 mb-2 tracking-wide border-b border-b-primary-gray'>
				Price
			</div>
			<div className='mt-4 flex flex-col gap-1'>
				<label className='text-sm'>Min Price</label>
				<input
					type='number'
					name='minPrice'
					value={selectedMinPrice}
					onChange={(e) => setSelectedMinPrice(e.target.value)}
					className='max-w-20 bg-transparent border outline-none focus:border-transparent focus:ring-1 focus:ring-accent-green'
				/>
			</div>
			<div className='mt-3 mb-6 flex flex-col gap-1'>
				<label className='text-sm'>Max Price</label>
				<input
					type='number'
					name='maxPrice'
					value={selectedMaxPrice}
					onChange={(e) => setSelectedMaxPrice(e.target.value)}
					className='max-w-20 bg-transparent border outline-none focus:border-transparent focus:ring-1 focus:ring-accent-green'
				/>
			</div>
			<div className='border-t border-t-primary-gray pt-4'>
				<button
					onClick={handleFilterSubmit}
					className='mb-2 button bg-primary-black text-primary-gray p-2 w-full'
				>
					Apply filters
				</button>
				<button
					onClick={handleFiltersReset}
					className='button border border-primary-black text-primary-black p-2 w-full'
				>
					Reset
				</button>
			</div>
		</div>
	);
};

export default SearchFilters;

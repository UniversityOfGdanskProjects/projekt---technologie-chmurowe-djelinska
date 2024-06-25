import LoadingMessage from '../components/LoadingMessage';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import SearchFilters from '../components/SearchFilters';
import SearchResultCard from '../components/SearchResultCard'; // Correct import
import SearchSortBy from '../components/SearchSortBy';
import { useEffect } from 'react';
import { useSearch } from '../context/SearchContext';
import { useSearchProducts } from '../api/ProductsApi';

const SearchPage = () => {
	const { searchParams, setSearch, setPage } = useSearch();
	const { results, isLoading } = useSearchProducts(searchParams);

	useEffect(() => {
		setSearch();
	}, []);

	return (
		<div className='grid grid-cols-[1fr_2fr] gap-6'>
			<SearchFilters />
			<div id='main-content' className='flex flex-col gap-6'>
				<SearchBar />
				{isLoading || !results ? (
					<LoadingMessage />
				) : (
					<>
						<div className='flex justify-between items-center'>
							<p className='uppercase'>
								{results.pagination.total} products found
							</p>
							<SearchSortBy />
						</div>
						<div className='grid grid-cols-2 gap-6'>
							{results.data.map((product) => (
								<SearchResultCard key={product._id} product={product} />
							))}
						</div>
						<Pagination
							page={results.pagination.page}
							pages={results.pagination.pages}
							onPageChange={setPage}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default SearchPage;

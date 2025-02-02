import { createContext, useContext, useReducer } from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

const searchReducer = (state, action) => {
	switch (action.type) {
		case 'RESET_SEARCH':
			return {
				query: state.query ? state.query : '',
				sortBy: state.sortBy,
				sortOrder: state.sortOrder,
				page: 1,
			};
		case 'SET_SEARCH':
			return {
				sortBy: 'price',
				sortOrder: 'asc',
				page: 1,
				...action.query,
			};
		case 'SET_FILTERS':
			return {
				...state,
				page: 1,
				...action.filters,
			};
		case 'SET_SORT_OPTION':
			return {
				...state,
				page: 1,
				...action.sortOption,
			};
		case 'SET_PAGE':
			return {
				...state,
				page: action.page,
			};
		default:
			return state;
	}
};

export const SearchProvider = ({ children }) => {
	const [state, dispatch] = useReducer(searchReducer, {
		sortBy: 'price',
		sortOrder: 'asc',
		page: 1,
	});

	function resetSearch() {
		dispatch({ type: 'RESET_SEARCH' });
	}

	function setSearch(query) {
		dispatch({ type: 'SET_SEARCH', query: query });
	}

	function setFilters(filters) {
		dispatch({ type: 'SET_FILTERS', filters: filters });
	}

	function setSortOption(sortOption) {
		dispatch({ type: 'SET_SORT_OPTION', sortOption });
	}

	function setPage(page) {
		dispatch({ type: 'SET_PAGE', page: page });
	}

	return (
		<SearchContext.Provider
			value={{
				searchParams: state,
				resetSearch,
				setSearch,
				setFilters,
				setSortOption,
				setPage,
			}}
		>
			{children}
		</SearchContext.Provider>
	);
};

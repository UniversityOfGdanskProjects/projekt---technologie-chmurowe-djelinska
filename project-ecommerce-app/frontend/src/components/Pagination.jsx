const Pagination = ({ page, pages, onPageChange }) => {
	return (
		<div className='w-full flex justify-center gap-6'>
			{Array.from({ length: pages }, (_, index) => (
				<button
					key={index}
					onClick={() => onPageChange(index + 1)}
					className={page == index + 1 ? 'border-b' : 'border-b-0'}
				>
					{index + 1}
				</button>
			))}
		</div>
	);
};

export default Pagination;

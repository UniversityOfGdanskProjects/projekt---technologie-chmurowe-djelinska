import { Link } from 'react-router-dom';

const SearchResultCard = ({ product }) => {
	return (
		<div>
			<div className='bg-secondary-white w-full h-96'>
				<img
					src={product.imageUrl}
					className='w-full h-full object-cover'
					alt={product.name}
				/>
			</div>
			<div className='flex flex-col gap-1 py-4'>
				<span className='uppercase text-sm'>
					&#x2022; {product.category} &#x2022;
				</span>
				<Link
					to={`/detail/${product._id}`}
					className='font-medium hover:underline'
				>
					{product.name}
				</Link>
				<span className='text-nowrap text-right'>${product.price} USD</span>
			</div>
		</div>
	);
};

export default SearchResultCard;

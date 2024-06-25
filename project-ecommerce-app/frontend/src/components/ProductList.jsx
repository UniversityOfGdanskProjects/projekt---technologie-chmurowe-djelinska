import LoadingMessage from './LoadingMessage';
import { PiTrashThin } from 'react-icons/pi';

const ProductList = ({ products, onDelete, isGetLoading, isDeleteLoading }) => {
	if (isGetLoading) {
		return <LoadingMessage />;
	}

	return (
		<>
			<div className='divide-y-2 divide-primary-gray'>
				{products.map((product) => (
					<div key={product._id} className='flex justify-between p-2'>
						<p>{product.name}</p>
						<button
							onClick={() => onDelete(product._id)}
							disabled={isDeleteLoading}
							className='flex items-center gap-1 uppercase text-sm font-medium'
						>
							<PiTrashThin />
							Delete
						</button>
					</div>
				))}
			</div>
		</>
	);
};

export default ProductList;

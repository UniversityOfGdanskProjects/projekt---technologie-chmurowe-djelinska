import { PiMinusThin, PiPlusThin } from 'react-icons/pi';

import LoadingMessage from '../components/LoadingMessage';
import { showSuccessToast } from '../components/Toast';
import { useCart } from '../context/CartContext';
import { useGetProduct } from '../api/ProductsApi';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const DetailPage = () => {
	const { id } = useParams();
	const { product, isLoading } = useGetProduct(id);
	const { addToCart } = useCart();
	const [quantity, setQuantity] = useState(1);

	const handleIncrement = () => {
		if (quantity < parseInt(product.quantityInStock)) {
			setQuantity((prevQuantity) => prevQuantity + 1);
		}
	};

	const handleDecrement = () => {
		if (quantity > 1) {
			setQuantity((prevQuantity) => prevQuantity - 1);
		}
	};

	const handleInputChange = (e) => {
		const newQuantity = parseInt(e.target.value);

		if (
			!isNaN(newQuantity) &&
			newQuantity >= 1 &&
			newQuantity <= parseInt(product.quantityInStock)
		) {
			setQuantity(newQuantity);
		}
	};

	const handleAddToCart = () => {
		addToCart(product, quantity);
		showSuccessToast('Product added to bag');
	};

	if (isLoading) {
		return <LoadingMessage />;
	}

	return (
		<div className='grid grid-cols-[1fr_2fr] gap-6'>
			<div className='w-full aspect-square'>
				<img src={product.imageUrl} className='w-full h-full object-cover' />
			</div>
			<div className='flex flex-col justify-center'>
				<span className='uppercase text-sm mt-2'>
					&#x2022; {product.category} &#x2022;
				</span>
				<h3 className='text-2xl tracking-wider py-4 font-medium'>
					{product.name}
				</h3>
				<p>{product.description}</p>
				<div className='flex items-center gap-4 pt-4'>
					Quantity:
					<div className='flex items-center'>
						<button onClick={handleDecrement}>
							<PiMinusThin />
						</button>
						<input
							type='number'
							value={quantity}
							onChange={handleInputChange}
							className='bg-transparent border-none w-16 text-center text-lg focus:ring-0'
						/>
						<button onClick={handleIncrement}>
							<PiPlusThin />
						</button>
					</div>
				</div>
				<div className='flex items-center justify-between'>
					<span className='text-nowrap text-xl'>${product.price} USD</span>
					<button
						onClick={handleAddToCart}
						className='button bg-primary-black text-primary-gray py-4 px-6 mt-4 w-fit'
					>
						Add to Bag
					</button>
				</div>
			</div>
		</div>
	);
};

export default DetailPage;

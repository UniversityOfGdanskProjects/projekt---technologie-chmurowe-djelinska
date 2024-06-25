import { Link } from 'react-router-dom';
import OrderCheckout from '../components/OrderCheckout';
import { PiArrowLeftThin } from 'react-icons/pi';
import { useCart } from '../context/CartContext';

const CartPage = () => {
	const { cart, removeFromCart, cartSummary } = useCart();

	const handleRemoveFromCart = (productId) => {
		removeFromCart(productId);
	};

	return (
		<div>
			<h2 className='tracking-wider text-2xl mb-6'>Shopping Cart</h2>
			{cart.length === 0 ? (
				<p>Your cart is empty</p>
			) : (
				<div className='grid grid-cols-2 gap-6'>
					{cart.map((item) => (
						<div key={item._id} className='border border-primary-gray p-4'>
							<div className='flex justify-between items-center mb-4'>
								<h3 className='font-medium'>{item.name}</h3>
								<button
									onClick={() => handleRemoveFromCart(item._id)}
									className='hover:underline'
								>
									Remove
								</button>
							</div>
							<p className='uppercase text-sm tracking-wide'>
								Quantity:
								<span className='ml-4 text-base'>{item.quantity}</span>
							</p>
							<p className='uppercase text-sm tracking-wide'>
								Price:
								<span className='ml-4 text-base'>
									${item.price * item.quantity} USD
								</span>
							</p>
						</div>
					))}
				</div>
			)}
			{cart.length > 0 && (
				<div className='mt-8'>
					<div>
						<p className='mb-2 font-medium text-lg'>
							Total Items:
							<span className='ml-4 text-lg font-normal'>
								{cartSummary.totalItems}
							</span>
						</p>
						<p className='font-medium text-lg'>
							Total Price:
							<span className='ml-4 text-lg font-normal'>
								${cartSummary.totalPrice.toFixed(2)} USD
							</span>
						</p>
					</div>
					<OrderCheckout />
				</div>
			)}
			<div className='mt-8'>
				<Link
					to='/search'
					className='button hover:underline flex items-center gap-2'
				>
					<PiArrowLeftThin />
					Continue Shopping
				</Link>
			</div>
		</div>
	);
};

export default CartPage;

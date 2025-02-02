import { showErrorToast, showSuccessToast } from './Toast';
import { useGetUser, useUpdateUser } from '../api/UserApi';

import UserProfileForm from '../forms/UserProfileForm';
import { useCart } from '../context/CartContext';
import { useCreateOrder } from '../api/OrdersApi';
import { useNavigate } from 'react-router-dom';

const OrderCheckout = () => {
	const { user } = useGetUser();
	const { updateUser, isLoading: isUpdateLoading } = useUpdateUser();
	const { createOrder, isLoading: isCreateLoading } = useCreateOrder();
	const { cart, clearCart } = useCart();
	const navigate = useNavigate();

	const handlePlaceOrder = async () => {
		const order = {
			items: cart.map((item) => ({
				productId: item._id,
				quantity: item.quantity,
			})),
			totalAmount: cart.reduce(
				(total, item) => total + item.price * item.quantity,
				0
			),
		};

		try {
			await createOrder(order);
			showSuccessToast('Order successfully placed');
			clearCart();
			navigate('/');
		} catch (error) {
			showErrorToast('Failed to place order');
		}
	};

	return (
		<div className='mt-8'>
			<div className='text-2xl tracking-wider mb-6'>Shipping Data</div>
			{user && (
				<UserProfileForm
					onSubmit={updateUser}
					isLoading={isUpdateLoading}
					user={user}
				/>
			)}
			<button
				disabled={isCreateLoading}
				onClick={handlePlaceOrder}
				className='button bg-primary-black text-primary-gray py-4 px-6 mt-8 w-fit'
			>
				Place Order
			</button>
		</div>
	);
};

export default OrderCheckout;

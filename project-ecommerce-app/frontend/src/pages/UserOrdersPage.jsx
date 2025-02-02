import LoadingMessage from '../components/LoadingMessage';
import { useGetUserOrders } from '../api/OrdersApi';

const UserOrdersPage = () => {
	const { orders, isLoading } = useGetUserOrders();

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		return `${day}.${month}.${year}`;
	};

	if (isLoading) {
		return <LoadingMessage />;
	}

	return (
		<div>
			<h2 className='tracking-wider text-2xl mb-2'>My Orders</h2>
			{orders.length === 0 ? (
				<p>You have no orders</p>
			) : (
				<div className='divide-y-2 divide-primary-gray'>
					{orders.map((order) => (
						<div key={order._id} className='py-4 flex flex-col gap-1'>
							<p className='font-medium'>
								<span className='uppercase text-sm tracking-wider mr-4 font-normal'>
									Order Nr
								</span>
								{order._id}
							</p>
							<div className='grid grid-cols-2 font-medium'>
								<p>
									<span className='uppercase text-sm tracking-wider mr-4 font-normal'>
										Date
									</span>
									{formatDate(order.createdAt)}
								</p>
								<p>
									<span className='uppercase text-sm tracking-wider mr-4 font-normal'>
										Total Amount
									</span>
									${order.totalAmount} USD
								</p>
							</div>
							<ul className='mt-2 flex flex-col gap-2'>
								{order.items.map((item) => (
									<li
										key={item.productId._id}
										className='flex items-center gap-4'
									>
										<div className='bg-secondary-white w-20 aspect-square'>
											<img
												src={item.productId.imageUrl}
												className='w-full h-full object-cover'
											/>
										</div>
										<div>
											<p>{item.productId.name}</p>
											<p className='text-sm'>Quantity: {item.quantity}</p>
										</div>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default UserOrdersPage;

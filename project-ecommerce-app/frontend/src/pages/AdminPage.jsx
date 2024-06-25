import {
	useAddProduct,
	useDeleteProduct,
	useGetAllProducts,
} from '../api/ProductsApi';

import ProductForm from '../forms/ProductForm';
import ProductList from '../components/ProductList';
import { useState } from 'react';

const AdminPage = () => {
	const { products, isLoading: isGetLoading } = useGetAllProducts();
	const { deleteProduct, isLoading: isDeleteLoading } = useDeleteProduct();
	const { addProduct, isLoading: isAddLoading } = useAddProduct();

	const [activeBar, setActiveBar] = useState('all');
	const isActive = (bar) =>
		activeBar === bar ? 'border-b-primary-black' : 'border-b-primary-gray';

	return (
		<div>
			<div className='flex mb-6'>
				<button
					onClick={() => setActiveBar('all')}
					className={`text-nowrap text-left border-b text-2xl tracking-wider py-2 pr-6 ${isActive(
						'all'
					)}`}
				>
					All Products
				</button>
				<button
					onClick={() => setActiveBar('add')}
					className={`text-nowrap text-left border-b text-2xl tracking-wider py-2 pr-6 ${isActive(
						'add'
					)}`}
				>
					Add Product
				</button>
			</div>

			{activeBar === 'all' && (
				<ProductList
					products={products}
					onDelete={deleteProduct}
					isGetLoading={isGetLoading}
					isDeleteLoading={isDeleteLoading}
				/>
			)}

			{activeBar === 'add' && (
				<ProductForm onSubmit={addProduct} isLoading={isAddLoading} />
			)}
		</div>
	);
};

export default AdminPage;

import { productCategories } from '../config/product-category-config';
import { useForm } from 'react-hook-form';

const ProductForm = ({ onSubmit, isLoading }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const handleFormSubmit = (data) => {
		onSubmit(data);
		reset();
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(handleFormSubmit)}
				className='flex flex-col gap-4'
			>
				<div className='form-group'>
					<label>Name</label>
					<input
						{...register('name', {
							required: 'This field is required',
						})}
						placeholder='Name'
						className='bg-transparent rounded-sm outline-none focus:border-transparent focus:ring-1 focus:ring-accent-green'
					/>
					{errors.name && (
						<p className='form-error-message'>{errors.name.message}</p>
					)}
				</div>

				<div className='form-group'>
					<label>Description</label>
					<textarea
						{...register('description', {
							required: 'This field is required',
						})}
						placeholder='Description'
						className='bg-transparent rounded-sm outline-none focus:border-transparent focus:ring-1 focus:ring-accent-green'
					></textarea>
					{errors.description && (
						<p className='form-error-message'>{errors.description.message}</p>
					)}
				</div>

				<div className='grid grid-cols-2 gap-4'>
					<div className='form-group'>
						<label>Price</label>
						<input
							type='number'
							min='0'
							{...register('price', {
								required: 'This field is required',
							})}
							className='max-w-24 bg-transparent rounded-sm outline-none focus:border-transparent focus:ring-1 focus:ring-accent-green'
						/>
						{errors.price && (
							<p className='form-error-message'>{errors.price.message}</p>
						)}
					</div>

					<div className='form-group'>
						<label>Quantity</label>
						<input
							type='number'
							min='0'
							{...register('quantityInStock', {
								required: 'This field is required',
							})}
							className='max-w-24 bg-transparent rounded-sm outline-none focus:border-transparent focus:ring-1 focus:ring-accent-green'
						/>
						{errors.quantityInStock && (
							<p className='form-error-message'>
								{errors.quantityInStock.message}
							</p>
						)}
					</div>
				</div>

				<div className='form-group'>
					<label>Category</label>
					<select
						{...register('category', { required: 'This field is required' })}
						className='w-full'
					>
						<option value=''>Select a category</option>
						{productCategories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
					{errors.category && (
						<p className='form-error-message'>{errors.category.message}</p>
					)}
				</div>
				<div className='form-group'>
					<label>Image URL</label>
					<input
						type='url'
						{...register('imageUrl', {
							required: 'This field is required',
						})}
						className='bg-transparent rounded-sm outline-none focus:border-transparent focus:ring-1 focus:ring-accent-green'
					/>
					{errors.imageUrl && (
						<p className='form-error-message'>{errors.imageUrl.message}</p>
					)}
				</div>

				<button
					type='submit'
					disabled={isLoading}
					className='mt-2 button bg-primary-black text-primary-gray py-2 px-4 w-fit'
				>
					{isLoading ? 'Loading...' : 'Add'}
				</button>
			</form>
		</>
	);
};

export default ProductForm;

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const UserProfileForm = ({ onSubmit, isLoading, user }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			email: user?.email || '',
			fullName: user?.fullName || '',
			street: user?.shippingAddress?.street || '',
			city: user?.shippingAddress?.city || '',
			postalCode: user?.shippingAddress?.postalCode || '',
			country: user?.shippingAddress?.country || '',
		},
	});

	useEffect(() => {
		reset({
			email: user?.email || '',
			fullName: user?.fullName || '',
			street: user?.shippingAddress?.street || '',
			city: user?.shippingAddress?.city || '',
			postalCode: user?.shippingAddress?.postalCode || '',
			country: user?.shippingAddress?.country || '',
		});
	}, [reset, user]);

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
				<div className='form-group'>
					<label>Email</label>
					<input
						{...register('email')}
						disabled
						className='text-secondary-gray border-secondary-gray bg-transparent rounded-sm outline-none'
					/>
				</div>

				<div className='form-group'>
					<label>Full Name</label>
					<input
						{...register('fullName')}
						disabled
						className='text-secondary-gray border-secondary-gray bg-transparent rounded-sm outline-none'
					/>
				</div>

				<div className='form-group'>
					<label>Shipping Address:</label>
					<div className='grid grid-cols-2 gap-2'>
						<div className='form-group'>
							<input
								{...register('street', {
									required: 'This field is required',
								})}
								placeholder='Street'
								className='mb-auto bg-transparent rounded-sm outline-none focus:border-transparent focus:ring-1 focus:ring-accent-green'
							/>
							{errors.street && (
								<p className='form-error-message'>{errors.street.message}</p>
							)}
						</div>

						<div className='form-group'>
							<input
								{...register('city', {
									required: 'This field is required',
								})}
								placeholder='City'
								className='mb-auto bg-transparent rounded-sm outline-none focus:border-transparent focus:ring-1 focus:ring-accent-green'
							/>
							{errors.city && (
								<p className='form-error-message'>{errors.city.message}</p>
							)}
						</div>

						<div className='form-group'>
							<input
								{...register('postalCode', {
									required: 'This field is required',
								})}
								placeholder='Postal Code'
								className='mb-auto bg-transparent rounded-sm outline-none focus:border-transparent focus:ring-1 focus:ring-accent-green'
							/>
							{errors.postalCode && (
								<p className='form-error-message'>
									{errors.postalCode.message}
								</p>
							)}
						</div>

						<div className='form-group'>
							<input
								{...register('country', {
									required: 'This field is required',
								})}
								placeholder='Country'
								className='mb-auto bg-transparent rounded-sm outline-none focus:border-transparent focus:ring-1 focus:ring-accent-green'
							/>
							{errors.country && (
								<p className='form-error-message'>{errors.country.message}</p>
							)}
						</div>
					</div>
				</div>

				<button
					type='submit'
					disabled={isLoading}
					className='mt-2 button bg-primary-black text-primary-gray py-2 px-4 w-fit'
				>
					{isLoading ? 'Loading...' : 'Update'}
				</button>
			</form>
		</>
	);
};

export default UserProfileForm;

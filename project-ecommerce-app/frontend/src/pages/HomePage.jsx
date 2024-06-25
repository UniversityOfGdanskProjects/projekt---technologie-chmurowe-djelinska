import { Link } from 'react-router-dom';

const HomePage = () => {
	return (
		<div className='flex gap-6 my-6'>
			<div className='bg-secondary-white w-full aspect-square'>
				<img
					className='w-full h-full object-cover'
					src='https://images.unsplash.com/photo-1613803745799-ba6c10aace85?q=80&w=2437&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
				/>
			</div>
			<div className='flex flex-col justify-center gap-6'>
				<h1 className='serif-text text-4xl'>Naturea Natural Cosmetics</h1>
				<span className='text-xl'>
					Give your skin <strong>fresh</strong> and <strong>natural</strong>{' '}
					look
				</span>
				<p>
					Lorem ipsum dolor sit amet consectetur. Libero quam morbi felis duis
					non dui senectus. Sapien tristique ullamcorper magna amet diam
					condimentum congue.
				</p>
				<Link
					to='/search'
					className='button px-8 py-4 bg-primary-black text-primary-gray w-fit mt-4'
				>
					Shop Now
				</Link>
			</div>
		</div>
	);
};

export default HomePage;

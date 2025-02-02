import { PiShoppingBagThin, PiUserThin } from 'react-icons/pi';

import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useKeycloak } from '@react-keycloak/web';
import { useState } from 'react';

const Navbar = () => {
	const { keycloak } = useKeycloak();
	const isAuthenticated = keycloak.authenticated;
	const isAuthenticatedAdmin =
		keycloak.authenticated && keycloak.hasRealmRole('admin');
	const user = keycloak.tokenParsed;
	const [showDropdown, setShowDropdown] = useState(false);
	const redirectUri = import.meta.env.VITE_KEYCLOAK_REDIRECT_URI;
	const { cartSummary } = useCart();

	const handleLogin = () => {
		keycloak.login({ redirectUri });
	};

	const handleLogout = () => {
		keycloak.logout({ redirectUri });
	};

	return (
		<div className='h-24 border-t-8 border-accent-green'>
			<nav className='container mx-auto flex justify-between items-center py-6 border-b border-primary-gray'>
				<div className='logo text-3xl'>
					<Link to='/'>naturea</Link>
				</div>
				<div className='flex gap-6'>
					<Link to='/' className='uppercase text-sm hover:underline'>
						Home
					</Link>
					<Link to='/search' className='uppercase text-sm hover:underline'>
						Catalog
					</Link>
					{isAuthenticated && (
						<Link
							to='/user-orders'
							className='uppercase text-sm hover:underline'
						>
							My Orders
						</Link>
					)}
					{isAuthenticatedAdmin && (
						<Link
							to='/admin-panel'
							className='uppercase text-sm hover:underline'
						>
							Admin Panel
						</Link>
					)}
				</div>
				<div className='flex gap-6'>
					{isAuthenticated ? (
						<div className='flex items-center gap-4 relative'>
							<button
								onClick={() => setShowDropdown(!showDropdown)}
								className='relative'
							>
								<PiUserThin />
							</button>
							{showDropdown && (
								<div className='absolute top-10 right-10 bg-primary-white p-6 shadow-md'>
									<Link to='/user-profile'>{user.email}</Link>
									<button
										onClick={handleLogout}
										className='button bg-primary-black text-primary-gray p-2 mt-4 w-full'
									>
										Logout
									</button>
								</div>
							)}
							<Link to='/cart' className='flex items-center p-2 gap-2'>
								<PiShoppingBagThin />
								<span className='text-lg'>{cartSummary.totalItems}</span>
							</Link>
						</div>
					) : (
						<button
							onClick={handleLogin}
							className='flex items-center p-2 gap-2'
						>
							<PiUserThin />
							<span className='button'>Log in</span>
						</button>
					)}
				</div>
			</nav>
		</div>
	);
};

export default Navbar;

import { Navigate, Route, Routes } from 'react-router-dom';

import AdminPage from './pages/AdminPage';
import AdminProtectedRoute from './auth/AdminProtectedRoute';
import AuthCallbackPage from './pages/AuthCallbackPage';
import CartPage from './pages/CartPage';
import DetailPage from './pages/DetailPage';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import ProtectedRoute from './auth/ProtectedRoute';
import SearchPage from './pages/SearchPage';
import Toast from './components/Toast';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';

const App = () => {
	return (
		<div className='flex flex-col min-h-screen'>
			<Navbar />
			<div className='container mx-auto flex-1 py-8'>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/search' element={<SearchPage />} />
					<Route path='/detail/:id' element={<DetailPage />} />
					<Route path='/auth-callback' element={<AuthCallbackPage />} />
					<Route
						path='/user-profile'
						element={
							<ProtectedRoute>
								<UserProfilePage />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/user-orders'
						element={
							<ProtectedRoute>
								<UserOrdersPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/cart'
						element={
							<ProtectedRoute>
								<CartPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/admin-panel'
						element={
							<AdminProtectedRoute>
								<AdminPage />
							</AdminProtectedRoute>
						}
					/>
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			</div>
			<Footer />
			<Toast />
		</div>
	);
};

export default App;

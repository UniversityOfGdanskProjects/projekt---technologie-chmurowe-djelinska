import { Navigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

const AdminProtectedRoute = ({ children }) => {
	const { keycloak } = useKeycloak();
	const isAuthenticatedAdmin =
		keycloak.authenticated && keycloak.hasRealmRole('admin');

	return isAuthenticatedAdmin ? children : <Navigate to='/' />;
};

export default AdminProtectedRoute;

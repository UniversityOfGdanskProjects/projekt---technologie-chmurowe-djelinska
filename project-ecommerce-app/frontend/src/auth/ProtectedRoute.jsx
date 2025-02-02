import { Navigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

const ProtectedRoute = ({ children }) => {
	const { keycloak } = useKeycloak();
	const isAuthenticated = keycloak.authenticated;

	return isAuthenticated ? children : <Navigate to='/' />;
};

export default ProtectedRoute;

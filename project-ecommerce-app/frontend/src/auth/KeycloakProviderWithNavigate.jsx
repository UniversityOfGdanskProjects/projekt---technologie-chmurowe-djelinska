import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from '../config/keycloak';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KeycloakProviderWithNavigate = ({ children }) => {
	const navigate = useNavigate();

	useEffect(() => {
		keycloak.onAuthSuccess = () => {
			navigate('/auth-callback');
		};
	}, [navigate]);

	if (!keycloak) {
		throw new Error('Unable to initialize Keycloak');
	}

	return (
		<ReactKeycloakProvider authClient={keycloak}>
			{children}
		</ReactKeycloakProvider>
	);
};

export default KeycloakProviderWithNavigate;

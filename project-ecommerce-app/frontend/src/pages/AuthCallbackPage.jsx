import { useEffect, useRef } from 'react';

import { useCreateUser } from '../api/UserApi';
import { useKeycloak } from '@react-keycloak/web';
import { useNavigate } from 'react-router-dom';

const AuthCallbackPage = () => {
	const { keycloak } = useKeycloak();
	const { createUser } = useCreateUser();
	const navigate = useNavigate();
	const userCreated = useRef(false);

	useEffect(() => {
		if (
			keycloak.authenticated &&
			keycloak.tokenParsed &&
			!userCreated.current
		) {
			createUser({
				keycloakId: keycloak.tokenParsed.sub,
				email: keycloak.tokenParsed.email,
				fullName: keycloak.tokenParsed.name,
			});

			userCreated.current = true;
		}

		navigate('/');
	}, [createUser, navigate, keycloak]);
};

export default AuthCallbackPage;

import { showErrorToast, showSuccessToast } from '../components/Toast';
import { useMutation, useQuery } from 'react-query';

import { useKeycloak } from '@react-keycloak/web';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetUser = () => {
	const { keycloak } = useKeycloak();

	const getUserRequest = async () => {
		if (!keycloak.token) {
			throw new Error('Failed to get access token');
		}

		const response = await fetch(`${API_BASE_URL}/api/user`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${keycloak.token}`,
			},
		});

		if (!response.ok) {
			throw new Error('Failed to get user');
		}

		return response.json();
	};

	const { data: user, isLoading } = useQuery('getUser', getUserRequest, {
		onError: () => {
			showErrorToast('Failed to get user profile');
		},
	});

	return { user, isLoading };
};

export const useCreateUser = () => {
	const { keycloak } = useKeycloak();

	const createUserRequest = async (user) => {
		if (!keycloak.token) {
			throw new Error('Failed to get access token');
		}

		const response = await fetch(`${API_BASE_URL}/api/user`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${keycloak.token}`,
			},
			body: JSON.stringify(user),
		});

		if (!response.ok) {
			throw new Error('Failed to create user');
		}
	};

	const { mutateAsync: createUser } = useMutation(createUserRequest);

	return { createUser };
};

export const useUpdateUser = () => {
	const { keycloak } = useKeycloak();

	const updateUserRequest = async (formData) => {
		if (!keycloak.token) {
			throw new Error('Failed to get access token');
		}

		const response = await fetch(`${API_BASE_URL}/api/user`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${keycloak.token}`,
			},
			body: JSON.stringify(formData),
		});

		if (!response.ok) {
			throw new Error('Failed to update user');
		}
	};

	const {
		mutateAsync: updateUser,
		isLoading,
		reset,
	} = useMutation(updateUserRequest, {
		onSuccess: () => {
			showSuccessToast('User profile updated successfully');
		},
		onError: () => {
			showErrorToast('Failed to update user profile');
			reset();
		},
	});

	return { updateUser, isLoading };
};

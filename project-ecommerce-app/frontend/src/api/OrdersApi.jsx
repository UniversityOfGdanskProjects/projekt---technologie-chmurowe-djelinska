import { useMutation, useQuery } from 'react-query';

import { showErrorToast } from '../components/Toast';
import { useKeycloak } from '@react-keycloak/web';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateOrder = () => {
	const { keycloak } = useKeycloak();

	const createOrderRequest = async (order) => {
		if (!keycloak.token) {
			throw new Error('Failed to get access token');
		}

		const response = await fetch(`${API_BASE_URL}/api/orders`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${keycloak.token}`,
			},
			body: JSON.stringify(order),
		});

		if (!response.ok) {
			throw new Error('Failed to create order');
		}
	};

	const { mutateAsync: createOrder, isLoading } =
		useMutation(createOrderRequest);

	return { createOrder, isLoading };
};

export const useGetUserOrders = () => {
	const { keycloak } = useKeycloak();

	const getUserOrdersRequest = async () => {
		if (!keycloak.token) {
			throw new Error('Failed to get access token');
		}

		const response = await fetch(`${API_BASE_URL}/api/orders`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${keycloak.token}`,
			},
		});

		if (!response.ok) {
			throw new Error('Failed to fetch user orders');
		}

		return response.json();
	};

	const {
		data: orders,
		isLoading,
		error,
	} = useQuery('getUserOrders', getUserOrdersRequest);

	if (error) {
		showErrorToast('Failed to fetch user orders');
	}

	return { orders, isLoading };
};

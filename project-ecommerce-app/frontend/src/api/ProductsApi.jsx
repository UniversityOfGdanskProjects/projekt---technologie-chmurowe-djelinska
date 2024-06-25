import { showErrorToast, showSuccessToast } from '../components/Toast';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { useKeycloak } from '@react-keycloak/web';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetAllProducts = () => {
	const getAllProductsRequest = async () => {
		const response = await fetch(`${API_BASE_URL}/api/products`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error('Failed to get products');
		}

		return response.json();
	};

	const { data: products, isLoading } = useQuery(
		['getAllProducts'],
		getAllProductsRequest
	);

	return { products, isLoading };
};

export const useSearchProducts = (searchParams) => {
	const searchProductsRequest = async () => {
		const params = new URLSearchParams(searchParams);
		const response = await fetch(
			`${API_BASE_URL}/api/products/search?${params.toString()}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		if (!response.ok) {
			throw new Error('Failed to get products');
		}

		return response.json();
	};

	const { data: results, isLoading } = useQuery(
		['searchProducts', searchParams],
		searchProductsRequest
	);

	return { results, isLoading };
};

export const useGetProduct = (productId) => {
	const getProductRequest = async () => {
		const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error('Failed to get product');
		}

		return response.json();
	};

	const { data: product, isLoading } = useQuery(
		['getProduct', productId],
		getProductRequest
	);

	return { product, isLoading };
};

export const useAddProduct = () => {
	const { keycloak } = useKeycloak();
	const queryClient = useQueryClient();

	const addProductRequest = async (product) => {
		if (!keycloak.token) {
			throw new Error('Failed to get access token');
		}

		const response = await fetch(`${API_BASE_URL}/api/products`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${keycloak.token}`,
			},
			body: JSON.stringify(product),
		});

		if (!response.ok) {
			throw new Error('Failed to add product');
		}
	};

	const {
		mutateAsync: addProduct,
		isLoading,
		reset,
	} = useMutation(addProductRequest, {
		onSuccess: async () => {
			await queryClient.refetchQueries('getAllProducts');
			showSuccessToast('Product added successfully');
		},
		onError: () => {
			showErrorToast('Failed to add product');
			reset();
		},
	});

	return { addProduct, isLoading };
};

export const useDeleteProduct = () => {
	const { keycloak } = useKeycloak();
	const queryClient = useQueryClient();

	const deleteProductRequest = async (productId) => {
		if (!keycloak.token) {
			throw new Error('Failed to get access token');
		}

		const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${keycloak.token}`,
			},
		});

		if (!response.ok) {
			throw new Error('Failed to delete product');
		}
	};

	const { mutateAsync: deleteProduct, isLoading } = useMutation(
		deleteProductRequest,
		{
			onSuccess: async () => {
				await queryClient.refetchQueries('getAllProducts');
				showSuccessToast('Product deleted successfully');
			},
			onError: () => {
				showErrorToast('Failed to delete product');
			},
		}
	);

	return { deleteProduct, isLoading };
};

import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);

	const addToCart = (product, quantity) => {
		const existingItemIndex = cart.findIndex(
			(item) => item._id === product._id
		);

		if (existingItemIndex !== -1) {
			const updatedCart = [...cart];
			updatedCart[existingItemIndex].quantity += quantity;
			setCart(updatedCart);
		} else {
			setCart([...cart, { ...product, quantity }]);
		}
	};

	const removeFromCart = (productId) => {
		const updatedCart = cart.filter((item) => item._id !== productId);
		setCart(updatedCart);
	};

	const clearCart = () => {
		setCart([]);
	};

	const cartSummary = {
		totalItems: cart.reduce((acc, item) => acc + item.quantity, 0),
		totalPrice: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
	};

	return (
		<CartContext.Provider
			value={{ cart, addToCart, removeFromCart, clearCart, cartSummary }}
		>
			{children}
		</CartContext.Provider>
	);
};

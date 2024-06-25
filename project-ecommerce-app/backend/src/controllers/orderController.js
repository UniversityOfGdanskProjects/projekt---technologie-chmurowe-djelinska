const Order = require('../models/orderModel');

const createOrder = async (req, res) => {
	const { items, totalAmount } = req.body;

	try {
		const userId = req.userId;

		const order = new Order({
			userId,
			items,
			totalAmount,
		});

		await order.save();

		res.status(201).json(order);
	} catch (error) {
		rconsole.log(error);
		res.status(500).json({ message: 'Something went wrong' });
	}
};

const getUserOrders = async (req, res) => {
	try {
		const userId = req.userId;
		const orders = await Order.find({ userId })
			.populate('items.productId', 'name imageUrl')
			.sort({ createdAt: -1 });

		res.status(200).json(orders);
	} catch (error) {
		rconsole.log(error);
		res.status(500).json({ message: 'Something went wrong' });
	}
};

module.exports = { createOrder, getUserOrders };

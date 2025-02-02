const User = require('../models/userModel');

const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.status(200).json(user);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Something went wrong' });
	}
};

const createUser = async (req, res) => {
	try {
		const { keycloakId } = req.body;

		const existingUser = await User.findOne({ keycloakId });
		if (existingUser) {
			return res.status(200).send();
		}

		const newUser = new User(req.body);
		await newUser.save();

		res.status(201).json(newUser.toObject());
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Something went wrong' });
	}
};

const updateUser = async (req, res) => {
	try {
		const user = await User.findById(req.userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		user.shippingAddress = req.body;
		await user.save();

		res.status(200).json(user);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Something went wrong' });
	}
};

module.exports = { getUser, createUser, updateUser };

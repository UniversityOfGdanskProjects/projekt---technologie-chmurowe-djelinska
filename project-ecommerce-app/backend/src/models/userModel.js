const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	keycloakId: { type: String, required: true },
	email: { type: String, required: true },
	fullName: { type: String, required: true },
	shippingAddress: {
		street: { type: String },
		city: { type: String },
		postalCode: { type: String },
		country: { type: String },
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;

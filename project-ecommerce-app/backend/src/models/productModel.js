const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true, min: 0 },
	category: { type: String, required: true },
	imageUrl: { type: String, required: true },
	quantityInStock: { type: Number, required: true, min: 0 },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

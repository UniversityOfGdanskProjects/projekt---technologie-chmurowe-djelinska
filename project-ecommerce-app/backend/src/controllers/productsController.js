const Product = require('../models/productModel');

const getProducts = async (req, res) => {
	try {
		const products = await Product.find();

		res.status(200).json(products);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Something went wrong' });
	}
};

const searchProducts = async (req, res) => {
	try {
		const { query, category, minPrice, maxPrice, sortBy, sortOrder, page } =
			req.query;
		let filteredQuery = {};

		if (query) {
			filteredQuery.$or = [
				{ name: { $regex: query, $options: 'i' } },
				{ description: { $regex: query, $options: 'i' } },
			];
		}

		if (category) {
			filteredQuery.category = { $regex: category, $options: 'i' };
		}

		if (minPrice && maxPrice) {
			filteredQuery.price = {
				$gte: parseInt(minPrice),
				$lte: parseInt(maxPrice),
			};
		} else if (minPrice) {
			filteredQuery.price = { $gte: parseInt(minPrice) };
		} else if (maxPrice) {
			filteredQuery.price = { $lte: parseInt(maxPrice) };
		}

		let sort = {};
		if (sortBy) {
			sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
		}

		const pageSize = 4;
		const pageNumber = parseInt(page ? page : 1);
		const skip = (pageNumber - 1) * pageSize;

		const products = await Product.find(filteredQuery)
			.sort(sort)
			.skip(skip)
			.limit(pageSize)
			.lean();
		const total = await Product.countDocuments(filteredQuery);

		res.status(200).json({
			data: products,
			pagination: {
				total,
				page: pageNumber,
				pages: Math.ceil(total / pageSize),
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Something went wrong' });
	}
};

const getProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}

		res.status(200).json(product);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Something went wrong' });
	}
};

const addProduct = async (req, res) => {
	try {
		const newProduct = new Product(req.body);
		await newProduct.save();

		res.status(201).json(newProduct.toObject());
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Something went wrong' });
	}
};

const deleteProduct = async (req, res) => {
	const productId = req.params.id;

	try {
		const product = await Product.findById(productId);

		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}

		const deletedProduct = await Product.findByIdAndDelete(productId);

		res.status(204).json(deletedProduct);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Something went wrong' });
	}
};

module.exports = {
	getProducts,
	searchProducts,
	getProduct,
	addProduct,
	deleteProduct,
};

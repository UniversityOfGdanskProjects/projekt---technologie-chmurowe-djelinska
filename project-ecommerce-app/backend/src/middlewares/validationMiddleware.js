const { body, validationResult } = require('express-validator');

const handleValidationErrors = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	next();
};

const validateUserUpdateRequest = [
	body('street').notEmpty().withMessage('Street is required'),
	body('city').notEmpty().withMessage('City is required'),
	body('postalCode').notEmpty().withMessage('Postal code is required'),
	body('country').notEmpty().withMessage('Country is required'),
	handleValidationErrors,
];

const validateAddProductRequest = [
	body('name').notEmpty().withMessage('Name is required'),
	body('description').notEmpty().withMessage('Description is required'),
	body('price')
		.notEmpty()
		.withMessage('Price is required')
		.isFloat({ min: 0 })
		.withMessage('Price must be a number and at least 0'),
	body('quantityInStock')
		.notEmpty()
		.withMessage('Quantity is required')
		.isFloat({ min: 0 })
		.withMessage('Quantity must be a number and at least 0'),
	body('category').notEmpty().withMessage('Category is required'),
	body('imageUrl')
		.notEmpty()
		.withMessage('Image URL is required')
		.isURL()
		.withMessage('Image URL must be a valid URL'),
	handleValidationErrors,
];

module.exports = { validateUserUpdateRequest };

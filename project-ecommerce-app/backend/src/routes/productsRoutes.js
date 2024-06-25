const express = require('express');
const productController = require('../controllers/productsController');
const {
	validateJwtToken,
	decodeJwtToken,
	checkAdminRole,
} = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', productController.getProducts);
router.get('/search', productController.searchProducts);
router.get('/:id', productController.getProduct);
router.post(
	'/',
	validateJwtToken,
	decodeJwtToken,
	checkAdminRole,
	productController.addProduct
);
router.delete(
	'/:id',
	validateJwtToken,
	decodeJwtToken,
	checkAdminRole,
	productController.deleteProduct
);

module.exports = router;

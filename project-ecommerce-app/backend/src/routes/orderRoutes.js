const express = require('express');
const orderController = require('../controllers/orderController');
const {
	validateJwtToken,
	decodeJwtToken,
} = require('../middlewares/authMiddleware');

const router = express.Router();

router.get(
	'/',
	validateJwtToken,
	decodeJwtToken,
	orderController.getUserOrders
);
router.post('/', validateJwtToken, decodeJwtToken, orderController.createOrder);

module.exports = router;

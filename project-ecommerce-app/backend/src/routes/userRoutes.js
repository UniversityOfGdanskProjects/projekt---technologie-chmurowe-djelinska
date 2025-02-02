const express = require('express');
const userController = require('../controllers/userController');
const {
	validateJwtToken,
	decodeJwtToken,
} = require('../middlewares/authMiddleware');
const {
	validateUserUpdateRequest,
} = require('../middlewares/validationMiddleware');

const router = express.Router();

router.get('/', validateJwtToken, decodeJwtToken, userController.getUser);
router.post('/', validateJwtToken, userController.createUser);
router.patch(
	'/',
	validateJwtToken,
	decodeJwtToken,
	validateUserUpdateRequest,
	userController.updateUser
);

module.exports = router;

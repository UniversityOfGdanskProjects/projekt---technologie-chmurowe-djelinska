const { expressjwt: jwtCheck } = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const validateJwtToken = jwtCheck({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `${process.env.KEYCLOAK_SERVER_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/certs`,
	}),

	audience: process.env.KEYCLOAK_CLIENT_ID,
	issuer: `${process.env.KEYCLOAK_SERVER_URL}/realms/${process.env.KEYCLOAK_REALM}`,
	algorithms: ['RS256'],
});

const decodeJwtToken = async (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization || !authorization.startsWith('Bearer ')) {
		return res.sendStatus(401);
	}

	const token = authorization.split(' ')[1];

	try {
		const decoded = jwt.decode(token);
		const keycloakId = decoded.sub;
		const roles = decoded.realm_access.roles;

		const user = await User.findOne({ keycloakId });
		if (!user) {
			return res.sendStatus(401);
		}

		req.keycloakId = keycloakId;
		req.userId = user._id.toString();
		req.roles = roles;

		next();
	} catch (error) {
		console.log(error);
		res.sendStatus(401);
	}
};

const checkAdminRole = (req, res, next) => {
	if (!req.roles || !req.roles.includes('admin')) {
		return res.sendStatus(403);
	}

	next();
};

module.exports = { validateJwtToken, decodeJwtToken, checkAdminRole };

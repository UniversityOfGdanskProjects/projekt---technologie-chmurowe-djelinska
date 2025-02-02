require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const productsRoutes = require('./routes/productsRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

const port = process.env.PORT || 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: process.env.FRONTEND_URL }));

app.use('/api/user', userRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', orderRoutes);

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() =>
		app.listen(port, () => {
			console.log(
				`server connected to database and running on localhost:${port}`
			);
		})
	)
	.catch((error) => {
		console.log(error);
	});

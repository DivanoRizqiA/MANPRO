const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./api'); // connect to MongoDB
const app = express();

const authRoutes = require('./api/routes/auth');
const checkRoutes = require('./api/routes/checks');

app.use(cors());
app.use(express.json());

// Lightweight request/response logger for debugging
app.use((req, res, next) => {
	const start = Date.now();
	const bodyKeys = Object.keys(req.body || {});
	console.log(`[REQ] ${req.method} ${req.originalUrl} bodyKeys=${JSON.stringify(bodyKeys)}`);
	res.on('finish', () => {
		const ms = Date.now() - start;
		console.log(`[RES] ${req.method} ${req.originalUrl} -> ${res.statusCode} ${ms}ms`);
	});
	next();
});

// Minimal request logger for debugging
app.use((req, res, next) => {
	const start = Date.now();
	const bodyKeys = req.body && typeof req.body === 'object' ? Object.keys(req.body) : [];
	console.log(`[REQ] ${req.method} ${req.originalUrl} bodyKeys=${JSON.stringify(bodyKeys)}`);
	res.on('finish', () => {
		const ms = Date.now() - start;
		console.log(`[RES] ${req.method} ${req.originalUrl} -> ${res.statusCode} ${ms}ms`);
	});
	next();
});

app.use('/api/auth', authRoutes);
app.use('/api/checks', checkRoutes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
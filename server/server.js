require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./db/index.js');

const app = express();

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

//get all restaurents
app.get('/api/v1/restaurents', async (req, res) => {
	try {
		const results = await db.query('SELECT * FROM restaurents');
		//console.log(results);
		res.status(200).json({
			status: 'Yay success',
			results: results.rows.length,
			data: {
				restaurents: results.rows,
			},
		});
	} catch (err) {
		console.log(err);
	}
});

//get a restaurent

app.get('/api/v1/restaurents/:id', async (req, res) => {
	console.log(req.params);

	try {
		const results = await db.query('SELECT * FROM restaurents WHERE id = $1', [
			req.params.id,
		]);

		res.status(200).json({
			status: 'success',
			data: {
				restaurent: results.rows[0],
			},
		});
	} catch (err) {
		console.log(err);
	}
});

// create a restaurent

app.post('/api/v1/restaurents', async (req, res) => {
	console.log(req.body);

	try {
		const results = await db.query(
			'INSERT INTO restaurents (name, location, price_range) values ($1, $2, $3) returning *',
			[req.body.name, req.body.location, req.body.price_range]
		);
		console.log(results);
		res.status(201).json({
			status: 'success',
			data: {
				restaurent: results.rows[0],
			},
		});
	} catch (err) {
		console.log(err);
	}
});

//update a restaurent
app.put('/api/v1/restaurents/:id', async (req, res) => {
	console.log(req.params.id);

	try {
		const results = await db.query(
			'UPDATE restaurents SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *',
			[req.body.name, req.body.location, req.body.price_range, req.params.id]
		);
		console.log(results);
		res.status(200).json({
			status: 'success',
			data: {
				restaurent: results.rows[0],
			},
		});
	} catch (err) {
		console.log(err);
	}
});

//delete a restaurent
app.delete('/api/v1/restaurents/:id', async (req, res) => {
	try {
		const results = await db.query('DELETE FROM restaurents where id = $1', [
			req.params.id,
		]);

		res.status(204).json({
			status: 'success',
		});
	} catch (err) {
		console.log(err);
	}
});

app.listen(port, () => {
	console.log(`server is up and listening on port ${port}`);
});

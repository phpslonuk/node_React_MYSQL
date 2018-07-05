const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM products';

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '1234',
	database: 'react_sql'
});

connection.connect(err => {
	if(err){
		return err;
	}
});

app.use(cors());





// show 
app.get('/', (req, res) => {
	res.send('go to /product')
});

// show all
app.get('/products', (req, res) => {
	connection.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
		if(err){
			return res.send(err)
		}
		else{
			return res.json({
				data: results
			})
		}
	})
});

// add new
app.get('/products/add', (req, res) => {
	const { name, price } = req.query;
	console.log(name, price);
	const INSERT_PRODUCTS_QUERY = `INSERT INTO products(name, price) VALUES('${name}', '${price}')`;
	connection.query(INSERT_PRODUCTS_QUERY, (err, results) => {
		if(err) {
			return res.send(err)
		}
		else {
			return res.send('successful')
		}
	});
});

// add delete
app.get('/products/delete', (req, res) => {
	const { name } = req.query;
	console.log(name);
	const DELETE_PRODUCTS_QUERY = `DELETE FROM products WHERE name ='${name}'`;
	connection.query(DELETE_PRODUCTS_QUERY, (err, results) => {
		if(err) {
			return res.send(err)
		}
		else {
			return res.send('successful')
		}
	});
});










app.listen(4000, () => {
	console.log('Product listing')
});
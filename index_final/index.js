const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM products';

const SELECT_ALL_PRODUCTS_QUERY_NEW = 'SELECT mainCompany.namemain, mainCompany.profit, childCompany.nameChild, childCompany.childEarnings from mainCompany inner join childCompany on mainCompany.id=childCompany.id_main';



const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '1234',
	database: 'react_sql'
//	database: 'my_test'
});

connection.connect(err => {
	if(err){
		return err;
	}
});

app.use(cors());





// index 
app.get('/', (req, res) => {
	res.send('go to /products')
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


// show new all
app.get('/productsnew', (req, res) => {
	connection.query(SELECT_ALL_PRODUCTS_QUERY_NEW, (err, results) => {
		const dad = results;
		console.log(typeof(dad));

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

//  delete
app.get('/products/delete', (req, res) => {
	const { ID } = req.query;
	console.log(ID);
	const DELETE_PRODUCTS_QUERY = `DELETE FROM products WHERE ID ='${ID}'`;
	connection.query(DELETE_PRODUCTS_QUERY, (err, results) => {
		if(err) {
			return res.send(err)
		}
		else {
			return res.send('successful')
		}
	});
});

// edit
app.get('/products/edit', (req, res) => {
	const { ID, name, price } = req.query;
	console.log(ID, name, price);
	const UPDATE_PRODUCTS_QUERY = `UPDATE products SET name='${name}', price='${price}' WHERE ID='${ID}'`;
	connection.query(UPDATE_PRODUCTS_QUERY, (err, results) => {
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
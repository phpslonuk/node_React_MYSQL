const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM maincompany';


const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '1234',
	database: 'testdb'

});

connection.connect(err => {
	if(err){
		return err;
	}
});

app.use(cors());


// index 
app.get('/', (req, res) => {
	res.send('go to /companies')
});

// show all
app.get('/companies', (req, res) => {
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
app.get('/companies/add', (req, res) => {
	const { namemain, namechild, profit, childearnings } = req.query;
	console.log(namemain, namechild, profit, childearnings );
	const INSERT_COMPANIES_QUERY = `INSERT INTO MainCompany(namemain, namechild, profit, childearnings) VALUES('${namemain}', '${namechild}', ${profit}, ${childearnings})`;
	connection.query(INSERT_COMPANIES_QUERY, (err, results) => {
		if(err) {
			return res.send(err)
		}
		else {
			return res.send('successful')
		}
	}); 
});

//  delete
app.get('/companies/delete', (req, res) => {
	const { id } = req.query;
	console.log(id);
	const DELETE_COMPANIES_QUERY = `DELETE FROM maincompany WHERE ID ='${id}'`;
	connection.query(DELETE_COMPANIES_QUERY, (err, results) => {
		if(err) {
			return res.send(err)
		}
		else {
			return res.send('successful')
		}
	});
});

// edit
app.get('/companies/edit', (req, res) => {
	const { namemain, namechild, profit, childearnings, id  } = req.query;
	console.log(namemain, namechild, profit, childearnings );
	const UPDATE_COMPANIES_QUERY = `UPDATE maincompany SET namemain='${namemain}', namechild='${namechild}',
	profit='${profit}', childearnings='${childearnings}' WHERE ID='${id}'`;
	connection.query(UPDATE_COMPANIES_QUERY, (err, results) => {
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
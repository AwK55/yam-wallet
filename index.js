const express = require('express');
var bodyParser = require('body-parser');
const fs = require('fs');


const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send(`<!doctype html>
	<html>
		<head>
			<link rel="stylesheet" href="/style.css">
		</head>
		<body>
			<h1>Hello Smolny!</h1>
		</body>
	</html>`);
});

app.get('/error', (req, res) => {
	throw Error('Oops!');
});
app.get('/transfer', (req, res) => {
	const {
		amount,
		from,
		to
	} = req.query;
	res.json({
		result: 'success',
		amount,
		from,
		to
	});
});
app.get('/cards', (req, res) => {

	cards = require('./source/cards.json');
	res.json(cards);
});

app.post('/cards', (req, res) => {
	var newCard = req.body;
	//алгоритм Луна duplicate
	//validateCard(callback add Card) 
	// 
	cards = require('./source/cards.json');
	cards.push(newCard[0]);

	fs.writeFile("./source/cards.json", JSON.stringify(cards), (err) => {
		if (err) {
			console.error('cards not added', err.code);
			throw err;
		}
		res.write('done!');
		res.end();
	});

});

app.delete('/cards/:id', (req, res) => {
	var n = req.params.id;
	console.log(n);
	if (n) {

		cards = require('./source/cards.json');
		cards.splice(n, 1);

		fs.writeFile("./source/cards.json", JSON.stringify(cards), (err) => {
			if (err) {
				console.error('cards not added', err.code);
				throw err;
			}
			res.write('done!');
		});
	}
	else{
		res.status(404);
		res.write('Not found!');
	}
});

app.listen(3000, () => {
	console.log('YM Node School App listening on port 3000!');
});

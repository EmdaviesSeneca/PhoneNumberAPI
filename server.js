var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", function(req, res) {
	res.json({message: "HELLO WORLD!"});
});

app.get("/api/phonenumbers/parse/text/", function(req, res) {
	res.json({message: "Parsing part for text exists here!"});
});

app.post("/api/phonenumbers/parse/file/", function(req, res) {
	res.json({message: "Parsing part for file exists here!"});
});
var port = process.env.PORT || 8080;

app.listen(port);
console.log('Your app is running');

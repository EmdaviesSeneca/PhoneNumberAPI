var express = require('express');
var app = express();
var PNF = require('google-libphonenumber').PhoneNumberFormat;
var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
var multer = require('multer');

var file = multer({ dest: './uploads' });
var fs = require('fs');


app.get("/", function(req, res) {
	res.status(200).send('API is working.');
});

app.get("/api/phonenumbers/parse/text/:number", function(req, res) {
	if (req.params.number == "nothing") {
		res.status(400).send('[]');
	} else {
		var arr = [];
		arr.push(req.params.number);
		var finalArray = parseNumbers(arr, res);
		res.status(200).send(finalArray);
	}
});

app.post("/api/phonenumbers/parse/file", file.single('file'), function(req, res) {
	if (!req.file) {
		res.status(400).send('No file was attached');
	} else {
		var content = Buffer.from(fs.readFileSync(req.file.path));
		var numbers = content.toString().split('\n');
		var finalArray = parseNumbers(numbers, res);
		res.status(200).send(finalArray);	
	}
});
var port = process.env.PORT || 8080;

app.listen(port);
console.log('Your app is running');

function parseNumbers(unparsedNumbers, res) {
	var numbers;
	var finalArray = [];
	try {	
		for (var i = 0; i < unparsedNumbers.length; i++) {
			numbers = phoneUtil.parse(unparsedNumbers[i], 'CA'); //this line is broken for some reason
			finalArray.push(phoneUtil.format(numbers, PNF.INTERNATIONAL));
		}
		return finalArray;
	} catch(error) {
		res.status(400).send("Something went wrong!: " + error);
	}
}

module.exports = app;
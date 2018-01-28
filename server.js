var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PNF = require('google-libphonenumber').PhoneNumberFormat;
var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", function(req, res) {
	
	res.json({message: "HELLO WORLD!"});
});

app.get("/api/phonenumbers/parse/text/:number*", function(req, res) {
	if (req.params.number = "nothing") {
		res.json({message: "[]"});
	} else {
		var phoneNumber = phoneUtil.parse(req.params.number, 'CA');
		res.json({message: phoneUtil.format(phoneNumber, PNF.NATIONAL)});
	}
});

app.post("/api/phonenumbers/parse/file/:filename*", function(req, res) {
	
	res.json({message: "Parsing part for file exists here!"});
});
var port = process.env.PORT || 8080;

app.listen(port);
console.log('Your app is running');

//require express and other modules
var express = require("express"),
		app = express(),
		http = require("http").Server(app), //node http server
		bodyParser = require("body-parser"),
		io = require("socket.io")(http);

//configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({extended: true}));

//server statid files from public folder
app.use(express.static(__dirname + "/puclic"));

//set view engine to hbs
app.set("view engine", "hbs");

//homepage route
app.get("/", function (req, res) {
	res.render("index");
});

//listen to port 3000
var server = app.listen(process.env.PORT || 3000, function () {
	console.log("I'm listening");
});
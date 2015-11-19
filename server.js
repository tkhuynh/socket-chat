//require express and other modules
var express = require("express"),
		app = express(),
		http = require("http").Server(app), //node http server
		bodyParser = require("body-parser"),
		io = require("socket.io")(http);

//configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({extended: true}));

//server statid files from public folder
app.use(express.static(__dirname + "/public"));

//set view engine to hbs
app.set("view engine", "hbs");

//homepage route
app.get("/", function (req, res) {
	res.render("index");
});

//connect to socket
io.on("connection", function (socket) {
	console.log("a user connected");

	//receive and broadcast chat msg
	socket.on("chat message", function (post) {
		console.log("message", post);
		io.emit("chat message", post);
	});

	socket.on("disconnect", function () {
		console.log("user disconnected");
	});
});

//listen to port 3000
http.listen(process.env.PORT || 3000, function () {
	console.log("I'm listening");
});
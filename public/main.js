// wait for DOM to load before running JS
$(function () {
	//connect to socket
	var socket = io();

	//submit form to send a msg
	$("#send-msg").on("submit", function (event) {
		event.preventDefault();

		//get new msg from form input
		var newMsg = $("#new-msg").val();
		var user = $("#username").val();
		var post = {username: user, msg: newMsg};
		//clear form after submit
		$("form").find("#new-msg", "#username").val("");
		//send new msg to socket (Server)
		socket.emit("chat message", post);
	});
	//reveive msg from socket (server)
	socket.on("chat message", function (msg) {
		console.log(msg);
		$("#messages").append($("<li><h4>" + msg.username + ": " + msg.msg + "<h4></li>"));
	});

});
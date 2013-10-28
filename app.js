
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var socketio = require('socket.io');
var mongoose = require('mongoose');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//index route
app.get('/', routes.index);
 
//Create the server
var server = http.createServer(app)

//Start the web socket server
var io = socketio.listen(server);

//connect mongoose
mongoose.connect('mongodb://localhost/chatUsers');

//user constructor
var User = mongoose.model('User', {name : String});

var userObj = {};

//If the client just connected
io.sockets.on('connection', function (socket) {
	console.log('Hello from Socket.io, I\'m connected with the client');

	//username
	socket.on('username', function (username){
		if(userObj[socket.id]){
			io.sockets.emit('usernameChange', 
				{
					oldUsername : userObj[socket.id],
					newUsername : username
				});
		}
		else{
			io.sockets.emit('username', username);
		}
		userObj[socket.id] = username;
		io.sockets.emit('users', userObj);
	});

	//message object
	socket.on('message', function (message){
		var msgObj = {
				message: message,
				senderid: socket.id,
				username: userObj[socket.id]
			}
		io.sockets.socket(message.clientid).emit('message',
			msgObj);
			console.log(msgObj);
		io.sockets.emit('message', msgObj);
	});

	//disconnect
	socket.on('disconnect', function (){
		io.sockets.emit('disconnect', userObj[socket.id]);
		delete userObj[socket.id];
		io.sockets.emit('users', userObj);
	});
});

server.listen(3000, function(){
  console.log('Express server listening on port ' + app.get('port'));
});



#NODE5: Chatroom
Objective
Build a real-time chat application using Socket.io

Skills
Socket.io
Express
Node.js
jQuery
Handlebars
Resources
socket.io
socket.io quick reference
nodejs.org
Starter Code
Requirements
Part I (Get Socket.io running)

Download the starter code here
run npm install inside of that directory
Once you get your server running you should see something like

You now have socket.io running!
Part II (Setup socket events on the server)

Now let's create an event to let the server know when a connection has been made by the client. Add a "connection" event to your app.js io.sockets.on('connection',function(){...});
Create an empty object outside of your connection event to hold our users.
Create an event inside of the connection event to receive a message
Note that all of our socket events on the server will go inside of the connection event
Part III (Setup socket events on the client)

Now let's setup our client side events. The HTML has been provided for you . Create a connect statement to connect to your server var socket = io.connect('http://localhost')
Now lets create a "connect" event socket.on('connect', function(){})
Create a "message" event inside of the "connect" event's callback
Part IV (Send messages)

Write some jQuery to capture a keyup event. When enter is pressed use socket.emit('message', 'SOME MESSAGE'); to send a message to your server
On the server console.log() the message to ensure that the message has made it to the server.
On the server in your "message" event. Send the message to the entire chatroom by doing io.sockets.emit('message', 'my message');
On the client when the "message" event is fired, append the message to the div with the id "room"
You should be able to open two tabs in Chrome with http://localhost:3000 and chat back and forth
Bonus I

Whenever someone connects to the chat room. Display a message to the room that shows that someone has connected.
Whenever someone disconnects, announce to teh room that someone has left.
Use the "disconnect" event
Bonus II

When a user connects to the server, emit an event that shows their socket ID in the right column of that chat UI.
Create a feature that allows the user to change their user name.
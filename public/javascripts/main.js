$(function(){
	// connect the socket.io server
	var socket = io.connect('http://localhost');

  	//define socket events
  	socket.on('connect', function(){
  		console.log('Hello the client is connected');
  	});

	socket.on('username', function(username){
		$('#users').append('<p id='+username+'>'+username+'</p>');
  	});

  	//not attaching to correct username
  	socket.on('message', function(msgObj){
  		console.log(msgObj);
		$('#room').append('<p>'+msgObj.username+': '+msgObj.message+'</p>');
  	});

  	socket.on('username', function(username){
  		$('#room').append('<p>User '+username+' has entered the room</p>');
  	});

  	socket.on('disconnect', function(username){
  		$('#room').append('<p>User '+username+' has left the room</p>');
  		$('#users').find('#'+username).remove();
  	});

	// attach events
	$('#message-input').on('keyup', function(e){
		if(e.which === 13){
			var message = $(this).val();
			socket.emit('message', message);
			$(this).val('');
			if(!username){
				alert('Please enter username');
			}
		}
	});

	$('#username').on('keyup', function(e){
		if(e.which === 13){
			var username = $(this).val();
			socket.emit('username', username);
			$(this).val('');
			if(!username){
				alert('Please enter username');
			};
		}
	});


});

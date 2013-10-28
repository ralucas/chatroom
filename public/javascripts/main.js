$(function(){
	// connect the socket.io server
	var socket = io.connect('http://localhost');

  	//define socket events
  	socket.on('connect', function(){
  		console.log('Hello the client is connected');
  	});
  	socket.on('username', function (data) {
  		console.log(data);
  	});
  	
  	socket.on('message', function(message){
  		$('#room').append('<p>'+message+'</p>')
  	});
  	  	
	// attach events

	$('#message-input').on('keyup', function(e){
		if(e.which === 13){
			var message = $(this).val();
			socket.emit('message', message);
			$(this).val('');
		}
	});


});

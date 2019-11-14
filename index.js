var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);

    setTimeout(function() {
      //Sending an object when emmiting an event
      socket.emit('testerEvent', { description: 'A custom event named testerEvent!'});
   }, 1000);


    socket.on('disconnect', function(socket){
      io.emit('diss',{ description:
         'A custom event named testerEvent!'})
    });

  });
});

http.listen(8000, function(){
  console.log('listening on *:3000');
});

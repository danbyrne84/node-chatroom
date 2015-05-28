var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket) {
    console.log('user connected');

    socket.on('message', function (msg) {
        console.log('received chat message', msg);
        io.emit('message',{
            message: msg.message,
            nickname: msg.nickname
        });
    });

    socket.on('loginReq', function (nick) {
        console.log('login request for', nick);
        
        //todo, some verification here
        io.emit('message', {
            'nickname': 'system',
            'message': nick + ' has entered the room'
        });

        io.emit('loginResp', {
            'status' : 'ok',
            'nickname': nick
        });
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
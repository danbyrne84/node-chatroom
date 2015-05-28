var socket = io("ws://sc-pc027:3000");
var nickname = "guest" + Math.floor((Math.random() * 1000) + 1);

// send message
var sendMessage = function() {
    var message = $('.textinput').val();
    console.log('sending message', message);

    socket.emit('message', {
        message: message,
        nickname: nickname
    });

    $('.textinput').val("");
};

// send login request
var login = function () {
    var requestedLogin = $('input.nickname').val();
    console.log('logging in as ' + requestedLogin);

    socket.emit('loginReq', requestedLogin);

    // login response
    socket.on('loginResp', function (msg) {
        console.log('login response', msg);

        if (msg.status == 'ok' && msg.nickname == requestedLogin) {
            nickname = msg.nickname;
            $('div.login-container').hide();
            $('div.room-container').show();
        }
    });
};

// enter key press
$('input.textinput').on('keypress', function(ev) {
    if (ev.keyCode == 13) {
        sendMessage();
    }
});
$('input.nickname').on('keypress', function(ev) {
    if (ev.keyCode == 13) {
        login();
    }
});

// submit button click
$('button.submit').on('click', sendMessage);

// login button click
$('button.login').on('click', login);

// receive message event handler
socket.on('message', function (msg) {
    console.log('received chat message', msg);

    $('div.room ul.messages').append($('<li>').text(msg.nickname + ' - ' + msg.message));

    // autoscroll biaches
    var room = $('div.room')[0];
    room.scrollTop = room.scrollHeight;
});
var socket = io();

socket.on('connect', function() {
    console.log('Connected to Server');

    socket.emit('createMessage', {
        from: 'Harshit',
        text: 'Hey Harshit here'
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from Server');
});

socket.on('newMessage', function(message) {
    console.log('New message', message);
});

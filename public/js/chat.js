var socket = io();

function scrolltoBottom() {
    //Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    
    //Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(scrollTop + clientHeight + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
};

socket.on('connect', function() {
    console.log('Connected to Server');
    
});

socket.on('disconnect', function() {
    console.log('Disconnected from Server');
});

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        time: formattedTime
    });

    jQuery('#messages').append(html);
    scrolltoBottom();
});

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        time: formattedTime
    });

    jQuery('#messages').append(html);
    scrolltoBottom();
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function(){
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation)
        return alert('Geolocation not supported by your browser');

    locationButton.attr('disabled', 'disabled').text('Sending location..');
    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
});
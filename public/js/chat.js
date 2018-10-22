let socket = io();

function scrollToBottom () {
  // selectors
  let messages = document.getElementById('messages');
  console.log(messages);
  /*let listChildren = messages.getElementsByTagName('li');
  let length = listChildren.length;
  console.log(length);*/
  let newMessage = document.querySelector('#messages li:last-child');
  console.log('newMessage.innerHeight', newMessage.innerHeight);
  // heights
  let clientHeight = messages.clientHeight;
  console.log('clientHeight', clientHeight);
  let scrollTop = messages.scrollTop;
  console.log('scrollTop', scrollTop);
  let scrollHeight = messages.scrollHeight;
  console.log('scrollHeight', scrollHeight);
  let newMessageHeight = newMessage.clientHeight;
  console.log('newMessageHeight.clientHeight', newMessageHeight);
  let lastMessageHeight;
  if (newMessage.previousElementSibling) {
    lastMessageHeight = newMessage.previousElementSibling.clientHeight;
  } else {
    lastMessageHeight = 0;
  }
  console.log('lastMessageHeight', lastMessageHeight);


  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop = scrollHeight;
  }
};

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from the server');
});

socket.on('newMessage', function (message) {
  /*let template = document.querySelector('#message-template').textContent;
  let html = Mustache.render(template);

  document.querySelector('#messages').append(html);*/

  let formattedTime = moment(message.createdAt).format('h:mm a');
  let template = document.getElementById('message-template').innerHTML;
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  document.getElementById('messages').innerHTML += html;

  scrollToBottom();

  /*let template = jQuery('#message-template').html();
  let html = Mustache.render(template);

  jQuery('#messages').append(html);*/

  /*let formattedTime = moment(message.createdAt).format('h:mm a');
  let li = document.createElement('li');
  li.innerText = `${message.from} ${formattedTime}: ${message.text}`;

  document.querySelector('#messages').append(li);*/
});

socket.on('newLocationMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let template = document.getElementById('location-message-template').innerHTML;
  let html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  document.getElementById('messages').innerHTML += html;

  scrollToBottom();

  /*let li = document.createElement('li');
  let a = document.createElement('a');
  a.innerText = 'My current Location'
  li.innerText = `${message.from} ${formattedTime}: `;
  a.setAttribute('target', '_blank');
  a.setAttribute('href', message.url);

  li.append(a);
  document.querySelector('#messages').append(li);*/
});

document.querySelector('#message-form').addEventListener('submit', function (e) {
  e.preventDefault();
  let messageTextBox = document.querySelector('input[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.value
  }, function () {
    messageTextBox.value = '';
  });
});

let locationButton = document.querySelector('#send-location');
locationButton.addEventListener('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.setAttribute('disabled', 'disabled');
  locationButton.innerText = 'Sending location...';

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttribute('disabled');
    locationButton.innerText = 'Send location';
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttribute('disabled');
    alert('Unable to fetch location.');
  });
});

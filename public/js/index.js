let socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from the server');
});

socket.on('newMessage', function (message) {
  console.log('New Message!', message);
  let li = document.createElement('li');
  li.innerText = `${message.from}: ${message.text}`;

  document.querySelector('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  let li = document.createElement('li');
  let a = document.createElement('a');
  a.innerText = 'My current Location'
  li.innerText = `${message.from}: `;
  a.setAttribute('target', '_blank');
  a.setAttribute('href', message.url);

  li.append(a);
  document.querySelector('#messages').append(li);
});

document.querySelector('#message-form').addEventListener('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: document.querySelector('input[name=message]').value
  }, function () {

  });
});

let locationButton = document.querySelector('#send-location');
locationButton.addEventListener('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    alert('Unable to fetch location.');
  });
});

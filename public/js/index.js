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

document.querySelector('#message-form').addEventListener('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: document.querySelector('input[name=message]').value
  }, function () {

  });
});

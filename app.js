var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');

// Instantiate the socket client (`io`)
// (for now, you must explicitly pass in the socket.io client when using this library from Node.js)
var io = sailsIOClient(socketIOClient);

// Set some options:
// (you have to specify the host and port of the Sails backend when using this library from Node.js)
io.sails.url = 'http://localhost:1337';
// ...

// Send a GET request to `http://localhost:1337/hello`:
io.socket.get('/virtualhost', function serverResponded (data) {
    console.log('something happened');
    console.log(data);

  // When you are finished with `io.socket`, or any other sockets you connect manually,
  // you should make sure and disconnect them, e.g.:
  // io.socket.disconnect();

  // (note that there is no callback argument to the `.disconnect` method)
});

io.socket.on('virtualhost', function serverResponded (data) {
    console.log(data);
});

var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');
var config = require('config');
var child_process = require('child_process');

// Instantiate the socket client (`io`)
// (for now, you must explicitly pass in the socket.io client when using this library from Node.js)
var io = sailsIOClient(socketIOClient);

// Set some options:
// (you have to specify the host and port of the Sails backend when using this library from Node.js)
io.sails.url = config.get('apiEndpoint');
// ...

// Send a GET request to `http://localhost:1337/hello`:
io.socket.get('/virtualhost', function serverResponded (data) {
    console.log(data);

  // When you are finished with `io.socket`, or any other sockets you connect manually,
  // you should make sure and disconnect them, e.g.:
  // io.socket.disconnect();

  // (note that there is no callback argument to the `.disconnect` method)
});

io.socket.on('virtualhost', function serverResponded (data) {
    console.log(data);
    // generateConfig();
});

exports.startNginx = function () {
    var nginx = child_process.spawn('nginx', ['-g', 'daemon off;']);

    // Capturing stdout
    nginx.stdout.on('data',
        function (data) {
            console.log('tail output: ' + data);
        }
    );

    // Capturing stderr
    nginx.stderr.on('data',
        function (data) {
            console.log('err data: ' + data);
        }
    );

    process.on('exit', function () {
        nginx.kill();
    });
}

process.on("SIGTERM", function() {
   console.log("Parent SIGTERM detected");
   // exit cleanly
   process.exit();
});


exports.generateConfig = function () {
    request.get(apiEndpoint + "/virtualhost/nginx", function (data) {
        console.log(data);
    });
}

this.startNginx();

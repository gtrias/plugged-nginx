var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');
var config = require('config');
var child_process = require('child_process');
var request = require('request');

// Instantiate the socket client (`io`)
var io = sailsIOClient(socketIOClient);
io.sails.url = config.get('apiEndpoint');


// Send a GET request to `http://localhost:1337/virtualhost`:
io.socket.get('/virtualhost', function serverResponded (data) {
    console.log(data);

    // When you are finished with `io.socket`, or any other sockets you connect manually,
    // you should make sure and disconnect them, e.g.:
    // io.socket.disconnect();

    // (note that there is no callback argument to the `.disconnect` method)
    generateConfig();
});

io.socket.on('virtualhost', function serverResponded (data) {
    console.log(data);
    generateConfig();
});


var startNginx = function () {
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

var generateConfig = function () {
    var fs = require('fs');
    request(config.get('apiEndpoint') + "/virtualhost/nginx", function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);

        fs.writeFile(config.get('configFile'), body, function(err) {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });

      }
    })
}

startNginx();

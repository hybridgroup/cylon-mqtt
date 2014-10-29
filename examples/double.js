var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'server', adaptor: 'mqtt', host: 'mqtt://localhost:1883'},
  devices: [{name: 'uno', driver: 'mqtt', topic: 'hi'},
            {name: 'dos', driver: 'mqtt', topic: 'hola'}],

  work: function(my) {
    my.uno.on('message', function (data) {
      console.log(data);
    });

    my.dos.on('message', function (data) {
      console.log(data);
    });

    every((1).seconds(), function() {
      console.log("Saying hello...");
      my.server.publish('hi', 'hello');
      my.server.publish('hola', 'buenos');
    });
  }
}).start();

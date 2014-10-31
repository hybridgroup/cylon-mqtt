var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'server', adaptor: 'mqtt', host: 'mqtt://localhost:1883' },

  devices: [
    { name: 'uno', driver: 'mqtt', topic: 'hi' },
    { name: 'dos', driver: 'mqtt', topic: 'hola' }
  ],

  work: function(my) {
    my.server.on('message', function(topic, message) {
      console.log(topic + ": " + message);
    });

    every((1).seconds(), function() {
      console.log("Saying hello...");

      my.uno.publish('hello');
      my.dos.publish('buenos');
    });
  }
}).start();

var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'mqtt', adaptor: 'mqtt', host: 'mqtt://localhost:1883'},
  device: {name: 'server', driver: 'mqtt', topic: 'greetings'},

  work: function(my) {
    my.server.on('message', function (data) {
      console.log(data);
    });

    every((1).seconds(), function() {
      console.log("Saying hello...");
      my.server.publish('greetings', 'hello');
    });
  }
}).start();

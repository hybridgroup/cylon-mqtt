var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'server', adaptor: 'mqtt', host: 'mqtt://localhost:1883'},
  device: {name: 'hello', driver: 'mqtt', topic: 'greetings'},

  work: function(my) {
    my.hello.on('message', function (data) {
      console.log(data);
    });

    every((1).seconds(), function() {
      console.log("Saying hello...");
      my.server.publish('greetings', 'hi there');
    });
  }
}).start();

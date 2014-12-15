var Cylon = require('cylon');

Cylon.robot({
  connections: {
    server: { adaptor: 'mqtt', host: 'mqtt://localhost:1883' }
  },

  devices: {
    hello: { driver: 'mqtt', topic: 'greetings' }
  },

  work: function(my) {
    my.hello.on('message', function (data) {
      console.log(data);
    });

    every((1).seconds(), function() {
      console.log("Saying hello...");
      my.hello.publish('hi there');
    });
  }
}).start();

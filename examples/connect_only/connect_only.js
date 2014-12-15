var Cylon = require('cylon');

Cylon.robot({
  connections: {
    server: { adaptor: 'mqtt', host: 'mqtt://localhost:1883' }
  },

  work: function(my) {
    my.server.subscribe('hello');

    my.server.on('message', function (topic, data) {
      console.log(topic + ": " + data);
    });

    every((1).seconds(), function() {
      console.log("Saying hello...");
      my.server.publish('hello', 'hi there');
    });
  }
}).start();

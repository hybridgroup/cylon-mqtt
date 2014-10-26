var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'server', adaptor: 'mqtt', host: 'mqtt://localhost:1883'},

  work: function(my) {
    my.server.subscribe('greetings');
    
    my.server.on('message', function (topic, data) {
      console.log(data);
    });

    every((1).seconds(), function() {
      console.log("Saying hello...");
      my.server.publish('greetings', 'hello');
    });
  }
}).start();

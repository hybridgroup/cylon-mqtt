var Cylon = require('cylon');

Cylon.robot({
  connections: {
    mqtt: { adaptor: 'mqtt', host: 'mqtt://localhost:1883' },
    firmata: { adaptor: 'firmata', port: '/dev/ttyACM0' }
  },

  devices: {
    toggle: { driver: 'mqtt', topic: 'toggle', adaptor: 'mqtt' },
    led: { driver: 'led', pin: '13', adaptor: 'firmata' },
  },

  work: function(my) {
    my.toggle.on('message', function(data) {
      console.log("Message on 'toggle': " + data);
      my.led.toggle();
    });

    every((1).second(), function() {
      console.log("Toggling LED.");
      my.toggle.publish('toggle');
    });
  }
}).start();

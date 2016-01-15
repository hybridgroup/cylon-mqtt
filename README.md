# Cylon.js For MQTT

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics, physical computing, and the Internet of Things (IoT).

This repository contains the Cylon.js adaptor/driver for the MQTT messaging protocol. It uses the MQTT.js node module (https://github.com/adamvr/MQTT.js) created by [@adamvr](https://github.com/adamvr) and [@mcollina](https://github.com/mcollina), thank you!

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

Want to use the Go programming language to power your robots? Check out our sister project Gobot (http://gobot.io).

[![Build Status](https://secure.travis-ci.org/hybridgroup/cylon-mqtt.png?branch=master)](http://travis-ci.org/hybridgroup/cylon-mqtt) [![Code Climate](https://codeclimate.com/github/hybridgroup/cylon-mqtt/badges/gpa.svg)](https://codeclimate.com/github/hybridgroup/cylon-mqtt) [![Test Coverage](https://codeclimate.com/github/hybridgroup/cylon-mqtt/badges/coverage.svg)](https://codeclimate.com/github/hybridgroup/cylon-mqtt)

## How to Install

Install `cylon-mqtt` through NPM:

    $ npm install cylon cylon-mqtt

Before using `cylon-mqtt`, you'll need to have a MQTT broker running in order to connect/publish/subscribe to messages.

A good, simple broker is [mosca](https://github.com/mcollina/mosca).
The developers have a [tutorial on using Mosca as a standalone service](https://github.com/mcollina/mosca/wiki/Mosca-as-a-standalone-service.).

## How to Use

There's two different ways to use the `cylon-mqtt` module.

You can use the connection object only, in which case you have pub/sub access to all available MQTT channels:

```javascript
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
      my.server.publish('hello', 'hi there');
    });
  }
});
```

Or, you can use the device object, which restricts your interaction to a single MQTT channel.
This can make it easier to keep track of different channels.

```javascript
Cylon.robot({
  connections: {
    server: { adaptor: 'mqtt', host: 'mqtt://localhost:1883' }
  },

  devices: {
    hello: { driver: 'mqtt', topic: 'hello' }
  },

  work: function(my) {
    my.hello.on('message', function (data) {
      console.log("hello: " + data);
    });

    every((1).seconds(), function() {
      my.hello.publish('hi there');
    });
  }
})
```

#### Simple

```javascript
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
```

#### Arduino Blink

```javascript
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
```

For more examples, please see the `examples` folder.

## How to Connect

```javascript
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
```

### Authentication

```
    mqtt: { adaptor: "mqtt", host: "mqtt://localhost:1883",
            username: "iamuser", password: "sosecure" },
```

## Documentation

We're busy adding documentation to [cylonjs.com](http://cylonjs.com). Please check there as we continue to work on Cylon.js.

Thank you!

## Contributing

For our contribution guidelines, please go to [https://github.com/hybridgroup/cylon/blob/master/CONTRIBUTING.md
](https://github.com/hybridgroup/cylon/blob/master/CONTRIBUTING.md
).

## Release History

For the release history, please go to [https://github.com/hybridgroup/cylon-mqtt/blob/master/RELEASES.md
](https://github.com/hybridgroup/cylon-mqtt/blob/master/RELEASES.md
).

## License

Copyright (c) 2014-2016 The Hybrid Group. Licensed under the Apache 2.0 license.

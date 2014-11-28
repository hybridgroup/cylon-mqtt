# Cylon.js For MQTT

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics and physical computing using Node.js

This repository contains the Cylon.js adaptor/driver for the MQTT messaging protocol.
It uses the MQTT.js node module (https://github.com/adamvr/MQTT.js) created by [@adamvr](https://github.com/adamvr) and [@mcollina](https://github.com/mcollina), thank you!

For more information about Cylon.js, check out the repo at https://github.com/hybridgroup/cylon

## Getting Started

Install `cylon-mqtt` through NPM:

    $ npm install cylon-mqtt

Before using `cylon-mqtt`, you'll need to have a MQTT broker running in order to connect/publish/subscribe to messages.

A good, simple broker is [mosca](https://github.com/mcollina/mosca).
The developers have a [tutorial on using Mosca as a standalone service](https://github.com/mcollina/mosca/wiki/Mosca-as-a-standalone-service.).

## Usage

There's two different ways to use the `cylon-mqtt` module.

You can use the connection object only, in which case you have pub/sub access to all available MQTT channels:

```javascript
Cylon.robot({
  connection: { name: 'server', adaptor: 'mqtt', host: 'mqtt://localhost:1883' },

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
  connection: { name: 'server', adaptor: 'mqtt', host: 'mqtt://localhost:1883' },
  device: { name: 'hello', driver: 'mqtt', topic: 'hello' },

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

## Examples

#### Simple

```javascript
var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'server', adaptor: 'mqtt', host: 'mqtt://localhost:1883' },
  device: { name: 'hello', driver: 'mqtt', topic: 'greetings' },

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

#### Connection Only

```javascript
var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'server', adaptor: 'mqtt', host: 'mqtt://localhost:1883' },

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

#### Arduino Blink

```javascript
var Cylon = require('cylon');

Cylon.robot({
  connections: [
    { name: 'mqtt', adaptor: 'mqtt', host: 'mqtt://localhost:1883' },
    { name: 'firmata', adaptor: 'firmata', port: '/dev/ttyACM0' }
  ],

  devices: [
    { name: 'toggle', driver: 'mqtt', topic: 'toggle', adaptor: 'mqtt' },
    { name: 'led', driver: 'led', pin: '13', adaptor: 'firmata' },
  ]

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

## Contributing

* All patches must be provided under the Apache 2.0 License
* Please use the -s option in git to "sign off" that the commit is your work and you are providing it under the Apache 2.0 License
* Submit a Github Pull Request to the appropriate branch and ideally discuss the changes with us in IRC.
* We will look at the patch, test it out, and give you feedback.
* Avoid doing minor whitespace changes, renamings, etc. along with merged content. These will be done by the maintainers from time to time but they can complicate merges and should be done seperately.
* Take care to maintain the existing coding style.
* Add unit tests for any new or changed functionality & lint and test your code using `make test` and `make lint`.
* All pull requests should be "fast forward"
  * If there are commits after yours use “git rebase -i <new_head_branch>”
  * If you have local changes you may need to use “git stash”
  * For git help see [progit](http://git-scm.com/book) which is an awesome (and free) book on git

## Release History

0.2.0 - Compatability with Cylon 0.21.0

0.1.0 - Initial release

## License

Copyright (c) 2014 The Hybrid Group. Licensed under the Apache 2.0 license.

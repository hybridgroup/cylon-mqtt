# Cylon.js For MQTT

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics and physical computing using Node.js

This repository contains the Cylon.js adaptor/driver for the MQTT messaging protocol. It uses the MQTT.js node module (https://github.com/adamvr/MQTT.js) created by [@adamvr](https://github.com/adamvr) and [@mcollina](https://github.com/mcollina) thank you!

For more information about Cylon.js, check out the repo at
https://github.com/hybridgroup/cylon

## Getting Started

Install the module with: `npm install cylon-mqtt`

## Examples

## Connecting

```javascript
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
```

You need an MQTT broker running, in order to connect, publish, and subscribe to MQTT messages using cylon-mqtt. 

A good one is https://github.com/mcollina/mosca

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

None yet...

## License

Copyright (c) 2014 The Hybrid Group. Licensed under the Apache 2.0 license.

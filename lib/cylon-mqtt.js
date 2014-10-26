/*
 * cylon-mqtt
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');

var Adaptor = require('./adaptor'),
    Driver = require('./driver');

module.exports = {
  adaptor: function(opts) {
    return new Adaptor(opts);
  },

  driver: function(opts) {
    return new Driver(opts);
  },

  register: function(robot) {
    robot.registerAdaptor('cylon-mqtt', 'mqtt');
    robot.registerDriver('cylon-mqtt', 'mqtt');
  }
};
